import './Promo.scss';

import { useGetProductsQuery } from '../../store/api/itemsApi.js';
import RollingGallery from '../../blocks/Components/RollingGallery/RollingGallery.jsx';

const Promo = () => {
    const { data: flowers = [], isLoading } = useGetProductsQuery();

    return (
        <>
            <div className={'promo'}>
                <h1 className={'promo_text'}>BIG SALE 20%</h1>
                {isLoading ? (<div>Loading...</div>) : <RollingGallery images={flowers} /> }

            </div>
        </>
    );
};

export default Promo;
