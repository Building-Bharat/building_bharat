import axios from "axios";

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError<{ msg?: string }>(error)) {
    return error.response?.data?.msg || error.message || fallback;
  }

  return error instanceof Error ? error.message : fallback;
}
