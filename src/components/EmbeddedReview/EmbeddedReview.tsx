import { Spoiler, Title } from '@mantine/core';
import { ReviewType } from '../../types';
import LikeButton from '../LikeButton';
import UserBadge from '../UserBadge';

const EmbeddedReview = ({ data }: {
  data: ReviewType;
}) => {
  return (
    <article className="stack gap-md">
      <header>
        <Title order={4}>
          <a href={`/review/${data.id}`} className="no-underline">
            {data.title}
          </a>
        </Title>
      </header>
      <p style={{ margin: 0 }}>
        <Spoiler
          hideLabel="Leer menos"
          showLabel="Leer más"
          maxHeight={115}
        >
          {data.content}
        </Spoiler>
      </p>
      <footer className="group jc-space-between ai-center">
        <UserBadge name={data.user.name} id={data.user.id} />
        <LikeButton
          totalLikes={data.total_likes}
          liked={data.liked}
          addLike={() => {}}
          removeLike={() => {}}
        />
      </footer>
    </article>
  );
};

export default EmbeddedReview;
