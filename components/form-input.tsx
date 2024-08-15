interface FormInputProps {
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  errors: string[];
}

export default function FormInput({
  name,
  type,
  placeholder,
  required,
  errors,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className={`bg-transparent rounded-3xl w-full h-10 focus:outline-none ring-2 focus:ring-4 transitio border-none placeholder:text-neutral-400 ${errors.length > 0 ? "border-red-400 ring-red-400" : "ring-neutral-200 focus:ring-offset-neutral-200"}`}
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}