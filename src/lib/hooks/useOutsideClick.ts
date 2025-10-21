import { RefObject, useEffect, useRef } from "react";

export const useOutsideClick = (
  callback: () => void,
  exceptionRef?: RefObject<HTMLElement | null>
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        ref.current &&
        !ref.current.contains(target) &&
        (!exceptionRef?.current || !exceptionRef.current.contains(target))
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [callback, exceptionRef]);

  return ref;
};
