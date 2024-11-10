import { useEffect } from 'react';
import observeScrollEvents from '@/utils/observeScrollEvents';

const useAppStart = () => {
  useEffect(() => {
    observeScrollEvents();
  }, []);
};

export default useAppStart;
