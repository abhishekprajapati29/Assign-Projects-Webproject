import React from "react";
import "./Toolbar.css";

export default function Toolbar(props) {
  const { title, leftItems, rightItems } = props;
  return (
    <div
      className="toolbar"
      style={{
        boxShadow: "0 4px 20px 0 , 0 7px 10px -5px rgba(244, 67, 54,.4)",
        borderRadius: "35px",
        margin: "18px 10px 10px 10px",
        background: "black",
      }}
    >
      <div className="left-items">{leftItems}</div>
      <h1 className="toolbar-title">{title}</h1>
      <div className="right-items">{rightItems}</div>
    </div>
  );
}
