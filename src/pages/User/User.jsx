import { useDispatch, useSelector } from 'react-redux';
import './User.scss';
import Btn from '../../components/Button/Btn.jsx';
import { useNavigate } from 'react-router-dom';
import { resetUser } from '../../store/slice/userSlice.js';
import { resetStore } from '../../store/slice/storeSlice.js';
import { useDeleteUserMutation } from '../../store/api/authApi.js';
import { useDeleteUserOrdersMutation, useGetUserOrdersQuery } from '../../store/api/ordersApi.js';
import { toast } from 'react-toastify';

const User = () => {
    const [deleteUser, error] = useDeleteUserMutation();
    const [deleteHis, { error: errorDeleting, isLoading: isDeleting }] = useDeleteUserOrdersMutation();

    const userData = useSelector((state) => state.user);
    const { data: userOrders = [], isLoading } = useGetUserOrdersQuery(userData.id, {
        skip: !userData.id,
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteHandler = async () => {
        const token = sessionStorage.getItem('token');

        if (token) {
            await deleteUser(userData.id);
            await deleteHis(userData.id);
            toast.success('User delete!');
            dispatch(resetUser());
            dispatch(resetStore(userData));
            navigate('/');
        } else toast.error('Token not found, you can not delete!');
    };

    const deleteHistory = async () => {
        await deleteHis(userData.id);
        !errorDeleting ? toast.success('History delete!') : toast.error('Error');
    };

    return (
        <section className={'user'}>
            <div className="container user_container">
                <div className="user_info">
                    <div className="user_name">
                        <div className="user_name_last">{userData.lastName}</div>
                        <div className="user_name_first">{userData.firstName}</div>
                    </div>

                    <div className="user_phone">Phone number: {userData.phone}</div>
                    <div className="user_email">Email: {userData.email}</div>
                    <Btn text={'Delete user'} func={deleteHandler} />
                </div>
            </div>
            <div className={'user_history user_history_container'}>
                <div className="user_history_title">History of orders</div>
                {!isLoading && userOrders.length >= 1 ? (
                    <div>
                        <div className="user_history_box">
                            {userOrders?.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(`/user/${item._id}`)}
                                    className={'user_history_card'}
                                >
                                    <div className="user_history_card_date">
                                        Date: {new Date(item.createdAt).toLocaleString()}
                                    </div>
                                    <div className="user_history_card_total">Total: {item.totalPrice}$</div>
                                    <div className="user_history_card_pay">Pay by: {item.paymentType}</div>
                                    <div className="user_history_card_user">
                                        User: <span>{item.userName}</span>{' '}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Btn text={'Delete history'} func={deleteHistory} />
                    </div>
                ) : (
                    <p>No orders</p>
                )}
            </div>
        </section>
    );
};

export default User;
