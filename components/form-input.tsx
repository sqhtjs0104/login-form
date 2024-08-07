import { InputHTMLAttributes } from "react";

interface FormInputProps {
  name: string;
  errors?: string[];
}

export default function FormInput({
  name,
  errors,
  ...rest
}: FormInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className={`bg-transparent rounded-3xl w-full h-10 focus:outline-none ring-2 focus:ring-4 transitio border-none placeholder:text-neutral-400 ${errors && errors.length > 0 ? "border-red-400 ring-red-400" : "ring-neutral-200 focus:ring-offset-neutral-200"}`}
        {...rest}
      />
      {errors && errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}