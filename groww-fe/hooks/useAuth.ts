import Router from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";

export default function useAuth(
  redirectTo = "",
  replace = false,
  replaceOnAuth = false
) {
  const auth = useAppSelector((state) => state.user.accessToken);

  useEffect(() => {
    if ((replaceOnAuth && Boolean(auth)) && redirectTo) {
      if (replace) Router.replace(redirectTo);
      else Router.push(redirectTo);
    }
  }, [redirectTo, replace,replaceOnAuth,auth]);

  return Boolean(auth);
}
