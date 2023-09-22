import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@components/input/Input";
import Document from "@components/doc/Doc";
import { AppContext } from "@contexts/AppContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import documents from "./documents.module.scss";
import ResumeSheet from "@components/resume-sheet/ResumeSheet";
import {
  getStudentDocuments,
  requestReview,
  deleteStudentDocument,
  getAvailablePersonnel,
} from "@network/api-handlers";

import useAuth from "@hooks/useAuth";
// import CoverLetterSheet from "src/components/cover_letter_sheet/CoverLetterSheet";
import CoverLetterTextArea from "@components/cover_letter_text_area/CoverLetterTextArea";
import { DeleteIcon, DownloadIcon, CloseIcon } from "@components/icons/Icons";

const Documents = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const {
    resumeData,
    setResumeData,
    coverLetterData,
    setCoverLetterData,
    currentDocumentType,
    setCurrentDocumentType,
  } = useContext(AppContext);
  let docs;

  useEffect(() => {
    (async () => {
      try {
        const response = await getStudentDocuments(auth.data[0].userID);
        console.log(response);
        docs = [...response.data];
        setDocuments(docs);
        setDocId(0);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const [allDocuments, setDocuments] = useState([]);
  const [docId, setDocId] = useState(-1);
  const [availablePersonnel, setAvailablePersonnel] = useState([]);
  const [requestReviewData, setRequestReviewData] = useState({
    reviewerID: null,
    documentID: null,
  });

  const filterDocuments = (e) => {
    const { value } = e.target;
    const filteredDocuments = docs.filter((doc) => {
      return doc.title.toLowerCase().includes(value.toLowerCase());
    });

    setDocuments(filteredDocuments);
  };

  const hideDoc = (e) => {
    if (e.target.id == "filedisplay") {
      e.target.style.display = "none";
    }
  };

  const removeOverlay = () => {
    document.getElementById("filedisplay").style.display = "none";
  };

  const showDoc = (e, id) => {
    document.getElementById("filedisplay").style.display = "block";

    setDocId(id);
  };

  const goToPrintPage = () => {
    let option = confirm("you are about to donwload this document?");
    if (!option) return;
    setResumeData(JSON.parse(allDocuments[docId].document));
    setCurrentDocumentType(allDocuments[docId].doc_type);
    navigate("/print");
  };

  const deleteDocument = async () => {
    let option = confirm("you are about to delete this document");
    if (!option) return;
    try {
      const response = await deleteStudentDocument(
        allDocuments[docId].documentID
      );
      console.log(response);
      if (response.data) {
        setDocuments(allDocuments.filter((doc, index) => index != docId));
        alert("document successfully deleted");
        if (allDocuments.length) {
          setDocId(0);
        } else {
          setDocId(-1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestReviewer = async () => {
    const response = await getAvailablePersonnel();
    // console.log(response);
    if (!response.data.length) {
      alert(
        "sorry, no personnels availabe currently. try again in a few moments"
      );
      return;
    }

    setAvailablePersonnel(response.data);

    const newReviewData = {
      reviewerID: null,
      documentID: String(allDocuments[docId].documentID),
    };
    setRequestReviewData(newReviewData);
    // if (!response.data.ok) {
    //   alert("sorry, there are no available personnel. try again later");
    //   return;
    // }

    // set available personnel state
    // show the list to the student
    // student selects one

    // const reviewResponse = await requestReview({auth.user[0].userID,allDocuments[docId].documentID, reviewID});
    // console.log(response);
    // if (reviewResponse.data.ok) {
    //   alert(response.data.message);
    // }
  };

  const setReviewer = (id) => {
    const newReviewData = { ...requestReviewData };
    newReviewData.reviewerID = String(id);
    setRequestReviewData(newReviewData);
  };

  const sendReviewRequest = async () => {
    if (!requestReviewData?.reviewerID) {
      alert("please select a reviewer");
      return;
    }

    console.log(requestReviewData);

    const requestReviewResponse = await requestReview(requestReviewData);
    console.log(requestReviewResponse);

    if (requestReviewResponse.data.ok) {
      alert(requestReviewResponse.data.message);
      setRequestReviewData({});
      setAvailablePersonnel([]);
    }
  };

  return (
    <div className={documents.wrapper}>
      <Input type="text" label="search" onChange={(e) => filterDocuments(e)} />
      {allDocuments.length ? (
        <div
          className={documents.filedisplay}
          onClick={(e) => hideDoc(e)}
          id="filedisplay"
        >
          {allDocuments[docId]?.doc_type === "Resume" ? (
            <ResumeSheet content={JSON.parse(allDocuments[docId].document)} />
          ) : (
            <CoverLetterTextArea
              readOnly={true}
              defaultContent={JSON.parse(allDocuments[docId].document)}
            />
          )}
          <div className={documents.actionButtons}>
            <DeleteIcon onClick={deleteDocument} />
            <DownloadIcon onClick={goToPrintPage} />
            <FontAwesomeIcon
              icon={faPaperPlane}
              style={{ width: "8px", height: "8px" }}
              onClick={requestReviewer}
            />
            <FontAwesomeIcon
              icon={faTimes}
              style={{ width: "8px", height: "8px" }}
              onClick={removeOverlay}
            />
          </div>
        </div>
      ) : null}

      {availablePersonnel.length ? (
        <div className={documents.personnelOverLay}>
          <h2>Select a Reviewer</h2>
          {availablePersonnel.map((person) => (
            <div>
              <input
                type="radio"
                name="reviewer"
                id={person.userID}
                onChange={() => setReviewer(person.userID)}
              />
              <label htmlFor={person.userID}>
                {person.fName + " " + person.lName}
              </label>
            </div>
          ))}
          <button onClick={sendReviewRequest}>Request Review</button>
        </div>
      ) : null}

      <div className={documents.docs}>
        {allDocuments.map((doc, index) => (
          <Document name={doc.docName} onClick={(e) => showDoc(e, index)} />
        ))}
      </div>
    </div>
  );
};

export default Documents;
