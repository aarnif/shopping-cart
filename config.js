import "dotenv/config";

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 4000;
const SERVER_URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:${PORT}`
    : process.env.SERVER_URL;

export default { DATABASE_URL, SERVER_URL, PORT };
