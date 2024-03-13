import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => {
          setCount((previousValue) => previousValue + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setCount((previousValue) => previousValue - 1);
        }}
      >
        -
      </button>
      <p>{`the count is ${count}`}</p>
    </div>
  );
};

export default Counter;
