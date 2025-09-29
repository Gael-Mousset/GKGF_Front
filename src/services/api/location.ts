import { useApi } from "../useApi";

const api = useApi();

export const getLocation = async () => {
  try {
    const { data } = await api.get("/location");
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const createLocation = async (data: any) => {
  try {
    await api.post("/location", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
