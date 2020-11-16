import { useDispatch } from "react-redux";
import { setToken } from "../actions/accountActions";
import axios from "axios";

export const useLogin = () => {
  const dispatch = useDispatch();

  const loginAccount = (user) => {
    axios
      .post("/api/account/login", {
        username: user.username,
        password: user.password,
      })
      .then((res) => {
        dispatch(setToken(res.data.token));
      })
      .catch((err) => console.log(err));
  };

  return loginAccount;
};
