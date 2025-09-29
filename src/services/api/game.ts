import type { IFormGame } from "../interface/IFormGame";
import { useApi } from "../useApi";

const api = useApi();

export const createGame = async (data: IFormGame) => {
  try {
    await api.post("/game", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getGame = async (id: number) => {
  try {
    const { data } = await api.get(`/game/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getGames = async () => {
  try {
    const { data } = await api.get("/game");
    return data;
  } catch (error) {
    console.error(error);
  }
};
