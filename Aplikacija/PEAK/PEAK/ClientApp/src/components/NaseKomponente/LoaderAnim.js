import React from "react";
import ReactLoading from "react-loading";
import './LoaderAnim.css';
  
export default function LoaderAnim() {
  return (
    <div className="loaderAnim">
      <ReactLoading type="spin" color="#0f74bc"
        height={200} width={100} />
    </div>
  );
}