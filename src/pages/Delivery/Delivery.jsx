import './Delivery.scss';
import GradientText from '../../blocks/TextAnimations/GradientText/GradientText.jsx';
import DeliveryStepper from '../../components/DeliveryStepper/DeliveryStepper.jsx';
const Delivery = () => {
    return (
        <section className={'delivery'}>
            <div className="container delivery_container">
                <div className="delivery_title">
                    <GradientText
                        colors={['#4ff9bb', '#c25ccc', '#5200da']}
                        animationSpeed={3}
                        showBorder={false}
                        fw={700}
                        className="custom-class"
                    >
                        Chose address for delivery!
                    </GradientText>
                    <hr />
                </div>
                <div className="delivery_box">
                    <DeliveryStepper />
                </div>
            </div>
        </section>
    );
};

export default Delivery;
