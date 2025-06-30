import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="counter">
      <div className="counter-header">
        <h2 className="counter-title">Counter Component</h2>
        <p className="counter-subtitle">A simple counter with SCSS styling</p>
      </div>

      <div className="counter-display">
        <span className="counter-value">{count}</span>
      </div>

      <div className="counter-controls">
        <button className="btn btn-danger counter-btn" onClick={decrement}>
          Decrease
        </button>
        <button className="btn btn-secondary counter-btn" onClick={reset}>
          Reset
        </button>
        <button className="btn btn-success counter-btn" onClick={increment}>
          Increase
        </button>
      </div>

      <div className="counter-info">
        <p className="text-muted">
          This component demonstrates SCSS variables, mixins, and utility
          classes.
        </p>
      </div>
    </div>
  );
};

export default Counter;
