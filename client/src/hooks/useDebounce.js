import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState("");
  useEffect(() => {
    const handleTimeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handleTimeout);
    };
  }, [value, delay]);
  return debounceValue;
};
