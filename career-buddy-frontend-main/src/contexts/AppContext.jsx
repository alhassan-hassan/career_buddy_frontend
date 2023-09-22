// libraries
import { createContext, useState } from "react";
import { resumeDefaultData, coverLetterDefaultData } from "@utils/data";
export const AppContext = createContext({});

function AppContextProvider({ children }) {
  const [appContextState] = useState("app context provider works");
  const [resumeData, setResumeData] = useState(resumeDefaultData);
  const [coverLetterData, setCoverLetterData] = useState(
    coverLetterDefaultData
  );
  const [currentDocumentType, setCurrentDocumentType] = useState("Resume");

  return (
    <AppContext.Provider
      value={{
        appContextState,
        resumeData,
        setResumeData,
        coverLetterData,
        setCoverLetterData,
        currentDocumentType,
        setCurrentDocumentType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
