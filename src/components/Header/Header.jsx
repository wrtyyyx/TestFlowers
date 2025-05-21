import { useEffect, useState } from 'react';
import logo_1 from '../../images/logoF.png';
import userLogo from '../../images/userLogo.png';
import './Header.scss';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/slice/userSlice.js';
import { useGetProductByTitleQuery } from '../../store/api/itemsApi.js';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store = useSelector((state) => state.store.products);
    const user = useSelector((state) => state.user);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const userData = sessionStorage.getItem('userData');
        if (userData) {
            dispatch(setUser(JSON.parse(userData)));
        }
    }, [dispatch]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search.trim());
        }, 200);
        return () => clearTimeout(handler);
    }, [search]);

    const { data: searchResults = [] } = useGetProductByTitleQuery(debouncedSearch, {
        skip: debouncedSearch === '',
    });

    const handleSelectProduct = (id) => {
        console.log(id);
        navigate(`/product/${id}`);
        setSearch('');
        setDebouncedSearch('');
    };

    return (
        <header className={'header'}>
            <div className="container">
                <div className={'header_nav'}>
                    <Link to={'/'}>
                        <img className={'header_logo'} width={50} height={50} src={logo_1} alt={'logo'} />
                    </Link>

                    <Link to={'/user'} className="header_user">
                        <img src={userLogo} alt="userLogo" />
                        <div className={'header_user_name'}>
                            {user.firstName ? `${user.firstName} ${user.lastName}` : <p>Guest</p>}
                        </div>
                    </Link>

                    <div className="header_form">
                        <div className="header_form_group">
                            <SearchIcon />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={'header_form_input'}
                                placeholder={'Search...'}
                            />
                        </div>

                        {search && searchResults.length > 0 && (
                            <div className="header_form_result">
                                {searchResults.map((product) => (
                                    <div
                                        key={product.id}
                                        className="header_form_result_item"
                                        onClick={() => handleSelectProduct(product._id)}
                                    >
                                        {product.name} | {product.category}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="header_shop">
                        <Badge badgeContent={0} color="primary">
                            <FavoriteBorderIcon fontSize={'large'} color="#B8B8B8" />
                        </Badge>
                        <Badge badgeContent={store.reduce((acc, item) => acc + item.quantity, 0)} color="primary">
                            <Link to={'/cart'}>
                                <ShoppingCartIcon fontSize={'large'} sx={{ color: '#6C3EB8' }} />
                            </Link>
                        </Badge>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
