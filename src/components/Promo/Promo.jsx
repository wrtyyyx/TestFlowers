import './Promo.scss';

import { useGetProductsQuery } from '../../store/api/itemsApi.js';
import RollingGallery from '../../blocks/Components/RollingGallery/RollingGallery.jsx';

const Promo = () => {
    const { data: flowers = [], isLoading } = useGetProductsQuery();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div className={'promo'}>
                <h1 className={'promo_text'}>BIG SALE 20%</h1>
                <RollingGallery images={flowers} />
            </div>
        </>
    );
};

export default Promo;
