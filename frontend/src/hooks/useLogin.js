import { useDispatch } from "react-redux";
import { setToken, setUser } from "../actions/accountActions";
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
        document.querySelector(".loginErrorAlert").style.display = "none";
        dispatch(setToken(res.data.token));
        dispatch(setUser(res.data.user));
      })
      .catch((err) => {
        console.log(err);
        document.querySelector(".loginErrorAlert").style.display = "block";
      });
  };

  return loginAccount;
};
