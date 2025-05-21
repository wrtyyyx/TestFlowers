import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home.jsx';
import Cart from '../pages/Cart/Cart.jsx';
import CategoryItems from '../pages/CategoryItems/CategoryItems.jsx';
import Product from '../pages/Product/Product.jsx';
import MainLayout from '../tamplate/MainLayout.jsx';
import SignUp from '../pages/SignUp/SignUp.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Delivery from '../pages/Delivery/Delivery.jsx';
import UserHistory from '../pages/User/UserHistory.jsx';
import UserRouter from './UserRouter.jsx';
import User from '../pages/User/User.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';
import SignIn from '../pages/SignIn/SignIn.jsx';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path=":category" element={<CategoryItems />} />
                    <Route path=":category/:id" element={<Product />} />
                    <Route
                        path="cart"
                        element={
                            <ProtectedRoute>
                                <Cart />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/cart/delivery" element={<Delivery />} />
                    <Route path="/user/:id" element={<UserHistory />} />
                    <Route
                        path="/user"
                        element={
                            <UserRouter>
                                <User />
                            </UserRouter>
                        }
                    />

                    <Route path="*" element={<Navigate to="/404" />} />
                    <Route path="/404" element={<NotFound />} />
                </Route>
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
