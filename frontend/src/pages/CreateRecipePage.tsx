import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CreateRecipeSchema } from "../shared/schemas/validationSchemas";
import type { CreateRecipeDto } from "../shared/types/recipe/recipe.types";
import FormField from "../shared/components/FormField";
import { useCreateRecipe } from "../shared/hooks/useCreateRecipe";

const initialValues: CreateRecipeDto = {
  title: "",
  description: "",
  ingredients: "",
  instructions: "",
  cuisineType: "",
};

const CreateRecipePage: React.FC = () => {
  const { createRecipe, loading, serverError } = useCreateRecipe();

  const handleSubmit = async (
    values: CreateRecipeDto,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setSubmitting(true);
    try {
      await createRecipe(values);
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Додати Новий Рецепт
        </h2>

        {serverError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {serverError}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={CreateRecipeSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <FormField<CreateRecipeDto>
                id="title"
                name="title"
                label="Назва Рецепту"
                placeholder="Наприклад, Борщ із пампушками"
              />
              <FormField<CreateRecipeDto>
                id="description"
                name="description"
                label="Короткий Опис (Опціонально)"
                placeholder="Опишіть страву кількома реченнями"
              />
              <FormField<CreateRecipeDto>
                id="cuisineType"
                name="cuisineType"
                label="Тип Кухні (Опціонально)"
                placeholder="Наприклад, Українська, Італійська"
              />

              <div>
                <label
                  htmlFor="ingredients"
                  className="block text-sm font-medium text-gray-700"
                >
                  Інгредієнти
                </label>
                <Field
                  as="textarea"
                  id="ingredients"
                  name="ingredients"
                  rows={5}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300"
                  placeholder="2 буряки, 1 цибуля, 300г м'яса..."
                />
                <ErrorMessage
                  name="ingredients"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="instructions"
                  className="block text-sm font-medium text-gray-700"
                >
                  Інструкції з Приготування
                </label>
                <Field
                  as="textarea"
                  id="instructions"
                  name="instructions"
                  rows={8}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300"
                  placeholder="1. Обсмажте цибулю. 2. Додайте буряк..."
                />
                <ErrorMessage
                  name="instructions"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white 
                  ${
                    isSubmitting || loading
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  }`}
              >
                {loading ? "Створення..." : "Опублікувати Рецепт"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateRecipePage;
