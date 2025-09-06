interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function getAllItems(): Promise<ApiResponse<any[]>> {
  const response = await fetch("/api/items");
  const data = await response.json();
  return data;
}
