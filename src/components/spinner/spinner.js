import React from "react";

export default function Spinner() {
  return (
    <>
      <div className="spinner-container">
        <div className="loader">
          <div className="inner one"></div>
          <div className="inner two"></div>
          <div className="inner three"></div>
        </div>
      </div>
    </>
  );
}
