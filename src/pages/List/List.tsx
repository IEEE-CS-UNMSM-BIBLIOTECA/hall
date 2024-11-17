import Masonry from 'react-masonry-css';
import { Flex, Title, Text, Menu } from '@mantine/core';
import { IconBook, IconDots } from '@tabler/icons-react';
import PageShell from '@/layout/PageShell';
import BookCard from '@/components/BookCard';
import './List.css';
import LikeButton from '@/components/LikeButton';
import { DocumentTypePreview, ListType } from '@/types';
import UserBadge from '@/components/UserBadge';

const breakpointColumnsObj = {
  default: 5,
  1536: 4,
  1280: 3,
  768: 2,
  480: 1,
};

const mockList: ListType = {
  id: 1,
  title: 'Libros con portada azul',
  description: 'Lista de libros con portada azul',
  total_likes: 100,
  total_books: 50,
  liked: false,
  user: {
    id: 1,
    username: 'Jesús Andrés Luján Carrión',
    profile_picture_url: 'https://imgmedia.libero.pe/652x358/libero/original/2022/10/03/633b65ed2883df3ae046fcdd.webp',
  },
};

const mockBooks: DocumentTypePreview[] = [
  {
    id: 1,
    title: 'Libro 1',
    cover_url: 'https://via.placeholder.com/200x310',
    authors: [
      {
        id: 1,
        name: 'Autor 1',
      },
    ],
  },
  {
    id: 2,
    title: 'Libro 2',
    cover_url: 'https://via.placeholder.com/200x310',
    authors: [
      {
        id: 2,
        name: 'Autor 2',
      },
    ],
  },
  {
    id: 3,
    title: 'Libro 3',
    cover_url: 'https://via.placeholder.com/200x310',
    authors: [
      {
        id: 3,
        name: 'Autor 3',
      },
    ],
  },
  {
    id: 4,
    title: 'Libro 4',
    cover_url: 'https://via.placeholder.com/200x310',
    authors: [
      {
        id: 4,
        name: 'Autor 4',
      },
    ],
  },
  {
    id: 5,
    title: 'Libro 5',
    cover_url: 'https://via.placeholder.com/200x310',
    authors: [
      {
        id: 5,
        name: 'Autor 5',
      },
    ],
  },
];

const Books = ({ listId }: { listId: string }) => {
  const booksQuery = { data: mockBooks };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {booksQuery.data.map((book) => (
        <BookCard
          key={book.id}
          data={book}
          options={[
            { label: 'Quitar de lista', onClick: () => console.log('Remover') },
          ]}
        />
      ))}
    </Masonry>
  );
};

const List = ({ id }: { id: string }) => {
  const listQuery = { data: mockList };

  return (
    <PageShell>
      <div className="scrollable-page">
        <div className="page-header" />
        <Flex align="center" justify="space-between">
          <Title order={2} fw={350} style={{ marginBottom: 'var(--mantine-spacing-md)' }}>
            Libros con portada azul
          </Title>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <IconDots size={30} style={{ cursor: 'pointer' }} />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>
                <Text>Hacer Privada</Text>
              </Menu.Item>
              <Menu.Item>
                <Text>Eliminar</Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
        <div
          style={{
            display: 'flex',
            gap: 'var(--mantine-spacing-md)',
            alignItems: 'center',
            marginBottom: 'var(--mantine-spacing-md)',
          }}
        >
          <Flex
            align="center"
            justify="center"
            direction={{ base: 'column', sm: 'row' }}
            gap="xs"
          >
            <UserBadge
              id={listQuery.data.user.id}
              name={listQuery.data.user.username}
            />
            <div className="group gap-md" style={{ marginLeft: 'var(--mantine-spacing-lg)' }}>
              <LikeButton
                totalLikes={listQuery.data.total_likes}
                liked={false}
                addLike={() => {}}
                removeLike={() => {}}
              />
              <div className="group gap-xxs ai-center">
                <IconBook className="icon-button" size={20} />
                <span className="fz-sm">
                  {listQuery.data.total_books}
                </span>
              </div>
            </div>
          </Flex>
        </div>
        <Books listId={id} />
      </div>
    </PageShell>
  );
};

export default List;
