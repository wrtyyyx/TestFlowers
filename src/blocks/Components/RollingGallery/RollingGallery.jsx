/*
	Installed from https://reactbits.dev/default/
*/

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimation, useTransform } from 'framer-motion';
import './RollingGallery.css';
import { useNavigate } from 'react-router-dom';

const RollingGallery = ({ autoplay = false, pauseOnHover = false, images = [] }) => {
    const navigate = useNavigate();
    const [isScreenSizeSm, setIsScreenSizeSm] = useState(window.innerWidth <= 640);

    const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
    const faceCount = images.length;
    const faceWidth = (cylinderWidth / faceCount) * 1.5; // Increased width for items
    const dragFactor = 0.05;
    const radius = cylinderWidth / (2 * Math.PI);

    const rotation = useMotionValue(0);
    const controls = useAnimation();
    const autoplayRef = useRef();

    const handleDrag = (_, info) => {
        rotation.set(rotation.get() + info.offset.x * dragFactor);
    };

    const handleDragEnd = (_, info) => {
        controls.start({
            rotateY: rotation.get() + info.velocity.x * dragFactor,
            transition: { type: 'spring', stiffness: 60, damping: 20, mass: 0.1, ease: 'easeOut' },
        });
    };

    const transform = useTransform(rotation, (value) => {
        return `rotate3d(0, 1, 0, ${value}deg)`;
    });

    // Autoplay effect with adjusted timing
    useEffect(() => {
        if (autoplay) {
            autoplayRef.current = setInterval(() => {
                controls.start({
                    rotateY: rotation.get() - 360 / faceCount,
                    transition: { duration: 2, ease: 'linear' },
                    scrollBehavior: 'smooth',
                });
                rotation.set(rotation.get() - 360 / faceCount);
            }, 2000);

            return () => clearInterval(autoplayRef.current);
        }
    }, [autoplay, rotation, controls, faceCount]);

    useEffect(() => {
        const handleResize = () => {
            setIsScreenSizeSm(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Pause on hover with smooth transition
    const handleMouseEnter = () => {
        if (autoplay && pauseOnHover) {
            clearInterval(autoplayRef.current);
            controls.stop(); // Stop the animation smoothly
        }
    };

    const handleMouseLeave = () => {
        if (autoplay && pauseOnHover) {
            controls.start({
                rotateY: rotation.get() - 360 / faceCount,
                transition: { duration: 2, ease: 'linear' },
            });
            rotation.set(rotation.get() - 360 / faceCount);

            autoplayRef.current = setInterval(() => {
                controls.start({
                    rotateY: rotation.get() - 360 / faceCount,
                    transition: { duration: 2, ease: 'linear' },
                });
                rotation.set(rotation.get() - 360 / faceCount);
            }, 2000);
        }
    };

    return (
        <div className="gallery-container">
            <div className="gallery-content">
                <motion.div // хоче кей, але додати не можу - ломаєтся
                    drag="x"
                    className="gallery-track"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        transform: transform,
                        rotateY: rotation,
                        width: cylinderWidth,
                        transformStyle: 'preserve-3d',
                    }}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    animate={controls}
                >
                    {images.map((flower, i) => (
                        <div
                            onClick={() => navigate(`/products/${flower._id}`)}
                            key={i._id}
                            className="gallery-item"
                            style={{
                                width: `${faceWidth}px`,
                                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
                            }}
                        >
                            <img src={flower.imageUrl} alt={flower.name} className="gallery-img" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default RollingGallery;
