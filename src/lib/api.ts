/**
 * Get the API base URL from environment variables
 */
export const getApiUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
};

/**
 * Create a full API endpoint URL
 */
export const apiUrl = (endpoint: string): string => {
  const baseUrl = getApiUrl();
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${baseUrl}/${cleanEndpoint}`;
};
