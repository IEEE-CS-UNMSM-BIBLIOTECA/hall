const setScrollClasses = (el: HTMLElement) => {
  const isScrollable = el.scrollHeight > el.clientHeight;

  if (!isScrollable) {
    el.classList.remove('is-bottom-overflowing', 'is-top-overflowing');
    return;
  }

  const isScrolledToBottom = el.scrollHeight < el.clientHeight + el.scrollTop + 1;
  const isScrolledToTop = isScrolledToBottom ? false : el.scrollTop === 0;

  el.classList.toggle('is-bottom-overflowing', !isScrolledToBottom);
  el.classList.toggle('is-top-overflowing', !isScrolledToTop);
};

export default () => {
  const handleScroll = (e: Event) => {
    const el = e.currentTarget;
    if (el instanceof HTMLElement) {
      setScrollClasses(el);
    }
  };

  const addScrollListeners = () => {
    const elements = document.querySelectorAll('.vertical-scroll');
    elements.forEach((element) => {
      element.addEventListener('scroll', handleScroll);
    });
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        addScrollListeners();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });

  // Initial call to add listeners to existing elements
  addScrollListeners();

  // Cleanup function to disconnect the observer and remove event listeners
  return () => {
    observer.disconnect();
    const elements = document.querySelectorAll('.vertical-scroll');
    elements.forEach((element) => {
      element.removeEventListener('scroll', handleScroll);
    });
  };
};
