import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { UserModel } from "../models/responses/UserModel";
import { DormyLocalStorage } from "../consts/DormyConstants";

interface AuthContextType {
  user: UserModel | undefined;
  signIn: (user: UserModel | undefined) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserModel | undefined>(() => {
    const storedUser = localStorage.getItem(DormyLocalStorage.userProfile);
    return storedUser ? JSON.parse(storedUser!) : undefined;
  });

  useEffect(() => {
    if (user) {
      handleSignIn(user);
    } else {
      signOut();
    }
  }, [user]);

  const handleSignIn = (user: UserModel) => {
    setUser(user);
    localStorage.setItem(DormyLocalStorage.dormyToken, user.token);
    localStorage.setItem(DormyLocalStorage.userProfile, JSON.stringify(user));
  };

  const signIn = (user: UserModel | undefined) => {
    if (user) {
      handleSignIn(user);
    } else {
      signOut();
    }
  };

  const signOut = () => {
    setUser(undefined);
    localStorage.removeItem(DormyLocalStorage.userProfile);
    localStorage.removeItem(DormyLocalStorage.dormyToken);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used inside AuthProvider");
  return context;
};
