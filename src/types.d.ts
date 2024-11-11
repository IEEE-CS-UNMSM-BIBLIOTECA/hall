export interface DocumentType {
  id: number;
  title: string;
  isbn: string;
  description: string;
  cover_url: string;
  publication_date: string;
  acquisition_date: string;
  edition: string;
  total_pages: number;
  external_lend_allowed: boolean;
  base_price: number;
  total_copies: number;
  available_copies: number;
  mean_rating: number;
  language: {
    id: number;
    name: string;
  }
  format: {
    id: number;
    name: string;
  }
  publisher: {
    id: number;
    name: string;
  }
  authors: {
    id: number;
    name: string;
  }[]
}

export interface TagType {
  id: number;
  name: string;
}

export interface ReviewType {
  id: number;
  title: string;
  content: string;
  rating: number;
  total_likes: number;
  liked: boolean;
  user: {
    id: number;
    name: string;
    profile_picture_url: string;
  }
}

export interface ReviewTypeFull extends ReviewType {
  book: {
    id: number;
    title: string;
    authors: {
      id: number;
      name: string;
    }[]
    cover_url: string;
  }
}

export interface UserType {
  id: number;
  username: string;
  bio: string;
  profile_picture_url: string;
}

export interface UserTypeFull extends UserType {
  email: string;
  name: string;
  birth_date: string;
  address: string;
  mobile_phone: string;
  gender: {
    id: number;
    name: string;
  }
}

export interface ListType {
  id: number;
  title: string;
  description: string;
  total_likes: number;
  total_books: number;
  liked: boolean;
  preview_images: string[];
}

export interface ListTypeFull extends ListType {
  private: boolean;
  user: {
    id: number;
    username: string;
    profile_picture_url: string;
  }
}

export interface AuthorTypeFull {
  id: number;
  name: string;
  birth_date: string;
  death_date?: string;
  bio: string;
  image_url: string;
}
