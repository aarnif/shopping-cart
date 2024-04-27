import axios from "axios";
const baseUrl = "http://localhost:3001";

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/art`);
  return response.data;
};

export default { getAll };