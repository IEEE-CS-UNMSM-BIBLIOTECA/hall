import { Box, Button, Group, Stack, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import PageShell from '@/layout/PageShell';
import BookSlider from '@/components/BookSlider';
import './Landing.css';

const WORDS = ['CUANDO', 'COMO', 'DONDE', 'LO QUE'];

const Landing = () => {
  const [word, setWord] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWord((cur_word) => (cur_word + 1) % WORDS.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <PageShell>
        <Group w="100%" grow preventGrowOverflow={false} gap="var(--mantine-spacing-xxl)">
          <Stack flex={1} gap="var(--mantine-spacing-xl)">
            <Title>
              LEE
              <br />
              <i>{WORDS[word]}</i>
              <br />
              QUIERAS.
            </Title>
            <Text>
              Descubre libros, recógelos cuando quieras.
              <br />
              Sin costo.
            </Text>
            <Button variant="primary" size="lg">
              EMPIEZA HOY
            </Button>
          </Stack>
          <Box
            flex={4}
            h="95vh"
            style={{
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            className="hide-scrollbar"
          >
            <BookSlider />
          </Box>
        </Group>
      </PageShell>
    </>
  );
};

export default Landing;
