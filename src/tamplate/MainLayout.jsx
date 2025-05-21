import Header from '../components/Header/Header.jsx';
import { Outlet } from 'react-router-dom'; // Додаємо Outlet
import Aside from '../components/Aside/Aside.jsx';
import './MainLayiut.scss';

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="viewBox">
                <Aside />
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;
