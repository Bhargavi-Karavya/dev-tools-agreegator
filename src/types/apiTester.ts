export interface ApiRequest {
  id: string;
  name: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: string;
  createdAt: string;
}

export interface ApiResponse {
  status: number;
  data: unknown; // keeps flexibility
  headers?: Record<string, string>;
}

export interface SaveRequestHandler {
  (req: ApiRequest): void;
}
