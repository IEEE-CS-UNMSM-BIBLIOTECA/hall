import { Title } from '@mantine/core';
import { ListType } from '@/types';
import LikeButton from '../LikeButton';

const ListPreview = ({ data }: {
  data: ListType
}) => {
  return (
    <div className="stack gap-lg">
      <div className="list-preview">
      {
        data.preview_images.map((url, i) => (
          <img
            key={url}
            src={url}
            alt=""
            style={{
              top: `-${i * 5}px`,
              left: `-${i * 30}px`,
              opacity: 1 - (i * 0.2),
              zIndex: data.preview_images.length - i,
            }}
          />
        ))
      }
      </div>
      <div className="stack gap-sm">
        <Title order={2}>
          <a href={`/list/${data.id}`} className="no-underline">
            {data.title}
          </a>
        </Title>
        <p>{data.description}</p>
        <footer className="group jc-space-between ai-center">
          <LikeButton
            totalLikes={data.total_likes}
            liked={data.liked}
            addLike={() => {}}
            removeLike={() => {}}
          />
        </footer>
      </div>
    </div>
  );
};

export default ListPreview;
