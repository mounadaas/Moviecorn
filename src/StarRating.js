import React, { useState } from "react";
import "./StarRating.css";

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 20,
  rating,
  setRating,
}) => {
  const [tempRating, setTempRating] = useState(0);
  function handelRating(rating) {
    setRating(rating);
  }
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color: color,
    fontSize: `${size / 1.5}px`,
  };
  return (
    <div className="containerstyle">
      <div className="Starcontainerstyle">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handelRating(i + 1)}
            onHverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ""} </p>
    </div>
  );
};

export default StarRating;

function Star({ onRate, full, onHverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: " pointer",
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill={color}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218"
          />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="#000" stroke="#000">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218"
          />
        </svg>
      )}
    </span>
  );
}
