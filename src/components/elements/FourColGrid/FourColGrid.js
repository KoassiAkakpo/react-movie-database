import React from "react";
import "./FourColGrid.css";

const FourColGrid = props => {
  const renderElement = () => {
    const gridElement = props.children.map((el, i) => {
      return (
        <div className="rmdb-grid-element" key={i}>
          {el}
        </div>
      );
    });
    return gridElement;
  };
  return (
    <div className="rmdb-grid">
      {props.header && !props.loading ? <h1>{props.header}</h1> : null}
      <div className="rmdb-grid-content">{renderElement()}</div>
    </div>
  );
};

export default FourColGrid;
