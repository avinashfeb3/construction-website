export const apiUrl = import.meta.env.VITE_API_BASE_URL;
export const apiFileUrl = import.meta.env.VITE_API_FILE_URL || "";

export const getFileUrl = (path = "") => {
  const base = String(apiFileUrl || "");
  if (!path) return base;
  return base.replace(/\/+$/, "") + "/" + String(path).replace(/^\/+/, "");
};

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
