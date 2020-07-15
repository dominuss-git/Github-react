import React from "react";

import "./css/App.css";

function Item({ data, onChange }) {
  let mode = "";
  if (data.contributions >= 20) {
    mode = "per-box__contributer_gold";
  } else if (data.contributions >= 10) {
    mode = "per-box__contributer_silver";
  } else {
    mode = "per-box__contributer_bronze";
  }
  return (
    <div className="wrapper">
      <div className="per-box__wrapper" onClick={() => onChange(data.id)}>
        <img className="per-box__avatar" src={data.avatar_url} />
        <span className="per-box__login">{data.login}</span>
        <span className={mode + " per-box__contributer"}>$</span>
      </div>
      {data.click ? (
        <div>
          <span>email</span>
          <div className="wrapper__user-info">
            {data.email !== null ? data.email : " "}
          </div>
          <span>location</span>
          <div className="wrapper__user-info">
            {data.location !== null ? data.location : " "}
          </div>
          <span>company</span>
          <div className="wrapper__user-info">
            {data.company !== null ? data.company : " "}
          </div>
        </div>
      ) : (
        " "
      )}
    </div>
  );
}

export default Item;
