const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.cy-com.com";

export interface ApiClientConfig {
  baseUrl?: string;
  accessToken?: string;
}

export interface ApiResponse<T> {
  data: T;
  count?: number;
  next?: string | null;
  previous?: string | null;
}

export interface ApiError {
  status: number;
  errors: Record<string, string[]>;
}

export class CyberComApiClient {
  private baseUrl: string;
  private accessToken?: string;

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = (config.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");
    this.accessToken = config.accessToken;
  }

  private buildHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (this.accessToken) {
      headers["Authorization"] = `Bearer ${this.accessToken}`;
    }
    return headers;
  }

  async get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
    const url = new URL(`${this.baseUrl}/api/v1/public${path}`);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") {
          url.searchParams.set(k, String(v));
        }
      });
    }
    const res = await fetch(url.toString(), {
      headers: this.buildHeaders(),
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw { status: res.status, errors: body.errors ?? {} } as ApiError;
    }
    return res.json() as Promise<T>;
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}/api/v1/public${path}`, {
      method: "POST",
      headers: this.buildHeaders(),
      body: JSON.stringify(body),
      credentials: "include",
    });
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw { status: res.status, errors: errBody.errors ?? {} } as ApiError;
    }
    return res.json() as Promise<T>;
  }
}

export const apiClient = new CyberComApiClient();
