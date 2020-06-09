export interface Game {
  id?: number;
  gameName: string ;
  gameDescription: string;
  gameTrailer?: string;
  gamePublisher?: string;
  gameReleaseDate?: string;
  gameImage?: string;
  platform?: {
    platform1?: string;
    platform2?: string;
    platform3?: string;
    platform4?: string;
    platform5?: string;
    platform6?: string;
  };
  onSteam?: number;
  AgeRating?: number;
  steamId?: string;
}
