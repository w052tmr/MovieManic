import { useState } from 'react';
import propTypes from 'prop-types';

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    width: 'auto',
};

const starContainerStyle = {
    display: 'flex',
    alignItems: 'center',
};

StarRating.propTypes = {
    maxRating: propTypes.number,
    color: propTypes.string,
    size: propTypes.number,
    className: propTypes.string,
    messages: propTypes.array,
    defaultRating: propTypes.number,
    onSetRating: propTypes.func,
};

export default function StarRating({
    maxRating = 5,
    color = '#fcc419',
    size = 24,
    className = '',
    messages = [],
    defaultRating = 0,
    onSetRating,
}) {
    const [rating, setRating] = useState(defaultRating);
    const [hoverRating, setHoverRating] = useState(0);

    const handlerating = (rating) => {
        setRating(rating);
        onSetRating && onSetRating(rating);
    };

    const textStyle = {
        lineHeight: '1',
        margin: '0',
        color,
        fontSize: `${size}px`,
    };

    return (
        <div style={containerStyle} className={className}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                        onSetRating={() => handlerating(i + 1)}
                        full={
                            hoverRating ? i + 1 <= hoverRating : i + 1 <= rating
                        }
                        onHoverIn={() => setHoverRating(i + 1)}
                        onHoverOut={() => setHoverRating(0)}
                        color={color}
                        size={size}
                        key={i}
                    />
                ))}
            </div>
            <p style={textStyle}>
                {messages.length === maxRating
                    ? messages[hoverRating ? hoverRating - 1 : rating - 1]
                    : hoverRating || rating || ''}
            </p>
        </div>
    );
}

function Star({
    rating,
    hoverRating,
    onSetRating,
    full,
    onHoverIn,
    onHoverOut,
    color,
    size,
}) {
    const starStyle = {
        display: 'flex',
        alignItems: 'center',
        width: `${size}`,
        height: `${size}`,
        cursor: 'pointer',
    };

    return (
        <span
            role="button"
            onClick={onSetRating}
            onMouseEnter={onHoverIn}
            onMouseLeave={onHoverOut}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={full ? color : 'transparent'}
                stroke={color}
                style={starStyle}
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        </span>
    );
}
