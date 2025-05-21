import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductsQuery, useGetProductsByCatQuery } from '../../store/api/itemsApi.js';
import { Box, Slider } from '@mui/material';
import './CategoryItems.scss';
import CardCatal from '../../components/CardCatal/CardCatal.jsx';

const CategoryItems = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const { data, isLoading, error } = useGetProductsQuery({ category });
    const [price, setPrice] = useState([0, 0]);
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (data?.length) {
            const maxPrice = Math.max(...data.map((item) => item.price));
            setPrice([0, maxPrice]);
            setFilteredProducts(data);
        }
    }, [data]);

    useEffect(() => {
        if (!data) return;
        const filtered = data.filter(
            (product) =>
                product.name.toLowerCase().includes(search.toLowerCase()) &&
                product.price >= price[0] &&
                product.price <= price[1]
        );
        setFilteredProducts(filtered);
    }, [price, search, data]);

    useEffect(() => {
        if (!isLoading && (!data || data.length === 0 || error)) {
            navigate('/404', { replace: true });
        }
    }, [isLoading, data, error, navigate]);

    if (isLoading) return <p>Loading...</p>;
    if (!data?.length) return null;

    const handleReset = (e) => {
        e.preventDefault();
        if (data) {
            const maxPrice = Math.max(...data.map((item) => item.price));
            setPrice([0, maxPrice]);
            setSearch('');
            setFilteredProducts(data);
        }
    };

    const handlePrice = (e, newValue) => {
        setPrice(newValue);
    };

    return (
        <section className="cat">
            <div className="container cat_container">
                <h1 className="cat_title">{category}</h1>
                <form className="cat_form">
                    <input
                        className="cat_form_input"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Product name..."
                    />
                    <Box sx={{ width: 230 }}>
                        <label>Set price</label>
                        <Slider
                            value={price}
                            onChange={handlePrice}
                            valueLabelDisplay="auto"
                            min={0}
                            max={Math.max(...data.map((item) => item.price))}
                            sx={{ color: '#6C3EB8' }}
                        />
                    </Box>
                    <button className="cat_form_btn" onClick={handleReset}>
                        Reset
                    </button>
                </form>
                <div className="cat_items">
                    {filteredProducts.map((item) => (
                        <CardCatal key={item._id} cat={category} data={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryItems;
