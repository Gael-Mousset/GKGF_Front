import { useEffect, useState } from "react";
import { getSeries } from "../../services/api/series";
import { getPlateform } from "../../services/api/platform";
import { getLocation } from "../../services/api/location";
import { getEdition } from "../../services/api/edition";
import { type IFormGame } from "../../services/interface/IFormGame";
import { set, useForm, type SubmitHandler } from "react-hook-form";
import { createGame } from "../../services/api/game";
import type { ISeries } from "../../services/interface/ISeries";
import type { IPlatforme } from "../../services/interface/IPlatform";
import type { ILocation } from "../../services/interface/ILocation";
import type { IEdition } from "../../services/interface/IEdition";
import AddSeries from "./addSeries";
import AddPlatform from "./AddPlatform";
import AddLocation from "./AddLocation";

const steps = [
  {
    key: "info",
    label: "Infos",
  },
  {
    key: "etap-location-description",
    label: "État & Localisation / Description",
  },
  { key: "vente", label: "Vente" },
] as const;
type StepKey = (typeof steps)[number]["key"];

const AddGame = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  const [series, setSeries] = useState<ISeries[]>([]);
  const [plateform, setPlateform] = useState<IPlatforme[]>([]);
  const [location, setLocation] = useState<ILocation[]>([]);
  const [edition, setEdition] = useState<IEdition[]>([]);

  const loadSeries = async () => {
    const series = await getSeries();
    setSeries(series);
  };

  const loadPlateform = async () => {
    const plateform = await getPlateform();
    setPlateform(plateform);
  };

  const loadLocation = async () => {
    const location = await getLocation();
    setLocation(location);
  };

  const [openSeries, setOpenSeries] = useState(false);
  const [openPlateform, setOpenPlateform] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);

  const [stepIndex, setStepIndex] = useState(0);
  const currentStep: StepKey = steps[stepIndex].key;

  const initrialForm: IFormGame = {
    title: "",
    idSeries: 0,
    sortTitle: "",
    plateformeId: 0,
    serial_number: "",
    barcode: "",
    format: "Cartouche",
    idEdition: 0,
    region: "EUR",
    signal: "PAL",
    audience: "All",
    language: "English",
    excusivity: false,
    jeux: false,
    boite: false,
    manuel: false,
    etatJeu: "non_defini",
    launch: "WORKING",
    etatbox: "non_defini",
    etatManuel: "non_defini",
    objectif: "non_defini",
    idLocation: 0,
    description: "",
    userId: 14,
    vente: {
      prix_achat: 0,
      date_achat: "",
      nameSalePlace: "",
      salePlace: "non_defini",
      prix_estime: 0,
    },
  };

  useEffect(() => {
    loadSeries();

    loadPlateform();

    loadLocation();
    const loadEdition = async () => {
      const edition = await getEdition();
      setEdition(edition);
    };

    loadSeries();
    loadPlateform();
    loadLocation();
    loadEdition();
  }, []);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<IFormGame>({ defaultValues: initrialForm });

  const onSubmit: SubmitHandler<IFormGame> = async (formDate: IFormGame) => {
    console.log(formDate.plateformeId);

    console.log(formDate);

    await createGame(formDate);
    window.location.reload();
  };

  const goNext = async () => {
    const ok = await trigger();
    if (!ok) return;
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  const goBack = () => {
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      // onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl bg-white shadow-xl outine-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b p-5">
          <h1 className="text-2xl font-bold">Add Game</h1>
        </div>

        {/* Stepper*/}
        <div className="flex items-center gap-3 p-5 pt-4">
          {steps.map((s, idx) => (
            <div key={s.key} className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStepIndex(idx)}
                className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold border ${
                  idx === stepIndex
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700"
                }`}
                aria-current={idx === stepIndex}
              >
                {idx + 1}
              </button>
              <span
                className={`text-sm ${
                  idx === stepIndex ? "font-semibold" : "text-gray-500"
                }`}
              >
                {s.label}
              </span>
              {idx < steps.length - 1 && (
                <span className="w-8 h-px bg-gray-300" />
              )}
            </div>
          ))}
        </div>

        <form className="grid gap-6 p-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Infos Principales */}
          {currentStep === "info" && (
            <div className="grid gap-6">
              <fieldset className="grid gap-4">
                <legend className="text-lg font-semibold">
                  Infos Principales
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Name"
                      className="border-2 border-black rounded-lg p-2"
                      {...register("title")}
                    />
                    {errors.title && <p>This is an error</p>}
                  </div>

                  <div className="grid gap-1.5">
                    <label htmlFor="image">Series</label>
                    <select
                      className="input-type-console"
                      {...register("idSeries", { valueAsNumber: true })}
                    >
                      {series.map((series) => (
                        <option value={series.id}>{series.name}</option>
                      ))}
                    </select>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-xl"
                      type="button"
                      onClick={() => setOpenSeries(true)}
                    >
                      Ajouter une série
                    </button>
                    <AddSeries
                      isOpen={openSeries}
                      onClose={() => setOpenSeries(false)}
                      onCreated={async (created) => {
                        setSeries((prev) => {
                          const exists = prev.some(
                            (series) => series.id === created.id
                          );
                          return exists
                            ? prev.map((series) =>
                                series === created.id ? created : series
                              )
                            : [...prev, created];
                        });

                        await loadSeries();
                      }}
                    ></AddSeries>
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="image">Titre de trie</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Titre de trie"
                      className="border-2 border-black rounded-lg p-2"
                      {...register("sortTitle")}
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <label htmlFor="image">Platform</label>
                    <select
                      className="input-type-console"
                      {...register("plateformeId", { valueAsNumber: true })}
                    >
                      {plateform.map((plateform) => (
                        <option value={plateform.id}>{plateform.name}</option>
                      ))}
                    </select>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-xl"
                      type="button"
                      onClick={() => setOpenPlateform(true)}
                    >
                      Ajouter une platforme
                    </button>
                    <AddPlatform
                      isOpen={openPlateform}
                      onClose={() => setOpenPlateform(false)}
                      onCreated={async (created) => {
                        setSeries((prev) => {
                          const exists = prev.some(
                            (platform) => platform.id === created.id
                          );
                          return exists
                            ? prev.map((plateform) =>
                                plateform === created.id ? created : plateform
                              )
                            : [...prev, created];
                        });

                        await loadPlateform();
                      }}
                    ></AddPlatform>
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="image">Numero de series</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Numero de series"
                      className="border-2 border-black rounded-lg p-2"
                      {...register("serial_number")}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="image">Code-barres</label>
                    <input
                      type="number"
                      id="name"
                      placeholder="Code-barres"
                      className="border-2 border-black rounded-lg p-2"
                      {...register("barcode")}
                    />
                  </div>
                </div>
              </fieldset>
            </div>
          )}

          {/* Metadonnées techniques */}
          {currentStep === "etap-location-description" && (
            <div className="grid gap-6">
              <fieldset className="grid gap-4">
                <legend className="text-lg font-semibold">
                  Infos Principales
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="image">Format</label>
                    <select
                      className="input-type-console"
                      {...register("format")}
                    >
                      <option value="Cartouche">Cartouche</option>
                      <option value="Cassette">Cassette</option>
                      <option value="Disquette">Disquette</option>
                      <option value="CD">CD</option>
                      <option value="DVD">DVD</option>
                      <option value="BluRay">BluRay</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="image">Edition</label>
                    <select
                      className="input-type-console"
                      {...register("idEdition", { valueAsNumber: true })}
                    >
                      {edition.map((edition) => (
                        <option value={edition.id}>{edition.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="image">Region</label>
                    <select
                      className="input-type-console"
                      {...register("region")}
                    >
                      <option value="EUR">EUR</option>
                      <option value="US">US</option>
                      <option value="JAP">JAP</option>
                      <option value="Multiple">Multiple</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="image">Signal</label>
                    <select
                      className="input-type-console"
                      {...register("signal")}
                    >
                      <option value="PAL">PAL</option>
                      <option value="NTSC">NTSC</option>
                      <option value="NTSC_Japan">NTSC_Japan</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="image">Limite d'age</label>
                    <select
                      className="input-type-console"
                      {...register("audience")}
                    >
                      <option value="All">All</option>
                      <option value="Pegi_3">Pegi_3</option>
                      <option value="Pegi_7">Pegi_7</option>
                      <option value="Pegi_12">Pegi_12</option>
                      <option value="Pegi_16">Pegi_16</option>
                      <option value="Pegi_18">Pegi_18</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="image">Langue</label>
                    <select
                      className="input-type-console"
                      {...register("language")}
                    >
                      <option value="English">English</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Italian">Italien</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Korean">Korean</option>
                      <option value="Chinese">Chinese</option>
                    </select>
                  </div>
                  <div className="flex">
                    <input
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-default-checkbox"
                      {...register("excusivity")}
                    />
                    <label
                      for="hs-default-checkbox"
                      class="text-sm text-gray-500 ms-3 dark:text-neutral-400"
                    >
                      Excusiviter
                    </label>
                  </div>
                </div>
              </fieldset>

              {/* Etat */}

              <fieldset className="grid gap-4">
                <legend className="text-lg font-semibold">État</legend>
                <div className="grid gap-3">
                  {/* Jeux */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="has-game"
                        className="h-4 w-4"
                        id="hs-default-checkbox"
                        {...register("jeux")}
                      />
                      <label className="text-sm text-gray-700">jeux</label>
                    </div>

                    <select
                      className="rounded-lg border-2 border-black p-2"
                      {...register("etatJeu")}
                    >
                      <option value="non_defini">non_defini</option>
                      <option value="neuf">neuf</option>
                      <option value="tres_bon">tres_bon</option>
                      <option value="bon">bon</option>
                      <option value="moyen">moyen</option>
                      <option value="mauvais">mauvais</option>
                      <option value="tres_mauvais">tres_mauvais</option>
                      <option value="hors_serie">hors_serie</option>
                    </select>

                    <select
                      className="rounded-lg border-2 border-black p-2"
                      {...register("launch")}
                    >
                      <option value="non_defini">non_defini</option>
                      <option value="WORKING">WORKING</option>
                      <option value="PARTIAL">PARTIAL</option>
                      <option value="NOT_WORKING">NOT_WORKING</option>
                    </select>
                  </div>
                  {/* Boîte */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="has_box"
                        className="h-4 w-4"
                        {...register("boite")}
                      />
                      <label className="text-sm text-gray-700">boite</label>
                    </div>

                    <select
                      name="box_condition"
                      className="rounded-lg border-2 border-black p-2"
                      {...register("etatbox")}
                    >
                      <option value="non_defini">non_defini</option>
                      <option value="neuf">neuf</option>
                      <option value="tres_bon">tres_bon</option>
                      <option value="bon">bon</option>
                      <option value="moyen">moyen</option>
                      <option value="mauvais">mauvais</option>
                      <option value="tres_mauvais">tres_mauvais</option>
                      <option value="hors_serie">hors_serie</option>
                    </select>
                  </div>

                  {/* Manuel */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="has_manual"
                        className="h-4 w-4"
                        {...register("manuel")}
                      />
                      <label className="text-sm text-gray-700">manuel</label>
                    </div>

                    <select
                      name="manual_condition"
                      className="rounded-lg border-2 border-black p-2"
                      {...register("etatManuel")}
                    >
                      <option value="non_defini">non_defini</option>
                      <option value="neuf">neuf</option>
                      <option value="tres_bon">tres_bon</option>
                      <option value="bon">bon</option>
                      <option value="moyen">moyen</option>
                      <option value="mauvais">mauvais</option>
                      <option value="tres_mauvais">tres_mauvais</option>
                      <option value="hors_serie">hors_serie</option>
                    </select>
                  </div>
                </div>
              </fieldset>
              {/* Collection */}

              <fieldset className="grid gap-4">
                <legend className="text-lg font-semibold">Collection</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <label htmlFor="image">Objectif</label>
                    <select
                      className="input-type-console"
                      {...register("objectif")}
                    >
                      <option value="non_defini">non_defini</option>
                      <option value="vendre">vendre</option>
                      <option value="garder">garder</option>
                      <option value="completer">completer</option>
                      <option value="remplacer">remplacer</option>
                      <option value="reparer">reparer</option>
                    </select>
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="image">Location</label>
                    <select
                      className="input-type-console"
                      {...register("idLocation", { valueAsNumber: true })}
                    >
                      {location.map((location) => (
                        <option value={location.id}>{location.name}</option>
                      ))}
                    </select>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-xl"
                      type="button"
                      onClick={() => setOpenLocation(true)}
                    >
                      Ajouter une location
                    </button>
                    <AddLocation
                      isOpen={openLocation}
                      onClose={() => setOpenLocation(false)}
                      onCreated={async (created) => {
                        setSeries((prev) => {
                          const exists = prev.some(
                            (platform) => platform.id === created.id
                          );
                          return exists
                            ? prev.map((plateform) =>
                                plateform === created.id ? created : plateform
                              )
                            : [...prev, created];
                        });

                        await loadLocation();
                      }}
                    ></AddLocation>
                  </div>
                </div>
              </fieldset>
              {/* Description */}
              <fieldset className="grid gap-2">
                <legend className="text-lg font-semibold">Description</legend>
                <textarea
                  className="min-h-[96px] rounded-lg border-2 border-black p-2"
                  placeholder="Notes, état détaillé, contenu additionnel..."
                  {...register("description")}
                ></textarea>
              </fieldset>
            </div>
          )}
          {currentStep === "vente" && (
            <div className="grid gap-6">
              <fieldset className="grid gap-4">
                <legend className="text-lg font-semibold">Info vente</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <label htmlFor="image">Prix achat (€)</label>
                    <input
                      type="number"
                      id="name"
                      placeholder="Prix achat (€)"
                      className="border-2 border-black rounded-lg p-2"
                      {...register("vente.prix_achat", { valueAsNumber: true })}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="image">Date achat</label>
                    <input
                      type="date"
                      id="name"
                      placeholder="Date achat"
                      className="border-2 border-black rounded-lg p-2"
                      {...register("vente.date_achat", {
                        setValueAs: (v) =>
                          v ? new Date(v).toISOString() : null,
                      })}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="image">Nom lieux d'achat</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Lieux d'achat"
                      className="border-2 border-black rounded-lg p-2"
                      {...register("vente.nameSalePlace")}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="image">Type Lieux d'achat</label>
                    <select
                      className="input-type-console"
                      {...register("vente.salePlace")}
                    >
                      <option value="non_defini">non_defini</option>
                      <option value="Magasin">Magasin</option>
                      <option value="Vide_Greniers">Vide Greniers</option>
                      <option value="Enchere">Enchere</option>
                      <option value="Don">Don</option>
                      <option value="Recyclerie">Recyclerie</option>
                    </select>
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="image">Prix estime (€)</label>
                    <input
                      type="number"
                      id="name"
                      placeholder="Prix estime (€)"
                      className="border-2 border-black rounded-lg p-2"
                      {...register("vente.prix_estime", {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                </div>
              </fieldset>
            </div>
          )}
          {/* Footer */}
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border px-4 py-2 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Annuler
              </button>
            </div>
            <div className="flex items-center gap-3">
              {stepIndex > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-xl border px-4 py-2 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Retour
                </button>
              )}

              <button
                type="button"
                onClick={
                  stepIndex < steps.length - 1 ? goNext : handleSubmit(onSubmit)
                }
                className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {stepIndex < steps.length - 1 ? "Suivant" : "Enregistrer"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGame;
