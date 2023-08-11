import { useState, useEffect } from "react";
import { IFormField } from "./interface";

function FormField({ label, type, register, name, error }: IFormField) {
  const [displayError, setDisplayError] = useState<string | undefined>("");

  const handleChange = () => {
    setDisplayError("");
  };

  useEffect(() => {
    setDisplayError(error);
  }, [error]);

  return (
    <>
      <div className="relative">
        <input
          type={type}
          id={label}
          className="focus:border-secondary-100 border-secondary-400 peer block w-full appearance-none rounded-lg border border-opacity-20 bg-transparent px-2.5 pb-1.5 pt-3 text-sm text-gray-900 focus:outline-none focus:ring-0 "
          placeholder=" "
          {...register(name)}
          onChange={handleChange}
          autoComplete="off"
        />
        <label
          htmlFor={label}
          className="peer-focus:text-secondary-400 bg-primary-100 absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2"
        >
          {label}
        </label>
      </div>
      <p className="text-red-800">{displayError}</p>
    </>
  );
}

export default FormField;
