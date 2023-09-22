import ResumeSheet from "@components/resume-sheet/ResumeSheet";
import React, { useContext } from "react";
import { AppContext } from "@contexts/AppContext";
import CoverLetterTextArea from "@components/cover_letter_text_area/CoverLetterTextArea";
import CoverLetterSheet from "@components/cover_letter_sheet/CoverLetterSheet";

const Print = () => {
  const {
    resumeData,
    setResumeData,
    coverLetterData,
    setCoverLetterData,
    currentDocumentType,
    setCurrentDocumentType,
  } = useContext(AppContext);
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
      {currentDocumentType === "Resume" ? (
        <ResumeSheet content={resumeData} />
      ) : (
        <CoverLetterTextArea defaultContent={coverLetterData} />
      )}
    </div>
  );
};

export default Print;
