import React from "react";

import { ReactComponent as Arrow } from "../assets/arrow.svg";

const Select = ({ label, items, onChange }) => (
  <div className="my-2 relative w-full inline-flex items-center">
    <label className="w-40">{label}</label>
    <Arrow className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" />
    <select
      defaultValue={0}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
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
