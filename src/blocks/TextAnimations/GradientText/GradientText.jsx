/*
	jsrepo 1.40.0
	Installed from https://reactbits.dev/default/
	24.02.2025
*/
// eslint-disable-file react/prop-types

import './GradientText.css';

export default function GradientText({
    children,
    className = '',
    colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'], // Default colors
    animationSpeed = 8, // Default animation speed in seconds
    showBorder = false, // Default overlay visibility
    fw = 600,
}) {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
        animationDuration: `${animationSpeed}s`,
        fontWeight: fw,
    };

    return (
        <div className={`animated-gradient-text ${className}`}>
            {showBorder && <div className="gradient-overlay" style={gradientStyle}></div>}
            <div className="text-content" style={gradientStyle}>
                {children}
            </div>
        </div>
    );
}
