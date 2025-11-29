import React from 'react';

const PixelButton = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled = false,
    className = ''
}) => {
    const variantClass = variant === 'secondary' ? 'secondary' : variant === 'danger' ? 'danger' : '';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`pixel-btn ${variantClass} ${className}`}
        >
            {children}
        </button>
    );
};

export default PixelButton;
