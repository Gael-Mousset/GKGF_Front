import { useEffect, useState } from "react";
import { getGames } from "../../services/api/game";
import { useNavigate } from "react-router-dom";

type Game = {
  id: number;
  title?: string;
  plateforme?: { name?: string };
  editions?: { name?: string };
  signal?: string;
  format?: string;
  etatJeu?: string;
  launch?: string;
  etatbox?: string;
  etatManuel?: string;
  objectif?: string;
  location?: { name?: string };
};

// Liste
const ListeTable = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const navigator = useNavigate();

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await getGames();
        setGames(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadGames();
  }, []);

  if (error) {
    return <div>Error: {String(error)}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (games.length === 0) {
    return <div>No games found</div>;
  }

  return (
    <div className="overflow-x-auto m-5">
      <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-gray-700 dark:bg-neutral-800">
          <tr className="">
            <th className="px4 py-2 text-left">Titre</th>
            <th className="px4 py-2 text-left">Plateforme</th>
            <th className="px4 py-2 text-left">Edition</th>
            <th className="px4 py-2 text-left">Signal</th>
            <th className="px4 py-2 text-left">Format</th>
            <th className="px4 py-2 text-left">Etat</th>
            <th className="px4 py-2 text-left">Launch</th>
            <th className="px4 py-2 text-left">Boîte</th>
            <th className="px4 py-2 text-left">Manuel</th>
            <th className="px4 py-2 text-left">Objectif</th>
            <th className="px4 py-2 text-left">Location</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr
              key={game.id}
              className="hover:bg-gray-50 dark:hover:bg-neutral-800"
              onClick={() => navigator(`/game/${game.id}`)}
            >
              <td className="px4 py-2 text-left">{game.title ?? "N/A"}</td>
              <td className="px4 py-2 text-left">
                {game.plateforme?.name ?? "N/A"}
              </td>
              <td className="px4 py-2 text-left">
                {game.editions?.name ?? "N/A"}
              </td>
              <td className="px4 py-2 text-left">{game.signal ?? "N/A"}</td>
              <td className="px4 py-2 text-left">{game.format ?? "N/A"}</td>
              <td className="px4 py-2 text-left">{game.etatJeu ?? "N/A"}</td>
              <td className="px4 py-2 text-left">{game.launch ?? "N/A"}</td>
              <td className="px4 py-2 text-left">{game.etatbox ?? "N/A"}</td>
              <td className="px4 py-2 text-left">{game.etatManuel ?? "N/A"}</td>
              <td className="px4 py-2 text-left">{game.objectif ?? "N/A"}</td>
              <td className="px4 py-2 text-left">
                {game.location?.name ?? "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeTable;
