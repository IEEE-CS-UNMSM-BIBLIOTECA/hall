import { Image as MantineImage, Text, Box, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';

interface BookCardProps {
  image: string;
  title: string;
  author: string;
}

const BookCard = ({ image, title, author }: BookCardProps) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setAspectRatio(img.width / img.height);
    };
    img.src = image;
  }, [image]);

  return (
    <Stack
      bg="transparent"
      style={{
        height: 'fit-content',
        width: '100%',
      }}
      gap="xs"
    >
      <div
        style={{
          position: 'relative',
          paddingTop: `${100 / aspectRatio}%`,
          width: '100%',
        }}
      >
        <MantineImage
          src={image}
          alt={title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <Box>
        <Text size="lg" fw={500}>
          {title}
        </Text>
        <Text size="sm">{author}</Text>
      </Box>
    </Stack>
  );
};

export default BookCard;
