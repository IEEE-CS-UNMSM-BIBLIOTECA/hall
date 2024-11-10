import { useEffect } from 'react';
import { useLocation } from 'wouter';
import observeScrollEvents from '@/utils/observeScrollEvents';

const useLocationChange = () => {
  const [location] = useLocation();

  useEffect(() => {
    observeScrollEvents();
  }, [location]);
};

export default useLocationChange;
