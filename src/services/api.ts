import axios from 'axios';

import {
  Document,
  ListAddDocument,
  CreateReviewPayload,
  SignupPayload,
  ReviewPreview,
  SigninPayload,
  DocumentPreview,
  Order,
  ListPreview,
  List,
  UserPublic,
  Review,
} from '@/types';

const base = 'http://143.198.142.139:8080';

const config = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return {};
  }
  return {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  };
};

export const signIn = (data: SigninPayload) => {
  const res = axios.post(`${base}/login`, data, {});
  return res;
};

export const signUp = (data: SignupPayload) => {
  const res = axios.post(`${base}/register`, data, {});
  return res;
};

export const getDocument = async (document_id: string) => {
  const res = await axios.get(`${base}/books/${document_id}`, config());
  const { data }: { data: Document } = res;
  return data;
};

export const getReviewsByDocument = async (document_id: number) => {
  const res = await axios.get(`${base}/books/${document_id}/reviews`, config());
  const data: ReviewPreview[] = res.data || [];
  return data;
};

export const getDocuments = async () => {
  const res = await axios.get(`${base}/books?page=1&limit=100`, config());
  const { data }: { data: DocumentPreview[] } = res;
  return data;
};

export const getDocumentsPublic = async () => {
  const res = await axios.get(`${base}/books?page=1&limit=100`);
  const { data }: { data: DocumentPreview[] } = res;
  return data;
};

export const addReview = (data: CreateReviewPayload) => {
  const res = axios.post(`${base}/books/reviews`, data, config());
  // TODO: new path
  // const res = axios.post(`${base}/reviews`, data, config());
  return res;
};

export const addOrder = (document_id: number) => {
  const res = axios.post(`${base}/orders`, { document_id }, config());
  return res;
};

export const getListsOfUser = async (document_id: number) => {
  const res = await axios.get(`${base}/books/${document_id}/lists/`, config());
  // TODO: new path
  // const res = await axios.get(`${base}/lists?check=${document_id}&minimal=true`, config());
  const data: ListAddDocument[] = res.data || [];
  return data;
};

export const addDocumentToList = (document_id: number, list_id: number) => {
  const res = axios.post(`${base}/lists/${list_id}/books`, { document_id, list_id }, config());
  return res;
};

export const renameList = (list_id: number, title: string) => {
  const res = axios.put(`${base}/lists/${list_id}/books`, { title }, config());
  return res;
};

export const deleteDocumentFromList = (document_id: number, list_id: number) => {
  const res = axios.delete(`${base}/lists/${list_id}/books/${document_id}`, config());
  return res;
};

export const createList = () => {
  const res = axios.post(`${base}/lists`, {}, config());
  return res;
};

export const searchDocument = async (query: string) => {
  const res = await axios.get(`${base}/search/${query}`);
  const data: DocumentPreview[] = res.data || [];
  return data;
};

export const getLends = async () => {
  const res = await axios.get(`${base}/lends`, config());
  const data: Order[] = res.data || [];
  return data;
};

export const getLists = async () => {
  const res = await axios.get(`${base}/lists`, config());
  const data: ListPreview[] = res.data || [];
  return data;
};

export const getList = async (list_id: number) => {
  const res = await axios.get(`${base}/list/${list_id}`, config());
  const data: List = res.data || [];
  return data;
};

export const getBooksOfList = async (list_id: number) => {
  const res = await axios.get(`${base}/lists/${list_id}/books`, config());
  const data: DocumentPreview[] = res.data || [];
  return data;
};

export const getReviews = async () => {
  const res = await axios.get(`${base}/reviews`, config());
  const data: ReviewPreview[] = res.data || [];
  return data;
};

export const getUserReviews = async (user_id: number) => {
  const res = await axios.get(`${base}/user/${user_id}/reviews`, config());
  const data: ReviewPreview[] = res.data || [];
  return data;
};

export const getUserLists = async (user_id: number) => {
  const res = await axios.get(`${base}/user/${user_id}/lists`, config());
  const data: ListPreview[] = res.data || [];
  return data;
};

export const getUser = async (user_id: number) => {
  const res = await axios.get(`${base}/user/${user_id}/screen`, config());
  const data: UserPublic = res.data || {};
  return data;
};

export const getIdOfCurrentUser = async () => {
  const res = await axios.get(`${base}/protected`, config());
  return res.data.user_id;
};

export const getReview = async (review_id: number) => {
  const res = await axios.get(`${base}/reviews/${review_id}`, config());
  const data: Review = res.data || {};
  return data;
};

export const addLikeToReview = (review_id: number) => {
  const res = axios.post(`${base}/reviews/${review_id}/like`, {}, config());
  return res;
};

export const removeLikeFromReview = (review_id: number) => {
  const res = axios.delete(`${base}/reviews/${review_id}/like`, config());
  return res;
};

export const addLikeToList = (list_id: number) => {
  const res = axios.post(`${base}/lists/${list_id}/like`, {}, config());
  return res;
};

export const removeLikeFromList = (list_id: number) => {
  const res = axios.delete(`${base}/lists/${list_id}/like`, config());
  return res;
};
