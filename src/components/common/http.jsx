export const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const token = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) return null; 

  try {
    const data = JSON.parse(userInfo);
    return data?.token || null;
  } catch (error) {
    console.error("Error parsing userInfo:", error);
    return null;
  }
};
