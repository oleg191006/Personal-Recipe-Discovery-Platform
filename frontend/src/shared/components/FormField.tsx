import {
  Field,
  ErrorMessage,
  useFormikContext,
  type FormikValues,
} from "formik";

interface FormFieldProps<T> {
  id: string;
  name: keyof T;
  label: string;
  type?: "text" | "password" | "email";
  placeholder?: string;
}

function FormField<T extends FormikValues>({
  id,
  name,
  label,
  type = "text",
  placeholder,
}: FormFieldProps<T>) {
  const { errors, touched } = useFormikContext<T>();
  const hasError = errors[name] && touched[name];

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Field
        id={id}
        name={name as string}
        type={type}
        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
          hasError ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name as string}
        component="div"
        className="text-sm text-red-600 mt-1"
      />
    </div>
  );
}

export default FormField;
