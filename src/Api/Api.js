export const apiFetch = async (endpoint, options = {}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const url = `${apiUrl}${endpoint}`;
  
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
};