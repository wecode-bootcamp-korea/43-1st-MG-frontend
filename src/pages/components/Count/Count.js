import React from 'react';
import './Count.scss';

// const Count = {counter, setCount} => {}

const Count = props => {
  const { count, setCount } = props;
  if (count < 1) {
    setCount(1);
  }

  return (
    <div className="count">
      <div className="countInput">
        <button
          onClick={() => {
            setCount(count - 1);
          }}
        >
          -
        </button>
        <div className="countInputText">{count}</div>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Count;
