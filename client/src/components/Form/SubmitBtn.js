import React from "react";

export function SubmitBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-lg btn-dark btn-block">
      {props.children}
    </button>
  );
}
