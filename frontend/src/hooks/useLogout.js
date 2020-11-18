import { useDispatch } from "react-redux";
import { setToken, setUser } from "../actions/accountActions";
import { useToken } from "../hooks/useToken";
import axios from "axios";

export const useLogout = () => {
  const token = useToken();
  const dispatch = useDispatch();

  const logoutAccount = () => {
    axios
      .post("/api/account/logout", null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        dispatch(setToken(null));
        dispatch(setUser({}));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return logoutAccount;
};
