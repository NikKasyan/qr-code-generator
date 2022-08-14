import { keyboardState } from "@testing-library/user-event/dist/keyboard/types";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useQuery = (): { [name: string]: string } => {
  const { search } = useLocation();

  return useMemo(() => {
    const urlParams = new URLSearchParams(search);
    const keys = Array.from(urlParams.keys());
    return keys.reduce((acc, key) => {
      const values = urlParams.getAll(key);
      return { ...acc, [key]: values.length === 1 ? values[0] : values };
    }, {});
  }, [search]);
};

export default useQuery;
