import { useContext } from "react";
import { AuthContext } from "../../context/AuthContetxt";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth має використовуватися в межах AuthProvider");
  }
  return context;
};
