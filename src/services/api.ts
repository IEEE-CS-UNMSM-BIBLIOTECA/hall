export const getBooks = async () => {
  const res = await fetch('http://localhost:3000/books');
  if (!res.ok) {
    throw new Error('Error fetching books');
  }
  const data = await res.json();
  return data;
};

export const getBook = async (id: string) => {
  const res = await fetch(`http://localhost:3000/books?id=${id}`);
  if (!res.ok) {
    throw new Error('Error fetching book');
  }
  const data = await res.json();
  return data[0];
};
