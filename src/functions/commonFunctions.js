import { useState, useEffect } from 'react';

export function useScroll(elementObj) {
  const [bodyOffset, setBodyOffset] = useState(
    document.body.getBoundingClientRect()
  );

  const [scrollY, setScrollY] = useState(bodyOffset.top);
  const [scrollX, setScrollX] = useState(bodyOffset.left);

  const listener = e => {
    const scroll = setBodyOffset(elementObj.current.getBoundingClientRect());
    setBodyOffset(document.body.getBoundingClientRect());
    setScrollY(-bodyOffset.top);
    setScrollX(bodyOffset.left);
  };

  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  });

  return {
    scrollY,
    scrollX,
  };
}
