import React, { useEffect } from "react";
import { motion } from "framer-motion";

function Letter(props) {
  function animobj() {
    return {
      scale: [1, 1.1, 1],
    };
  }

  return (
    <motion.div
      animate={props.index == props.currentIndex ? animobj() : null}
      transition={{ duration: 0.3 }}
      initial={{ scale: 1 }}
      exit={{ scale: 1 }}
      className={`${
        props.greenIndexes.includes(props.index) ? props.color : null
      } ${
        props.index == props.currentIndex ? "currentSelected" : null
      } letter text-3xl font-bold bg-black text-white mx-0.5 p-2 rounded uppercase`}
    >
      {props.letter}
    </motion.div>
  );
}

export default Letter;
