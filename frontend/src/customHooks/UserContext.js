/* This code snippet is creating a UserContext using React's createContext function. It then defines a
UserProvider component that uses the useState hook to manage the state of a user object. The
UserProvider component wraps its children with the UserContext.Provider, passing down the user state
and setUser function as the context value. */
import React, { createContext, useState, useContext } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
