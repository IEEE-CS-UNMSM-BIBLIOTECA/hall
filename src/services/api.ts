import axios from 'axios';
import { DocumentType, ListTypeAddDocument, NewReviewType, ReviewTypePreview } from '@/types';

const base = 'http://143.198.142.139:8080';

let token: string | null = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE3MzE2MjQ5ODQsInVzZXJuYW1lIjoiU3RldmFucXVpdG8ifQ.9hCzlPFy1DTZe13X8IqESuSE2FI0rO7tm3MNIrT9gj8';

const headers = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const setToken = (newToken: string) => { token = newToken; };

export const getDocument = async (document_id: string) => {
  const res = await axios.get(`${base}/books/${document_id}`);
  const { data }: { data: DocumentType } = res;
  return data;
};

export const getReviewsByDocument = async (document_id: number) => {
  const res = await axios.get(`${base}/books/${document_id}/reviews`, headers);
  const { data }: { data: ReviewTypePreview [] } = res;
  return data;
};

export const getDocuments = async () => {
  const res = await axios.get(`${base}/books?page=1&limit=10`, headers);
  const { data }: { data: DocumentType[] } = res;
  return data;
};

export const addReview = (data: NewReviewType) => {
  const res = axios.post(`${base}/reviews`, data, headers);
  return res;
};

export const addOrder = (document_id: number) => {
  const res = axios.post(`${base}/orders`, { document_id }, headers);
  return res;
};

export const getListsOfUser = async (document_id: number) => {
  const res = await axios.get(`${base}/lists?check=${document_id}&minimal=true`, headers);
  const { data }: { data: ListTypeAddDocument[] } = res;
  return data;
};

export const addDocumentToList = (document_id: number, list_id: number) => {
  const res = axios.post(`${base}/lists/${list_id}/books`, { document_id, list_id }, headers);
  return res;
};

export const renameList = (list_id: number, title: string) => {
  const res = axios.patch(`${base}/lists/${list_id}`, { title }, headers);
  return res;
};

export const deleteDocumentFromList = (document_id: number, list_id: number) => {
  const res = axios.delete(`${base}/lists/${list_id}/books/${document_id}`, headers);
  return res;
};

// export const addList = () => {
//   const res = axios.post(`${base}/lists`, {}, headers);
//   return res;
// };
