import React, { useState } from "react";
import ArticlList from "../../components/list/articlList";
import AddGame from "../../components/add/AddGame";

const ListeGames = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Liste des jeux</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-5">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl"
        >
          Ouvrir la popup
        </button>
        <AddGame isOpen={open} onClose={() => setOpen(false)}>
          <h2 className="text-xl font-bold">Salut 👋</h2>
          <p>Ceci est une popup réutilisable.</p>
        </AddGame>
        <ArticlList />
      </div>
    </div>
  );
};

export default ListeGames;
