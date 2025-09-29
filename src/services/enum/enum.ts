// Enums.ts
export type Audience_Rating =
  | "All"
  | "Pegi_3"
  | "Pegi_7"
  | "Pegi_12"
  | "Pegi_16"
  | "Pegi_18";

export type Signal = "PAL" | "NTSC" | "NTSC_Japan";

export type Region = "EUR" | "US" | "JAP" | "Multiple";

export type Language =
  | "English"
  | "French"
  | "German"
  | "Italian"
  | "Spanish"
  | "Japanese"
  | "Chinese"
  | "Korean";

export type Format =
  | "Cartouche"
  | "Cassette"
  | "Disquette"
  | "CD"
  | "DVD"
  | "BluRay";

export type Etat =
  | "non_defini"
  | "neuf"
  | "tres_bon"
  | "bon"
  | "moyen"
  | "mauvais"
  | "tres_mauvais"
  | "hors_serie";

export type Objectif =
  | "non_defini"
  | "vendre"
  | "garder"
  | "completer"
  | "remplacer"
  | "reparer";

export type launch_status = "WORKING" | "PARTIAL" | "NOT_WORKING";

export type Marke = "Nintendo" | "Sega" | "Sony" | "Microsoft";
