import React from "react";

export const TextInputField = ({ state, name, onChange, ...rest }) => {
  const { data, errors } = state;
  let label = name.charAt(0).toUpperCase() + name.slice(1);
  
  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        id={label}
        name={name}
        type="text"
        className={`border border-gray-300 rounded-md py-2 px-3 text-sm outline-none ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
        value={data[name]}
        onChange={onChange}
        {...rest}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );
};
