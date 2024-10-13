import { Box, Button, Group, Stack, Title } from '@mantine/core';
import PageShell from '@/layout/PageShell';

const Landing = () => (
  <>
    <PageShell>
      <Group w="100%" grow preventGrowOverflow={false} gap="var(--mantine-spacing-xxl)">
        <Stack flex={1} gap="var(--mantine-spacing-xxl)">
          <Title>
            LEE CUANDO QUIERAS
          </Title>
          <Button
            variant="primary"
            size="xl"
          >
            EMPIEZA HOY
          </Button>
        </Stack>
        <Box flex={4} h="100%" bg="blue">

        </Box>
      </Group>
    </PageShell>
  </>
);

export default Landing;
