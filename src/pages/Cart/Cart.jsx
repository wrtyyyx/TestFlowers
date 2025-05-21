import './Cart.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, setStore } from '../../store/slice/storeSlice.js';
import { useNavigate } from 'react-router-dom';
import OrderCard from '../../components/OrderCard/OrderCard.jsx';

const Cart = () => {
    const cartProducts = useSelector((state) => state.store.products);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = (item) => {
        dispatch(deleteItem(item));
    };

    const handlePlus = (item) => {
        dispatch(setStore({ ...item, quantity: item.quantity + 1 }));
    };

    const handleMinus = (item) => {
        dispatch(setStore({ ...item, quantity: item.quantity - 1 }));
    };

    return (
        <section className={'cart'}>
            <div className="container cart_container">
                <div className="cart_title">Your cart</div>
                {cartProducts.length === 0 && <div>Cart is empty</div>}
                {cartProducts.map((cartProduct) => (
                    <OrderCard
                        product={cartProduct}
                        key={cartProduct._id}
                        cart
                        delItem={handleDelete}
                        minItem={handleMinus}
                        plusItem={handlePlus}
                    />
                ))}

                {cartProducts.length !== 0 && (
                    <div className={'cart_footer'}>
                        <div className="cart_total">
                            Total price: <span>{cartProducts.reduce((acc, item) => acc + item.price, 0)} $</span>
                        </div>
                        <button className={'cart_btn'} onClick={() => navigate('/cart/delivery')}>
                            Finish order!
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Cart;
