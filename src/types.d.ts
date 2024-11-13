/* document */

export interface DocumentTypePreview {
  id:        number;
  title:     string;
  authors:   AuthorTypePreview[];
  cover_url: string;
}

export interface DocumentType extends DocumentTypePreview {
  isbn:                  string;
  description:           string;
  publication_year:      number | null;
  acquisition_date:      string;
  edition:               string;
  external_lend_allowed: boolean;
  total_pages:           number;
  base_price:            number;
  total_copies:          number;
  available_copies:      number;
  mean_rating:           number | null;
  language:              LanguageType;
  format:                DocumentFormat;
  publisher:             PublisherType;
  tags:                  TagTypePreview[];
}

/* review */

export interface ReviewTypePreview {
  id:          number;
  title:       string;
  content:     string;
  rating:      number;
  total_likes: number;
  liked:       boolean;
  spoiler:     boolean;
  user:        UserTypePublicPreview;
}

export interface ReviewType extends ReviewTypePreview {
  document: {
    id:        number;
    title:     string;
    authors:   AuthorTypePreview[];
    cover_url: string;
  }
}

export interface NewReviewType {
  title:       string;
  content:     string;
  rating:      number;
  spoiler:     boolean;
  user_id:     number;
  // document_id: number;
}

/* user */

export interface UserTypePublicPreview {
  id:                  number;
  user_name:            string;
  profile_picture_url: string;
}

export interface UserTypePublic extends UserTypePublicPreview {
  bio: string;
}

export interface UserType extends UserTypePublic {
  email:        string;
  name:         string;
  birth_date:   string;
  address:      string;
  mobile_phone: string;
  gender:       GenderType;
}

/* list */

export interface ListTypePreview {
  id:             number;
  title:          string;
  description:    string;
  total_likes:    number;
  total_books:    number;
  liked:          boolean;
  preview_images: string[];
}

export interface ListType extends ListTypePreview {
  private: boolean;
  user:    UserTypePublicPreview;
}

export interface ListTypeAddDocument {
  id:    number;
  title: string;
  has_document: boolean;
}

/* author */

export interface AuthorTypePreview extends BaseEntity {}

export interface AuthorType extends AuthorTypePreview {
  image_url:  string;
  bio:        string;
  birth_date: string;
  death_date: string | null;
}

/* tag */

export interface TagTypePreview extends BaseEntity {}

export interface TagType extends TagType {
  mean_rating: number;
}

/* order */

export interface OrderType {
  id:                 number;
  document:           DocumentTypePreview;
  order_date:         string;
  max_return_date:    string;
  actual_return_date: string | null;
}

/* other */

export interface DocumentFormat extends BaseEntity {}

export interface PublisherType extends BaseEntity {}

export interface GenderType extends BaseEntity {}

export interface LanguageType extends BaseEntity {}

export interface CountryType extends BaseEntity {}

interface BaseEntity {
  id:   number;
  name: string;
}