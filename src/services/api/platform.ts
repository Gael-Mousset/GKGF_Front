import { useApi } from "../useApi";

const api = useApi();

export const getPlateform = async () => {
  try {
    const { data } = await api.get("/plateform");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createPlateform = async (data: any) => {
  try {
    await api.post("/plateform", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
