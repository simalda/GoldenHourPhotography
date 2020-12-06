import React from "react";

export default function TimeButton(props) {
  return (
    <button className="timeslot" onClick={props.onClick}>
      {props.time}
    </button>
  );
}
