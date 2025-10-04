import React from "react";
import { Routes, Route, Navigate, Outlet, Link } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import RecipeListPage from "./pages/RecipeListPage";
import { RecipeDetailsPage } from "./pages/RecipeDetailPage";

const Layout: React.FC = () => {
  return (
    <div>
      <header className="bg-green-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/recipes"
            className="text-2xl font-bold hover:text-green-200 transition-colors"
          >
            Recipe Hub
          </Link>
          <nav className="space-x-4">
            <Link to="/recipes" className="hover:text-green-200">
              Усі Рецепти
            </Link>
            <Link to="/recipes/my" className="hover:text-green-200">
              Мої Рецепти
            </Link>
            <Link to="/recipes/new" className="hover:text-green-200">
              Створити
            </Link>
          </nav>
        </div>
      </header>
      <main className="p-4 container mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/recipes/:id" element={<RecipeDetailsPage />} />

      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Navigate to="/recipes" replace />} />

        <Route path="/recipes" element={<RecipeListPage />} />
        <Route
          path="/recipes/my"
          element={<RecipeListPage isMyRecipesView />}
        />
        <Route path="/recipes/new" element={<CreateRecipePage />} />
      </Route>

      <Route path="*" element={<h1>404 | Сторінку не знайдено</h1>} />
    </Routes>
  );
};

export default App;
