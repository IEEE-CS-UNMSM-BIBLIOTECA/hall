export interface EmbeddedReviewType {
  id: number;
  title: string;
  content: string;
  rating: number;
  total_likes: number;
  liked: boolean;
  author: {
    id: number;
    name: string;
    profile_picture_url: string;
  }
}

export interface ReviewType extends EmbeddedReviewType {
  book: {
    id: number;
    title: string;
    author: {
      id: number;
      name: string;
    }
    cover_url: string;
  }
}