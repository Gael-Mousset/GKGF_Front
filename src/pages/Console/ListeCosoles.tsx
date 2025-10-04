import ArticlList from "../../components/list/ArticlList";

const ListeGames = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Liste des jeux</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-5">
        <ArticlList />
      </div>
    </div>
  );
};

export default ListeGames;
