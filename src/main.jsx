import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './reset.css';
import './main.scss';
import AppRouter from './router/AppRouter.jsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <AppRouter />
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </Provider>
);
