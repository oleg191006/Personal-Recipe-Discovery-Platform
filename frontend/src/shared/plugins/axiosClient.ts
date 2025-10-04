import qs from "qs";
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { getAccessToken } from "../../shared/utils/auth-storage";
import { authService } from "../../services/authService";
import { API_URLS } from "../../shared/constants/request";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { encode: false }),
});

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (
      accessToken &&
      config.url !== API_URLS.auth.refresh &&
      !config.url?.includes("auth")
    ) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

interface FailedQueueItem {
  resolve: (value: AxiosResponse<unknown>) => void;
  reject: (reason?: AxiosError) => void;
  config: AxiosRequestConfig;
}

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: AxiosError | null, token?: string) => {
  failedQueue.forEach(({ resolve, reject, config }: FailedQueueItem) => {
    if (error) {
      reject(error);
    } else {
      if (token) {
        config.headers = {
          ...(config.headers ?? {}),
          Authorization: `Bearer ${token}`,
        };
      }
      resolve(axiosClient(config));
    }
  });

  failedQueue = [];
};

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError): Promise<AxiosResponse | never> => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    const status = error.response?.status;

    if (
      status === 401 &&
      originalRequest.url !== API_URLS.auth.refresh &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        const response: { accessToken: string } =
          await authService.refreshTokens();
        const newAccessToken = response.accessToken;

        isRefreshing = false;
        processQueue(null, newAccessToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return axiosClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError as AxiosError, undefined);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
