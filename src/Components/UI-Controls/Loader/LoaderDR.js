import React from "react";
import './Loader.css'; // Optional: If you want to move styles to a separate CSS file

const Loader = () => {
  return (
    <div className="loadingio-spinner-double-ring">
      <div className="ldio">
        <div></div>
        <div></div>
        <div><div></div></div>
        <div><div></div></div>
      </div>
    </div>
  );
};

export default Loader;
