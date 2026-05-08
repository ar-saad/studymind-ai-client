"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSession } from "@/lib/auth-client";

type UserContextType = {
  user: any;
  session: any;
  isPending: boolean;
  error: any;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: sessionData, isPending, error } = useSession();

  return (
    <UserContext.Provider
      value={{
        user: sessionData?.user || null,
        session: sessionData?.session || null,
        isPending,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
