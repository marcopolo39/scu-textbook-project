import { useDispatch } from "react-redux";
import { setToken, setUser } from "../actions/accountActions";
import axios from "axios";
import { useEffect, useState } from "react";

export const useLoader = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    console.log("Load", loaded);
  }, [loaded]);

  return [loaded, setLoaded];
};
