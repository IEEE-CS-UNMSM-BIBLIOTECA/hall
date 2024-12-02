import Masonry from 'react-masonry-css';
import { Flex, Title, Text, Menu } from '@mantine/core';
import { IconBook, IconDots } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PageShell from '@/layout/PageShell';
import BookCard from '@/components/BookCard';
import './List.css';
import LikeButton from '@/components/LikeButton';
import UserBadge from '@/components/UserBadge';
import { addLikeToList, getBooksOfList, getList, removeLikeFromList } from '@/services/api';
import Error from '@/components/Error';
import Loading from '@/components/Loading';
import Empty from '@/components/Empty';
import { breakpointCols } from '@/constants';

const Books = ({ listId }: { listId: string }) => {
  const booksQuery = useQuery({
    queryKey: ['list', listId, 'books'],
    queryFn: () => getBooksOfList(parseInt(listId, 10)),
  });

  if (booksQuery.isLoading || booksQuery.isFetching) { return <Loading />; }
  if (booksQuery.isError || !booksQuery.data) { return <Error />; }
  if (!booksQuery.data.length) { return <Empty />; }

  return (
    <Masonry
      breakpointCols={breakpointCols}
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

const Content = ({ listId }: { listId: string }) => {
  const listQuery = useQuery({
    queryKey: ['list', listId],
    queryFn: () => getList(parseInt(listId, 10)),
  });

  const queryClient = useQueryClient();

  const addLikeMutation = useMutation({
    mutationFn: () => addLikeToList(Number(listId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      queryClient.invalidateQueries({ queryKey: ['list', listId] });
    },
  });

  const removeLikeMutation = useMutation({
    mutationFn: () => removeLikeFromList(Number(listId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      queryClient.invalidateQueries({ queryKey: ['list', listId] });
    },
  });

  if (listQuery.isLoading || listQuery.isFetching) { return <Loading />; }
  if (listQuery.isError || !listQuery.data) { return <Error />; }

  console.log('listQuery.data', listQuery.data);

  return (
    <div className="scrollable-page">
      <div className="page-header" />
      <Flex align="center" justify="space-between">
        <Title order={2} fw={350} style={{ marginBottom: 'var(--mantine-spacing-md)' }}>
          {listQuery.data.title}
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
              liked={listQuery.data.liked}
              addLike={() => addLikeMutation.mutate()}
              removeLike={() => removeLikeMutation.mutate()}
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
      <Books listId={listId} />
    </div>
  );
};

const ListPage = ({ id }: { id: string }) => {
  return (
    <PageShell>
      <Content listId={id} />
    </PageShell>
  );
};

export default ListPage;
