import axios from 'axios';

import {
  DocumentType,
  ListTypeAddDocument,
  NewReviewType,
  SignupPayload,
  ReviewTypePreview,
  SigninPayload,
  DocumentTypePreview,
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
  const res = await axios.get(`${base}/books/${document_id}`);
  const { data }: { data: DocumentType } = res;
  return data;
};

export const getReviewsByDocument = async (document_id: number) => {
  const res = await axios.get(`${base}/books/${document_id}/reviews`, config());
  const data: ReviewTypePreview[] = res.data || [];
  return data;
};

export const getDocuments = async () => {
  const res = await axios.get(`${base}/books?page=1&limit=10`, config());
  const { data }: { data: DocumentTypePreview[] } = res;
  return data;
};

export const addReview = (data: NewReviewType) => {
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
  const data: ListTypeAddDocument[] = res.data || [];
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
  const data: DocumentTypePreview[] = res.data || [];
  return data;
};

// export const addList = () => {
//   const res = axios.post(`${base}/lists`, {}, config());
//   return res;
// };
