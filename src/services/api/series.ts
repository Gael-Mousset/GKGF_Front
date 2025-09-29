import { useApi } from "../useApi";

const api = useApi();

export const getSeries = async () => {
  try {
    const { data } = await api.get("/series");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createSeries = async (data: any) => {
  try {
    await api.post("/series", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
