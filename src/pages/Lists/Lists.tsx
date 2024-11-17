import ListPreview from '@/components/ListPreview';
import PageShell from '@/layout/PageShell';
import { ListTypePreview } from '@/types';

const mockLists: ListTypePreview[] = [
  {
    id: 1,
    title: 'Best Books of 2021',
    total_likes: 10,
    total_books: 10,
    preview_images: [
      'https://placehold.co/200x300',
      'https://placehold.co/200x330',
      'https://placehold.co/230x350',
      'https://placehold.co/200x300',
      'https://placehold.co/200x330',
    ],
    private: false,
    liked: false,
    own: true,
  },
  {
    id: 2,
    title: 'Best Books of 2020',
    total_likes: 10,
    total_books: 10,
    preview_images: [
      'https://placehold.co/200x300',
      'https://placehold.co/200x330',
      'https://placehold.co/230x350',
      'https://placehold.co/200x330',
    ],
    private: false,
    liked: true,
    own: false,
  },
  {
    id: 3,
    title: 'Best Books of 2019',
    total_likes: 10,
    total_books: 10,
    preview_images: [
      'https://placehold.co/200x300',
      'https://placehold.co/200x330',
      'https://placehold.co/230x350',
      'https://placehold.co/200x300',
      'https://placehold.co/200x330',
    ],
    private: false,
    liked: false,
    own: false,
  },
];

const Lists = () => {
  const listsQuery = { data: mockLists };

  return (
    <PageShell>
      <div className="scrollable-page">
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
      </div>
    </PageShell>
  );
};

export default Lists;
