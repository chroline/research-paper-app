export default interface Paper {
  id: number;
  title: string;
  authors: string[];
  year: number;
  categories: string[];
  readingStatus: string;
  favorite: boolean;
}
