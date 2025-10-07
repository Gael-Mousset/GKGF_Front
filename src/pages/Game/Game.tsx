import { useEffect, useState } from "react";
import { getGame } from "../../services/api/game";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";

const Game = () => {
  const [game, setGame] = useState<any>({});
  const { id } = useParams<{ id: string }>();

  console.log(id);

  useEffect(() => {
    const fetchGame = async () => {
      const data = await getGame(Number(id));
      setGame(data);
    };
    fetchGame();
  }, [id]);

  console.log(game);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:5173/game/${game.id}`;

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head><title>QR Code</title></head>
        <body style="text-align:center; padding:20px;">
          <h2>QR Code du jeu ${game.id}</h2>
          <img src="${qrUrl}" alt="QR Code" />
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = window.close;
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDownloadPdf = async () => {
    const doc = new jsPDF();

    // Charger l'image du QR code
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = qrUrl;

    img.onload = () => {
      // Ajouter un titre
      doc.setFontSize(16);
      doc.text(`QR Code du jeu ${game.id}`, 20, 20);

      // Ajouter l'image (x, y, largeur, hauteur)
      doc.addImage(img, "PNG", 20, 30, 100, 100);

      // Télécharger le fichier PDF
      const pdfUrl = doc.output("bloburl");
      window.open(pdfUrl, "_blank");
    };
  };

  if (!game) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex gap-6 rounded-2xl p-6">
        {/* Image */}
        <div className="w-2/3 flex justify-center items-start">
          <img
            src="https://storage.googleapis.com/images.pricecharting.com/AMIfv97yNOhlgL2dDT7rlDOZU4gvz1BjUFG1_zHs2d-3nzRq0Wa_PLHc04TwalaPI1Tg14Gp74_RcW0L6KshHnaaEJjGwEn4z5odiW5icpxcGyyz2RXU-E1XIPsOTZh8stFFEMaMneS9mUdv1n-UqlEniJ_SbV3sdw/240.jpg"
            alt={game.title}
            className="rounded-xl shadow-md w-full"
          />
        </div>

        {/* Infos */}
        <div className="w-2/3 space-y-4">
          <h1 className="text-3xl font-bold">{game.title}</h1>
          <p className="text-gray-500 italic">{game.series?.name}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p>
                <span className="font-semibold">Plateforme :</span>{" "}
                {game.plateforme?.name}
              </p>
              <p>
                <span className="font-semibold">Édition :</span>{" "}
                {game.editions?.name}
              </p>
              <p>
                <span className="font-semibold">Format :</span> {game.format}
              </p>
              <p>
                <span className="font-semibold">Région :</span> {game.region}
              </p>
              <p>
                <span className="font-semibold">Audience :</span>{" "}
                {game.audience}
              </p>
            </div>

            <div>
              <p>
                <span className="font-semibold">Boîte :</span>{" "}
                {game.boite ? "Oui" : "Non"}
              </p>
              <p>
                <span className="font-semibold">Manuel :</span>{" "}
                {game.manuel ? "Oui" : "Non"}
              </p>
              <p>
                <span className="font-semibold">État Jeu :</span> {game.etatJeu}
              </p>
              <p>
                <span className="font-semibold">État Boîte :</span>{" "}
                {game.etatbox}
              </p>
              <p>
                <span className="font-semibold">État Manuel :</span>{" "}
                {game.etatManuel}
              </p>
            </div>
          </div>

          {/* Collection */}
          <div className="pt-4 border-t">
            <h2 className="text-lg font-semibold">Collection</h2>
            <p>
              <span className="font-semibold">Objectif :</span> {game.objectif}
            </p>
            <p>
              <span className="font-semibold">Lieu :</span>{" "}
              {game.location?.name}
            </p>
            <p>
              <span className="font-semibold">Prix estimé :</span>{" "}
              {game.vente?.prix_estime} €
            </p>
            <p>
              <span className="font-semibold">Achat :</span>{" "}
              {game.vente?.salePlace}
            </p>
          </div>

          {/* Description */}
          {game.description && (
            <div className="pt-4 border-t">
              <h2 className="text-lg font-semibold">Description</h2>
              <p>{game.description}</p>
            </div>
          )}
          <div className="flex gap-4 pt-4 border-t">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Imprimer le QR Code
            </button>
            <button
              onClick={handleDownloadPdf}
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Télécharger QR Code en PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
