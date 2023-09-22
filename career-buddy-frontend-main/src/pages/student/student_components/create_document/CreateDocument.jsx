import createDocumentStyles from "./create-document.module.scss";
import ResumeSheet from "@components/resume-sheet/ResumeSheet";
import ResumeForm from "@components/resume-form/ResumeForm";
import CoverLetterTextArea from "@components/cover_letter_text_area/CoverLetterTextArea";
import { SaveIcon, DownloadIcon } from "@components/icons/Icons";
import { useState } from "react";
import React, { useContext } from "react";
import { AppContext } from "@contexts/AppContext";
import { saveStudentDocument } from "@network/api-handlers";
import { useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";

const CreateDocument = () => {
  const {
    resumeData,
    setResumeData,
    coverLetterData,
    setCoverLetterData,
    currentDocumentType,
    setCurrentDocumentType,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const { auth } = useAuth();

  console.log(auth);

  const getDocumentName = () => {
    return prompt("save document as");
  };

  const saveDocumentToDb = async () => {
    let documentName = getDocumentName();

    console.log(documentName);

    if (documentName == null) return;

    if (documentName.trim().length == 0) {
      alert("document name cannot be empty");
      return;
    }

    const documentData = {
      studentID: auth.data[0].userID,
      doc_type: currentDocumentType,
      docName: documentName,
      document:
        currentDocumentType == "Resume"
          ? JSON.stringify(resumeData)
          : JSON.stringify(coverLetterData),
    };

    console.log(documentData);

    try {
      const response = await saveStudentDocument(documentData);
      console.log(response);
      if (response.data.ok) alert(response.data.message);
    } catch (error) {
      console.log(error);
    }

    //send to backend
    // saveStudentDocument(documentData)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => alert(err));
  };

  const goToPrintPage = () => {
    let option = confirm("you are about to donwload this document?");
    if (!option) return;
    navigate("/print");
  };

  return (
    <div className={createDocumentStyles.wrapper}>
      <div className={createDocumentStyles.options}>
        <button
          onClick={() => setCurrentDocumentType("Cover Letter")}
          style={{
            backgroundColor: `${
              currentDocumentType === "Cover Letter" ? "#a76a99" : "white"
            }`,
            color: `${
              currentDocumentType === "Cover Letter" ? "white" : "#555"
            }`,
          }}
        >
          cover letter
        </button>
        <button
          onClick={() => setCurrentDocumentType("Resume")}
          style={{
            backgroundColor: `${
              currentDocumentType === "Resume" ? "#a76a99" : "white"
            }`,
            color: `${currentDocumentType === "Resume" ? "white" : "#555"}`,
          }}
        >
          resume
        </button>
      </div>

      {currentDocumentType === "Resume" ? (
        <div id="resume" className={createDocumentStyles.resume}>
          <ResumeForm setResumeData={setResumeData} resumeData={resumeData} />
          <ResumeSheet content={resumeData} />
        </div>
      ) : (
        <div id="coverLetter" className={createDocumentStyles.coverLetter}>
          <CoverLetterTextArea
            setReviewContent={setCoverLetterData}
            defaultContent={coverLetterData}
          />
        </div>
      )}

      <div className={createDocumentStyles.actionButtons}>
        <SaveIcon onClick={saveDocumentToDb} />
        <DownloadIcon onClick={goToPrintPage} />
      </div>
    </div>
  );
};

export default CreateDocument;
