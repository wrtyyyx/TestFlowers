import { useNavigate } from 'react-router-dom';
import './NotFound.scss';
import Btn from '../../components/Button/Btn.jsx';
const NotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="notfound">
                <div className="container">
                    <div className="notfound_code">404 :(</div>
                    <div className="notfound_message">Oops! The page you are looking for does not exist.</div>
                    <Btn text={'Go back'} func={() => navigate('/')}></Btn>
                </div>
            </div>
        </>
    );
};

export default NotFound;
