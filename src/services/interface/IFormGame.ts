// IFormGame.ts
import type {
  Audience_Rating,
  Signal,
  Region,
  Language,
  Format,
  Etat,
  Objectif,
  launch_status,
} from "../enum/enum";

export interface IFormGame {
  // Infos
  title: string;
  idSeries: number;
  sortTitle: string;

  // Info boîte
  plateformeId: number;
  serial_number: string;
  barcode: string;
  format: Format;

  // Info version
  idEdition: number;
  region: Region;
  signal: Signal;
  audience: Audience_Rating;
  language: Language;
  excusivity: boolean;

  // Info contenu
  jeux: boolean;
  boite: boolean;
  manuel: boolean;
  etatJeu: Etat;
  launch: launch_status;
  etatbox: Etat;
  etatManuel: Etat;

  // Objectif de la version
  objectif: Objectif;
  idLocation: number;

  // Description
  description: string;

  // Liens externes
  userId: number;
  annonceId?: number | null;
}
