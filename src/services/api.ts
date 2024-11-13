import axios from 'axios';
import { DocumentType, ListTypeAddDocument, ReviewTypePreview } from '@/types';

const base = 'http://143.198.142.139:8080';

let token: string | null = null;

export const setToken = (newToken: string) => { token = newToken; };

/* create */

export const addDocumentToList = (document_id: number, list_id: number) => {
  const res = axios.post(`${base}/lists/${list_id}/books`, { document_id });
  return res;
};

export const createList = () => {
  const res = axios.post(`${base}/lists`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

/* update */

export const renameList = (list_id: number, title: string) => {
  const res = axios.patch(`${base}/lists/${list_id}`, { title });
  return res;
};

/* read */

export const getDocuments = async () => {
  const res = await axios.get(`${base}/books`);
  const { data }: { data: DocumentType[] } = res;
  return data;
};

export const getDocument = async (document_id: string) => {
  const res = await axios.get(`${base}/book/${document_id}`);
  const { data }: { data: DocumentType } = res;
  return data;
};

export const getReviewsByDocument = async (document_id: number) => {
  const res = await axios.get(`${base}/book/${document_id}/reviews`);
  const { data }: { data: ReviewTypePreview [] } = res;
  return data;
};

export const getListsOfUser = async () => {
  const res = await axios.get(`${base}/lists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data }: { data: ListTypeAddDocument[] } = res;
  return data;
};

/* delete */

export const removeDocumentFromList = (document_id: number, list_id: number) => {
  const res = axios.delete(`${base}/lists/${list_id}/books/${document_id}`);
  return res;
};
