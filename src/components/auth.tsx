import useUser from "@/libs/client/useUser";
import { User } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect } from "react";

interface AuthProp {
  children: React.ReactNode;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  setUserLoading: Dispatch<SetStateAction<boolean>>;
}

export interface UserProp {
  user: User;
}

export default function Authorization({ children, setUser }: AuthProp) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return <div className="mx-auto w-full max-w-xl font-Roboto">{children}</div>;
}
