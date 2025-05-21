import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './UserHistory.scss';
import OrderCard from '../../components/OrderCard/OrderCard.jsx';
import Btn from '../../components/Button/Btn.jsx';
import { setOrders } from '../../store/slice/storeSlice.js';
import { useDeleteOrderMutation, useGetOrderQuery } from '../../store/api/ordersApi.js';
import { toast } from 'react-toastify';

const UserHistory = () => {
    const { id } = useParams();
    const { data: order = [], isLoading, error } = useGetOrderQuery(id);
    const [delOrder] = useDeleteOrderMutation();
    const userOrders = useSelector((state) => state.store.orders);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    const deleteOrder = async () => {
        const filterOrders = userOrders.filter((item) => item.id !== order.id);
        await delOrder(id);
        if (!error) {
            toast.success('Order delete!');
            dispatch(setOrders(filterOrders));
            navigate(-1);
        }
    };

    return (
        <section className={'history'}>
            <div className="container history_container">
                <div onClick={() => navigate(-1)} className="history_back">
                    Go back
                </div>
                <div className={'history_delete'}>
                    <Btn text={'DELETE'} func={deleteOrder} />
                </div>
                <div className={'history_delete'}></div>
                <div className="history_title">Order for: {order.date} </div>
                <hr />
                <div className="history_info">
                    <div>
                        User: <span>{order.userName}</span>
                    </div>
                    <div>Pay by: {order.paymentType}</div>
                    <div>Order total: {order.totalPrice} $</div>
                    <div>Address for delivery:{order.address}</div>
                </div>
                <div className="histroy_box">
                    <div className="history_order">Order:</div>
                    <hr />
                    {order.items && order.items.map((product) => <OrderCard key={product.id} product={product} />)}
                </div>
            </div>
        </section>
    );
};

export default UserHistory;
