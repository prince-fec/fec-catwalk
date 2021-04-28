import { useEffect, useRef } from 'react';


export function handleTimout(cb, delay) {
  const savedCb = useRef();

  useEffect(() => {
    savedCb.current = cb;
  }, [cb]);

  useEffect(() => {
    function tick() {
      savedCb.current();
    }
    if (delay !== null) {
      var id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay])
}