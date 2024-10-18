import { Card, Image as MantineImage, Text, Box } from '@mantine/core';
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
    <Card shadow="md" padding="lg" radius="md" style={{ height: 'fit-content', width: '100%' }}>
      <Card.Section>
        <div style={{ position: 'relative', paddingTop: `${100 / aspectRatio}%`, width: '100%' }}>
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
      </Card.Section>

      <Box mt="md">
        <Text size="lg" fw={500}>
          {title}
        </Text>
        <Text color="dimmed" size="sm" mt="xs">
          {author}
        </Text>
      </Box>
    </Card>
  );
};

export default BookCard;
