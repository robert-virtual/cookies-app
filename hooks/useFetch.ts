import { useEffect, useState } from "react";
import { User } from "../pages/Register";

interface Res {
  user?: User;
  error?: string;
}
export default function useFetch(
  url?: string,
  body?: any,
  method?: RequestInit["method"]
) {
  const [data, setData] = useState<Res>();
  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState<Response>();
  let headers = {};
  useEffect(() => {
    if (body) {
      headers = {
        "Content-Type": "application/json",
      };
    }
    if (url) {
      (async () => {
        setRes(
          await fetch(url, {
            headers,
            credentials: "include",
            method: method ? method : body ? "POST" : "GET",
            body: JSON.stringify(body),
          })
        );

        setData(await res?.json());
        setLoading(false);
      })();
    }
  }, [url]);

  return {
    loading,
    data,
    res,
  };
}
