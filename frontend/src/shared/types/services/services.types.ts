export interface ErrorResponse {
  code: string;
  message: string;
  status: number;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
