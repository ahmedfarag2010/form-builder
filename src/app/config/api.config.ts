/**
 * Central API configuration. Change `API_BASE_URL` for all API calls.
 */
const trimTrailingSlashes = (url: string): string => url.replace(/\/+$/, '');
const trimLeadingSlashes = (path: string): string => path.replace(/^\/+/, '');

/** Base origin only (no trailing slash), e.g. https://api.example.com */
export const API_BASE_URL = trimTrailingSlashes(
  // 'http://www.exc.somee.com'
  'http://172.17.244.4:70'
);

/**
 * Build a full URL from a path relative to `API_BASE_URL`.
 * @param path e.g. `"api/auth/login"` or `"/api/services"`
 */
export function buildApiUrl(path: string): string {
  return `${API_BASE_URL}/${trimLeadingSlashes(path)}`;
}

/**
 * Resolved API endpoint URLs. Use these in HttpClient calls.
 */
export const API_URLS = {
  auth: {
    login: buildApiUrl('api/auth/login')
  },
  services: buildApiUrl('api/services')
} as const;
