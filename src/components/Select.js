import React from "react";

import { ReactComponent as Arrow } from "../assets/arrow.svg";

const Select = ({ label, items, onChange }) => (
  <div className="my-2 relative w-full z-10">
    <label htmlFor={label.toLowerCase()} className="block text-sm mt-3">{label}</label>
    <Arrow className="w-2 h-2 absolute top-7 right-0 m-4 pointer-events-none" />
    <select id={label.toLowerCase()}
      defaultValue={0}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-3 focus:outline-none border w-full appearance-none"
    >
      <option disabled value={0}>
        Choose a {label}
      </option>
      {items.map((item) => {
        return (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        );
      })}
    </select>
  </div>
);

export default Select;
