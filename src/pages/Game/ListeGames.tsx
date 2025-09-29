import React, { useState } from "react";
import ArticlList from "../../components/list/articlList";
import AddGame from "../../components/add/AddGame";
import ListeTable from "../../components/list/ListeTable";

const ListeGames = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-5">
      <h1 className="text-center text-3xl font-bold">Liste des jeux</h1>

      <div className="flex justify-center">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl"
        >
          Ajouter un jeu
        </button>
        <AddGame isOpen={open} onClose={() => setOpen(false)}></AddGame>
      </div>
      <div>
        <ListeTable />
      </div>
    </div>
  );
};

export default ListeGames;
