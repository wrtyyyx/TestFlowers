import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../store/api/itemsApi.js';
import './Product.scss';
import { Rating } from '@mui/material';
import Btn from '../../components/Button/Btn.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setStore } from '../../store/slice/storeSlice.js';
import { Modal } from 'react-bootstrap';

const Product = () => {
    const { id } = useParams();
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const store = useSelector((state) => state.store.products);
    const user = useSelector((state) => state.user);

    const { data: product, isLoading } = useGetProductQuery(id);
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!product) {
        return <p>No product</p>;
    }
    const addToFavorite = () => {};
    const addToCart = () => {
        if (!user.firstName) {
            navigation('/signIn');
            return;
        }

        const exist = store.find((item) => item._id === product._id);

        if (exist) {
            dispatch(setStore({ ...exist, quantity: exist.quantity + 1 }));
        } else {
            dispatch(setStore({ ...product, quantity: 1 }));
        }

        setShow(true);
    };

    return (
        <section className={'product'}>
            <div className="product_back" onClick={() => navigation(-1)}>
                Go back
            </div>
            <div className="container product_container">
                <div className={'product_left'}>
                    <img className={'product_img'} src={product.imageUrl} alt="Product_Img" width={380} height={380} />
                </div>
                <div className={'product_right'}>
                    <div className="product_title">{product.name}</div>
                    <div className={'product_price'}>{product.price} $</div>
                    <div className={'product_desc'}>{product.description}</div>
                    <div className={'product_group'}>
                        <Btn text={'Add to cart'} func={addToCart} />
                        <Btn text={'Add to favorites'} func={addToFavorite} grey />
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={() => setShow(false)} style={{ color: 'black' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Congratulation!🥳</Modal.Title>
                </Modal.Header>
                <Modal.Body>You successful added item to cart</Modal.Body>
                <Modal.Footer>Go to cart?</Modal.Footer>
                <Modal.Footer>
                    <Btn grey text={'Return to buy'} func={() => setShow(false)} />
                    <Btn text={'Go to cart'} func={() => navigation('/cart')} />
                </Modal.Footer>
            </Modal>
        </section>
    );
};

export default Product;
