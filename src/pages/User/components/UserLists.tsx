import ListPreview from '@/components/ListPreview';
import { ListTypePreview } from '@/types';

const mockLists: ListTypePreview[] = [
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
  },
];

const UserLists = ({ userId }: {
  userId: string
}) => {
  const listsQuery = { data: mockLists };

  return (
    <div className="stack gap-xl">
    {
      listsQuery.data.map((listData) => (
        <ListPreview data={listData} />
      ))
    }
    </div>
  );
};

export default UserLists;
