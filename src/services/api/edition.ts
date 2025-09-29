import { useApi } from "../useApi";

const api = useApi();

export const getEdition = async () => {
  try {
    const { data } = await api.get("/edition");
    return data;
  } catch (error) {
    console.error(error);
  }
};
