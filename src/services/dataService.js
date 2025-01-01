import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const getAll = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

export default { getAll };
