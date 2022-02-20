import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext({ hashSearch: "" });

export const Store = ({ children }) => {
  const [hashSearch, updatehashSearch] = useState("");
  const [token, settoken] = useState();
  function sethashSearch(value) {
    updatehashSearch(value);
  }
  // useEffect(async () => {
  //   if (!token) {
  //     const tknDt = await axios.post(
  //       "https://everlio.com:5000/v1/user/generate/tempToken",
  //       {
  //         key_value: "@!#_+)(*)TRUETN",
  //       }
  //     );

  //     let token;
  //     if (tknDt.data.status === "success") {
  //       token = tknDt.data.token.split(" ").pop();
  //       settoken(token);
  //     }
  //   }
  // }, [token]);
  return (
    <StoreContext.Provider value={{ hashSearch, sethashSearch, token }}>
      {children}
    </StoreContext.Provider>
  );
};
