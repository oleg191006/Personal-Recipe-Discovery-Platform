import * as Yup from "yup";
import type { LoginDto, RegisterDto } from "../types/auth/auth.types";

export const LoginSchema: Yup.ObjectSchema<LoginDto> = Yup.object({
  email: Yup.string()
    .email("Невірний формат Email")
    .required("Email є обов'язковим"),
  password: Yup.string()
    .min(6, "Пароль має бути не менше 6 символів")
    .required("Пароль є обов'язковим"),
});

export const RegisterSchema: Yup.ObjectSchema<
  RegisterDto & { confirmPassword: string }
> = Yup.object({
  email: Yup.string()
    .email("Невірний формат Email")
    .required("Email є обов'язковим"),
  password: Yup.string()
    .min(8, "Пароль має бути не менше 8 символів")
    .required("Пароль є обов'язковим")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      "Пароль має містити великі, маленькі літери та цифри"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Паролі мають співпадати")
    .required("Підтвердження пароля є обов'язковим"),
});

export const CreateRecipeSchema = Yup.object().shape({
  title: Yup.string()
    .required("Назва рецепту є обов'язковою.")
    .max(255, "Назва не може перевищувати 255 символів."),

  description: Yup.string().optional(),

  ingredients: Yup.string()
    .required("Список інгредієнтів є обов'язковим.")
    .min(10, "Вкажіть принаймні кілька інгредієнтів."),

  instructions: Yup.string()
    .required("Інструкції з приготування є обов'язковими.")
    .min(20, "Надайте детальні інструкції."),
});
