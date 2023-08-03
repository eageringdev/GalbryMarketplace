import React from "react";

const PrimaryInput = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  multiple = false,
  rows = 4,
}) => {
  return (
    <div className="control_field">
      <div className="label">{label}</div>
      {multiple ? (
        <textarea
          className={"primary_input w-100 " + (error ? "has_error" : "")}
          name={name}
          placeholder={placeholder || ""}
          value={value}
          onChange={onChange}
          rows={rows}
        ></textarea>
      ) : (
        <input
          className={"primary_input w-100 " + (error ? "has_error" : "")}
          name={name}
          placeholder={placeholder || ""}
          value={value}
          onChange={onChange}
        />
      )}

      {error && <div className="mt-1 ms-2 primary_input_error">{error}</div>}
    </div>
  );
};

export default PrimaryInput;
