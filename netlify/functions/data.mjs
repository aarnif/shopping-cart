import data from "../../data.json";

export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(data.art),
  };
};
