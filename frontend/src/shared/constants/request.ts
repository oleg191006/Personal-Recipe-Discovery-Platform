export const API_URLS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
  },
  recipes: {
    getAll: "/recipes",
    search: "/recipes",
    create: "/recipes",
    getMy: "/recipes/my",
    getById: "/recipes/:id",
    rate: "/recipes/:id/rate",
    delete: "/recipes/:id",
  },
};
