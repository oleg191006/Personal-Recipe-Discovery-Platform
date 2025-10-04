import {
  isAxiosError,
  type RawAxiosRequestHeaders,
  type AxiosRequestConfig,
} from "axios";

import type { HttpMethod } from "../shared/types/services/services.types";
import { axiosClient } from "../shared/plugins/axiosClient";
import {
  ResponseError,
  type ErrorResponse,
} from "../shared/exeptions/response-error";
import { getAccessToken } from "../shared/utils/auth-storage";

export type RequestParams = {
  data?: unknown;
  headers?: RawAxiosRequestHeaders;
  method: HttpMethod;
  timeout?: number;
  url: string;
  responseType?: AxiosRequestConfig["responseType"];
  params?: AxiosRequestConfig["params"];
};

export const baseService = {
  request: async <T = unknown>({
    data,
    headers,
    method,
    timeout,
    url,
    responseType,
  }: RequestParams) => {
    try {
      const response = await axiosClient.request<T>({
        data,
        headers,
        method,
        timeout,
        url,
        responseType,
      });

      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const serverError = error.response.data as ErrorResponse;

        throw new ResponseError(serverError);
      }

      axiosClient.interceptors.request.use(
        (config) => {
          const accessToken = getAccessToken();

          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      throw new ResponseError({
        code: "UNKNOWN_ERROR",
        message: "UNKNOWN_ERROR_MESSAGE",
      });
    }
  },
};
