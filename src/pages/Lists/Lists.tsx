import ListPreview from '@/components/ListPreview';
import PageShell from '@/layout/PageShell';
import { ListType } from '@/types';

const mockLists: ListType[] = [
  {
    id: 1,
    title: 'Best Books of 2021',
    description: 'A list of the best books of 2021',
    total_likes: 10,
    total_books: 10,
    liked: false,
    preview_images: [
      'https://placehold.co/200x300',
      'https://placehold.co/200x330',
      'https://placehold.co/230x350',
      'https://placehold.co/200x300',
      'https://placehold.co/200x330',
    ],
    private: false,
    user: {
      id: 1,
      username: 'John Doe',
      profile_picture_url: 'https://placehold.co/50x50',
    },
  },
  {
    id: 2,
    title: 'Best Books of 2020',
    description: 'A list of the best books of 2020',
    total_likes: 10,
    total_books: 10,
    liked: true,
    preview_images: [
      'https://placehold.co/200x300',
      'https://placehold.co/200x330',
      'https://placehold.co/230x350',
      'https://placehold.co/200x330',
    ],
    private: false,
    user: {
      id: 1,
      username: 'John Doe',
      profile_picture_url: 'https://placehold.co/50x50',
    },
  },
  {
    id: 3,
    title: 'Best Books of 2019',
    description: 'A list of the best books of 2019',
    total_likes: 10,
    total_books: 10,
    liked: false,
    preview_images: [
      'https://placehold.co/200x300',
      'https://placehold.co/200x330',
      'https://placehold.co/230x350',
      'https://placehold.co/200x300',
      'https://placehold.co/200x330',
    ],
    private: false,
    user: {
      id: 1,
      username: 'John Doe',
      profile_picture_url: 'https://placehold.co/50x50',
    },
  },
];

const Lists = () => {
  const listsQuery = { data: mockLists };

  return (
    <PageShell>
      <div className="page-header">
        LISTAS
      </div>
      <div
        className="stack gap-xl py-xxl"
        style={{
          maxWidth: 920,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
      {
        listsQuery.data.map((listData) => (
          <ListPreview data={listData} big />
        ))
      }
      </div>
    </PageShell>
  );
};

export default Lists;
