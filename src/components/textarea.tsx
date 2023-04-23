interface TextAreaProps {
  label?: string;
  name?: string;
  placeholder?: string;
}

export default function TextArea({ label, placeholder, name }: TextAreaProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <textarea
        id={name}
        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
        rows={4}
        placeholder={placeholder}
      />
    </div>
  );
}
