import React, { useState } from "react";
import * as Yup from "yup";
import {
  LoginSchema,
  RegisterSchema,
} from "../shared/schemas/validationSchemas";
import { authService } from "../services/authService";
import type { LoginDto, RegisterDto } from "../shared/types/auth/auth.types";
import { ResponseError } from "../shared/exeptions/response-error";
import { useAuth } from "../shared/hooks/useAuth";

import "../index.css";
import AuthForm from "../shared/components/AuthForm";
import type { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";

type AuthFormValues = LoginDto & RegisterDto & { confirmPassword: string };

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [serverError, setServerError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const initialValues: AuthFormValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema: Yup.ObjectSchema<AuthFormValues> = isLogin
    ? (LoginSchema as Yup.ObjectSchema<AuthFormValues>)
    : (RegisterSchema as Yup.ObjectSchema<AuthFormValues>);

  const handleSubmit = async (
    values: AuthFormValues,
    { setSubmitting, resetForm }: FormikHelpers<AuthFormValues>
  ): Promise<void> => {
    setLoading(true);
    setServerError("");
    setSubmitting(true);

    try {
      let tokens;

      if (isLogin) {
        const loginData: LoginDto = {
          email: values.email,
          password: values.password,
        };
        tokens = await authService.login(loginData);
      } else {
        const registerData: RegisterDto = {
          email: values.email,
          password: values.password,
        };
        tokens = await authService.register(registerData);
      }

      login(tokens);

      navigate("/recipes", { replace: true });

      resetForm();
    } catch (error: unknown) {
      if (error instanceof ResponseError) {
        setServerError(error.message);
      } else {
        setServerError("Виникла невідома помилка мережі. Спробуйте пізніше.");
      }
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          {isLogin ? "Вхід до системи" : "Створити акаунт"}
        </h2>

        {serverError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{serverError}</span>
          </div>
        )}

        <AuthForm
          isLogin={isLogin}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          loading={loading}
        />

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Не маєте акаунту?" : "Вже зареєстровані?"}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setServerError("");
            }}
            className="font-medium text-blue-600 hover:text-blue-500 ml-1 focus:outline-none"
          >
            {isLogin ? "Зареєструватися" : "Увійти"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
