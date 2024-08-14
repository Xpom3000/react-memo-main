import { createContext, useState } from "react";

const initialState = {
  isEnabled: false,
  level: null,
  setLevel: () => {},
  setIsEnabled: () => {},
};

export const ModeContext = createContext(initialState);
export const ModeProvider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [level, setLevel] = useState(null);

  return <ModeContext.Provider value={{ isEnabled, setIsEnabled, level, setLevel }}>{children}</ModeContext.Provider>;
};
