import { useEffect } from 'react';
import observeScrollEvents from '@/utils/observeScrollEvents';
import getTokenFromStorage from '@/utils/getTokenFromStorage';

const useAppStart = () => {
  useEffect(() => {
    getTokenFromStorage();
    observeScrollEvents();
  }, []);
};

export default useAppStart;
