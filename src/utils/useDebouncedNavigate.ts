import { NavigateOptions, useNavigate } from "react-router-dom";

const useDebouncedNavigate = () => {
  const navigateTo = useNavigate();
  return (
    to: string,
    wait: number = 0,
    options: NavigateOptions = { replace: true }
  ) => navigateTo(to, options);
};
export default useDebouncedNavigate;
