import { ROUTES } from './routes';

export interface MenuItem {
  label: string;
  link: string;
}

export const PUBLIC_MENU_ITEMS: MenuItem[] = [
  { label: 'INICIO', link: ROUTES.HOME },
  { label: 'RESEÑAS', link: ROUTES.REVIEWS },
  { label: 'LISTAS', link: ROUTES.LISTS },
];

export const AUTHENTICATED_MENU_ITEMS: MenuItem[] = [
  { label: 'INICIO', link: ROUTES.HOME },
  { label: 'MIS RESEÑAS', link: ROUTES.MY_REVIEWS },
  { label: 'MIS LISTAS', link: ROUTES.LISTS },
  { label: 'PERFIL', link: ROUTES.PROFILE },
];
