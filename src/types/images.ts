export type PexelsImage = {
  alt: string,
  avg_color: string,
  height: number,
  id: number,
  liked: boolean,
  photographer: string,
  photographer_id: number,
  photographer_url: string,
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  },
  url: string;
  width: number;
}