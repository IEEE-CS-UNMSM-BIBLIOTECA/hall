import { Avatar } from '@mantine/core';

const UserBadge = ({ name, id }: {
  name: string;
  id: number;
}) => {
  return (
    <div className="group gap-xs ai-center">
      <Avatar size="sm" />
      <a href={`/user/${id}`} className="fz-sm">
        {name}
      </a>
    </div>
  );
};

export default UserBadge;
