import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="box-errors">
      <h2>
        <span>⛔</span>
        {message}
      </h2>
    </div>
  );
};

export default ErrorMessage;
