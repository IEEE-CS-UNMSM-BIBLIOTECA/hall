import { rem } from '@mantine/core';

const base = 90;
const scale = 1.5;

export default {
  fontWeight: 100,
  sizes: {
    h1: {
      fontSize: rem(base / (scale ** 0)),
      lineHeight: 1,
    },
    h2: {
      fontSize: rem(base / (scale ** 1)),
      lineHeight: 1,
    },
    h3: {
      fontSize: rem(base / (scale ** 2)),
      lineHeight: 1,
    },
    h4: {
      fontSize: rem(base / (scale ** 3)),
      lineHeight: 1,
    },
    h5: {
      fontSize: rem(base / (scale ** 4)),
      lineHeight: 1,
    },
    h6: {
      fontSize: rem(base / (scale ** 5)),
      lineHeight: 1,
    },
  },
};
