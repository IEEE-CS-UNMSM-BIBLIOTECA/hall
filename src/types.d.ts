/* document */

interface DocumentNonKeyFields {
  title:                 string;
  cover_url:             string;
  isbn:                  string;
  description:           string;
  publication_year:      number;
  acquisition_date:      string;
  edition:               number;
  external_lend_allowed: boolean;
  total_pages:           number;
  base_price:            number;
  total_copies:          number;
  available_copies:      number;
  mean_rating:           number | null;
}

export interface Document extends DocumentNonKeyFields {
  id:        number;
  language:  Language;
  format:    DocumentFormat;
  publisher: Publisher;
  tags:      BasicTag[];
  authors:   BasicAuthor[];
}

export interface DocumentPreview {
  id:        number;
  title:     string;
  authors:   BasicAuthor[];
  cover_url: string;
}

/* review */

interface ReviewNonKeyFields {
  title:       string;
  content:     string;
  rating:      number;
  spoiler:     boolean;
  liked:       boolean;
  own:         boolean;
  total_likes: number;
}

export interface Review extends ReviewNonKeyFields {
  id:       number;
  document: DocumentPreview;
  user:     UserPublicPreview;
}

export interface CreateReviewPayload extends ReviewNonKeyFields {
  document_id: number;
}

export interface ReviewPreview extends ReviewNonKeyFields {
  id:       number;
  document: DocumentPreview;
  user:     UserPublicPreview;
}

/* user */

interface UserNonKeyFields {
  username:     string;
  email:        string;
  name:         string;
  birth_date:   string;
  bio:          string | null;
  address:      string;
  mobile_phone: string;
}

export interface User extends UserNonKeyFields {
  id:     number;
  gender: Gender;
}

export interface UserPublicPreview {
  id:       number;
  username: string;
}

export interface UserPublic extends UserPublicPreview {
  bio: string;
}

export interface SignupPayload extends UserNonKeyFields {
  password:     string;
  bio?:         string;
  gender_id:    number;
}

export interface SigninPayload {
  username: string;
  password: string;
}

/* list */

interface ListNonKeyFields {
  title:          string;
  total_likes:    number;
  total_books:    number;
  preview_images: string[];
  private?:       boolean;
  liked:          boolean;
  own:            boolean;
}

export interface ListPreview extends ListNonKeyFields {
  id: number;
}

export interface List extends Omit<ListNonKeyFields, "preview_images"> {
  id:   number;
  user: UserPublicPreview;
}

export interface ListAddDocument {
  id:    number;
  title: string;
  has_document: boolean;
}

/* author */

export interface BasicAuthor extends BaseEntity {}

export interface Author extends BasicAuthor {
  image_url:  string;
  bio:        string;
  birth_date: string;
  death_date: string | null;
}

/* tag */

export interface BasicTag extends BaseEntity {}

export interface Tag extends BasicTag {
  mean_rating: number;
}

/* order */

export interface Order {
  id:                 number;
  document:           DocumentPreview;
  order_date:         string;
  max_return_date:    string;
  actual_return_date: string | null;
}

/* other */

export interface Option {
  label:   string;
  onClick: () => void;
}

export interface DocumentFormat extends BaseEntity {}

export interface Publisher extends BaseEntity {}

export interface Gender extends BaseEntity {}

export interface Language extends BaseEntity {}

export interface Country extends BaseEntity {}

interface BaseEntity {
  id:   number;
  name: string;
}
