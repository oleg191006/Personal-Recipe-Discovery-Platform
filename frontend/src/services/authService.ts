import { API_URLS } from "../shared/constants/request";
import type {
  AuthTokens,
  LoginDto,
  RegisterDto,
} from "../shared/types/auth/auth.types";
import { clearTokens, saveTokens } from "../shared/utils/auth-storage";
import { baseService } from "./baseService";

export const authService = {
  register: async (data: RegisterDto): Promise<AuthTokens> => {
    const tokens = await baseService.request<AuthTokens>({
      method: "POST",
      url: API_URLS.auth.register,
      data,
    });

    saveTokens(tokens);
    return tokens;
  },

  login: async (data: LoginDto): Promise<AuthTokens> => {
    const tokens = await baseService.request<AuthTokens>({
      method: "POST",
      url: API_URLS.auth.login,
      data,
    });

    saveTokens(tokens);
    return tokens;
  },

  logout: (): void => {
    clearTokens();
  },

  refreshTokens: async (): Promise<AuthTokens> => {
    const tokens = await baseService.request<AuthTokens>({
      method: "POST",
      url: API_URLS.auth.refresh,
    });

    saveTokens(tokens);
    return tokens;
  },
};
