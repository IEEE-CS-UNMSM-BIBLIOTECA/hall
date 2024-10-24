'use client';

import { createTheme } from '@mantine/core';

import colors from './colors';
import headings from './headings';
import components from './components';

import './fonts/FreeSans/FreeSans.css';

export const theme = createTheme({
  primaryColor: 'indigo',
  fontFamily: 'FreeSans, sans-serif',

  colors,
  headings,
  components,
});
