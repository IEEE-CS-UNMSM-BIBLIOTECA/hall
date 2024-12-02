import { Menu, Title } from '@mantine/core';
import { IconBook, IconDots } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ListPreview, Option } from '@/types';
import LikeButton from '../LikeButton';
import { addLikeToList } from '@/services/api';

const ListPreviewComponent = ({ data, big }: {
  data: ListPreview,
  big?: boolean,
}) => {
  const options: Option[] | undefined = data.own ? [
    // { label }
  ] : undefined;

  const queryClient = useQueryClient();

  const addLikeMutation = useMutation({
    mutationFn: () => addLikeToList(Number(data.id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      queryClient.invalidateQueries({ queryKey: ['list', data.id] });
    },
  });

  const removeLikeMutation = useMutation({
    mutationFn: () => addLikeToList(Number(data.id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      queryClient.invalidateQueries({ queryKey: ['list', data.id] });
    },
  });

  return (
    <div className="stack gap-lg">
      <div className={`list-preview ${big && 'big'}`}>
      {
        data.preview_images && data.preview_images.map((url, i) => (
          <img
            key={url}
            src={url}
            alt=""
            style={{
              top: `-${i * 7}px`,
              left: `-${i * 50}px`,
              // opacity: 1 - (i * 0.2),
              zIndex: data.preview_images.length - i,
            }}
          />
        ))
      }
      </div>
      <div className="stack gap-sm">
        <Title order={3}>
          <a href={`/list/${data.id}`} className="no-underline">
            {data.title}
          </a>
        </Title>
        <footer className="group gap-md">
          <LikeButton
            totalLikes={data.total_likes}
            liked={data.liked}
            addLike={() => addLikeMutation.mutate()}
            removeLike={() => removeLikeMutation.mutate()}
          />
          <div className="group gap-xxs ai-center">
            <IconBook
              className="icon-button"
              size={20}
            />
            <span className="fz-sm">
              {data.total_books}
            </span>
          </div>
          <Menu>
            <Menu.Target>
              <IconDots
                className="icon-button"
                size={20}
              />
            </Menu.Target>
            <Menu.Dropdown>
            </Menu.Dropdown>
          </Menu>
        </footer>
      </div>
    </div>
  );
};

export default ListPreviewComponent;
