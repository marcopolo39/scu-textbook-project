import { useEffect, useState } from "react";

export const useLoader = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {}, [loaded]);

  return [loaded, setLoaded];
};
