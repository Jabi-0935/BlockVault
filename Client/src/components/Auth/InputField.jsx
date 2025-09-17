import React, { useState } from "react";

const InputField = (props) => {
  return (
    <>
      <input
        className={`border-2 ${
          props.errors[props.name] ? "border-red-500" : "border-gray-600"
        } bg-gray-700 text-white placeholder-gray-400 hover:border-cyan-400 focus:border-blue-500 rounded-md p-2 sm:p-3 text-sm sm:text-base transition-all duration-200 outline-none`}
        type={props.type}
        step={props.step || "any"}
        defaultValue={props.value || ""}
        disabled={props.disabled || false}
        placeholder={props.placeholder}
        {...props.register(props.name, props.rules)}
      />
      <span className="text-red-400 text-xs h-4">
        {props.errors[props.name]?.message || ""}
      </span>
    </>
  );
};

export default InputField;
