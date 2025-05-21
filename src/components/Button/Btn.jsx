import './Button.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
const Btn = ({ text, grey, func }) => {
    return (
        <button onClick={() => func()} className={classNames('btn', { 'btn--grey': grey })}>
            {text}
        </button>
    );
};

Btn.propTypes = {
    text: PropTypes.string.isRequired,
    grey: PropTypes.bool,
    func: PropTypes.func,
};

export default Btn;
