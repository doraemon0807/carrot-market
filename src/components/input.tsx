import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  kind?: "text" | "phone" | "price";
  register: UseFormRegisterReturn;
  required?: boolean;
  [key: string]: any;
}

export default function Input({
  name,
  label,
  kind = "text",
  register,
  required,
  ...rest
}: InputProps) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        {kind === "text" ? (
          <input
            id={name}
            {...register}
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            type={kind}
            required={required}
            {...rest}
          />
        ) : kind === "phone" ? (
          <div className="flex rounded-md shadow-sm">
            <span className="flex select-none items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
              +1
            </span>
            <input
              id={name}
              {...register}
              className="w-full appearance-none rounded-r-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              type={kind}
              required={required}
              {...rest}
            />
          </div>
        ) : kind === "price" ? (
          <div className="relative flex items-center rounded-md shadow-sm">
            <div className="absolute left-0 flex items-center justify-center pl-3">
              <span className="pointer-events-none select-none text-sm text-gray-500">
                $
              </span>
            </div>
            <input
              className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pl-7 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              id={name}
              {...register}
              placeholder="0.00"
              type={kind}
              required={required}
              {...rest}
            />
            <div className="absolute right-0 flex items-center pr-3">
              <span className="pointer-events-none select-none text-sm text-gray-500">
                USD
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
