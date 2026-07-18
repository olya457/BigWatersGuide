export type RiverLocation = {
  id: string;
  category: 'spots' | 'nature' | 'hidden';

  title: string;

  image: any;

  latitude: number;
  longitude: number;

  rating: number;

  distance: string;

  difficulty: string;

  bestTime: string;

  description: string;
};