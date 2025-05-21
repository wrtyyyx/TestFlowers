import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './aside.scss';

const Aside = () => {
    const location = useLocation();
    const categories = [
        { key: 'All', name: 'All' },
        { key: 'Flowers', name: 'Flowers' },
        { key: 'Gifts', name: 'Gifts' },
        { key: 'Compositions', name: 'Compositions' },
    ];
    return (
        <div className={''}>
            <aside className="aside">
                <ul className="aside_nav">
                    <div className={'aside_title'}>Categories</div>
                    {categories.map((item) => (
                        <Link
                            to={`/${item.key}`}
                            className={classNames('aside_category', { active: location.pathname === `/${item.key}` })}
                            key={item.key}
                        >
                            {item.name}
                        </Link>
                    ))}
                </ul>

                <div className="aside_help">
                    <div className="aside_help_link">Help</div>
                    <div className="aside_help_link">Terms & Conditions</div>
                </div>
            </aside>
        </div>
    );
};

export default Aside;
