import CloseIcon from '../../images/closeBtn.png';
import PropTypes from 'prop-types';

import './OrderCard.scss';
const OrderCard = ({ product, cart, delItem, minItem, plusItem }) => {
    return (
        <div key={product._id} className="order_card">
            <div className="order_card_left">
                <div
                    className="order_card_img"
                    style={{
                        backgroundImage: `url(${product.imageUrl || product.product.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        width: '99px',
                        height: '47px',
                        borderRadius: 6,
                    }}
                ></div>
                <div className="order_card_info">
                    <div className="order_card_title">{product.name || product.product.name}</div>
                    <div className="order_card_desc">{product.category || product.product.category}</div>
                </div>
            </div>

            <div className="order_card_count">Count: {product.quantity}</div>
            <div className="order_card_price">
                {cart && (
                    <button className={'order_card_button--minus'} onClick={() => minItem(product)}>
                        -
                    </button>
                )}
                {product.price} $
                {cart && (
                    <button className={'order_card_button--plus'} onClick={() => plusItem(product)}>
                        +
                    </button>
                )}
            </div>
            {cart && (
                <div className={'order_card_delete'} onClick={() => delItem(product)}>
                    <img src={CloseIcon} alt="" width={16} height={16} />
                </div>
            )}
        </div>
    );
};
OrderCard.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
    cart: PropTypes.bool,
    delItem: PropTypes.func,
    minItem: PropTypes.func,
    plusItem: PropTypes.func,
};

export default OrderCard;
