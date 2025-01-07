import React, { useEffect } from "react";

function Letter(props) {
  return (
    <div
      className={`${
        props.greenIndexes.includes(props.index) ? props.color : null
      } letter text-3xl font-bold bg-black text-white mx-0.5 p-2 rounded uppercase`}
    >
      {props.letter}
    </div>
  );
}

export default Letter;
