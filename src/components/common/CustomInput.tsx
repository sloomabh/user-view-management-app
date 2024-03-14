import { ChangeEventHandler, FocusEventHandler } from "react";
import React, { useState } from "react";
interface CustomInputProp extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  labelText?: string;
  placeholder?: string;
  id?: string;
  customClass?: string;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  val?: string;
  error?: string | false | undefined;
  isRequired?: boolean;
}

const CustomInput = ({
  type,
  labelText,
  id,
  name,
  placeholder,
  val,
  onChange,
  onBlur,
  error,
  isRequired,
  readOnly = false,
}: CustomInputProp) => {
  const [currType, setCurrType] = useState<typeof type>(type);
  const borderClassName = readOnly
    ? "border-none"
    : error
      ? "border-red-500"
      : "border-[#A7A9AC]";
  console.log(val);
  return (
    <div className="mt-3 my-5 space-y-2">
      <div className={"mb-6"}>
        <label htmlFor={labelText} className="text-sm m-1 text-gray-500">
          {labelText}
          {isRequired && "*"}
        </label>

        <div
          className={` border flex outline-none py-3 px-4 ${borderClassName} rounded-full border-gray-500`}
        >
          <input
            type={currType}
            className="w-full outline-none bg-transparent"
            id={id}
            placeholder={placeholder}
            name={name}
            value={val}
            onChange={onChange}
            onBlur={onBlur}
          />
          {type === "password" && (
            <img
              src="/eye.svg"
              alt="hide"
              onMouseDown={() => setCurrType("text")}
              onMouseUp={() => setCurrType("password")}
              className="cursor-pointer"
              width={30}
              height={30}
            />
          )}
        </div>

        <p className="text-red-500 text-sm italic ml-2">{error}</p>
      </div>
    </div>
  );
};

export default CustomInput;
