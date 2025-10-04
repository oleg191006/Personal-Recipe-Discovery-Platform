import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "./FormField";

export interface AuthFormValues {
  email: string;
  password: string;
  confirmPassword?: string;
}

interface AuthFormProps {
  isLogin: boolean;
  initialValues: AuthFormValues;
  validationSchema: Yup.ObjectSchema<AuthFormValues>;
  onSubmit: () => Promise<void>;
  loading: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isLogin,
  initialValues,
  validationSchema,
  onSubmit,
  loading,
}) => {
  return (
    <Formik<AuthFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <FormField<AuthFormValues>
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="name@example.com"
          />

          <FormField<AuthFormValues>
            id="password"
            name="password"
            label="Пароль"
            type="password"
            placeholder="Мінімум 8 символів"
          />

          {!isLogin && (
            <FormField<AuthFormValues>
              id="confirmPassword"
              name="confirmPassword"
              label="Підтвердіть пароль"
              type="password"
              placeholder="Повторіть пароль"
            />
          )}

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white 
              ${
                isSubmitting || loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }`}
          >
            {loading ? "Обробка..." : isLogin ? "Увійти" : "Зареєструватися"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
