import { createContext, ReactNode, useState } from "react";

type LoaderContextType = {
  changeLoadingState: () => void;
  isLoading: boolean;
};

type LoaderContextProviderProps = {
  children: ReactNode;
};

export const LoaderContext = createContext({} as LoaderContextType);

export function LoaderContextProvider({
  children,
}: LoaderContextProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  function changeLoadingState() {
    setIsLoading(!isLoading);
  }

  return (
    <LoaderContext.Provider value={{ changeLoadingState, isLoading }}>
      {children}
    </LoaderContext.Provider>
  );
}
