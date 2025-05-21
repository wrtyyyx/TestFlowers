import PropTypes from 'prop-types';
import './CardCatal.scss';
import { useNavigate } from 'react-router-dom';

const CardCatal = ({ data }) => {
    const { name, category, imageUrl, price, _id } = data;
    const navigate = useNavigate();

    return (
        <div className={'card'} onClick={() => navigate(`/products/${_id}`)}>
            <div className={'card_img'}>
                <img className={'card_img'} src={imageUrl} alt="card_img" />
            </div>
            <div className={'card_info'}>
                <div className="card_info_title">{name}</div>
                <div className="card_info_cat">{category}</div>
            </div>
            <div className="card_footer">
                <div className={'card_price'}>{price}$</div>
            </div>
        </div>
    );
};

CardCatal.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        category: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
};

export default CardCatal;
