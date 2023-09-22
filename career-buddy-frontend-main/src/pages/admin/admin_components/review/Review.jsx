import ResumeSheet from "@components/resume-sheet/ResumeSheet";
import CoverLetterTextArea from "@components/cover_letter_text_area/CoverLetterTextArea";
import { Hamburger } from "@components/icons/Icons";

import { useState, useEffect } from "react";

import { getReviewList, addReview } from "@network/api-handlers.js";
import useAuth from "@hooks/useAuth";

import ReviewStyles from "./review.module.scss";
import ReviewRequestCard from "./ReviewRequestCard";
import CoverLetterSheet from "@components/cover_letter_sheet/CoverLetterSheet";

import { reviewListData } from "@utils/data";
// import { AppContext } from "@contexts/AppContext";

const Review = () => {
  const { auth } = useAuth();
  console.log(auth);

  const [toggleReview, setToggleReview] = useState(true);
  const [reviewList, setReviewList] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(-1);
  const [reviewContent, setReviewContent] = useState(null);

  const toggleReviewList = () => {
    setToggleReview(!toggleReview);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getReviewList(auth.data[0].userID);
        console.log(response);
        // setReviewList([]);
        // return;
        if (response.data) {
          setReviewList(response.data);
          setCurrentReviewIndex(0);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const submitReview = async (currentReviewIndex) => {
    if (!reviewContent) {
      alert("no review content set");
      return;
    }

    let response = confirm(
      "are you sure you want to submit review for this student"
    );

    if (!response) return;

    let subject = prompt("enter the subject of the review");

    if (!subject) return;

    let reviewPayload = {
      documentID: String(reviewList[currentReviewIndex].documentID),
      reviewerID: auth.data[0].userID,
      subject: subject,
      content: reviewContent,
    };

    let reviewResponse = await addReview(reviewPayload);
    console.log(reviewResponse);
    if (reviewResponse.data.ok) {
      alert(reviewResponse.data.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
      }}
    >
      <div
        className={ReviewStyles.reviewslist}
        style={{
          width: "20vw",
          left: `${toggleReview ? "-25vw" : "0"}`,
          zIndex: `${toggleReview ? "-1" : "999"}`,
          paddingTop: "5rem",
          overflowY: "scroll",
        }}
      >
        {reviewList.length &&
          reviewList.map((review, index) => (
            <ReviewRequestCard
              key={index}
              {...review}
              onClick={() => setCurrentReviewIndex(index)}
            />
          ))}
      </div>
      <div
        style={{
          color: "#444",
          margin: "1rem 0.5rem",
          position: "absolute",
          top: "1rem",
          left: "1rem",
          cursor: "pointer",
          zIndex: "9999",
        }}
        onClick={() => toggleReviewList()}
      >
        <Hamburger />
      </div>

      <div className={ReviewStyles.documentParent}>
        {currentReviewIndex != -1 &&
          (reviewList[currentReviewIndex]?.doc_type == "Resume" ? (
            <ResumeSheet
              content={JSON.parse(reviewList[currentReviewIndex].document)}
            />
          ) : (
            <CoverLetterTextArea
              readOnly={true}
              defaultContent={JSON.parse(
                reviewList[currentReviewIndex].document
              )}
            />
          ))}
      </div>

      <div className={ReviewStyles.textAreaParent}>
        <CoverLetterTextArea setReviewContent={setReviewContent} />
      </div>

      {currentReviewIndex != -1 && (
        <small className={ReviewStyles.activeDoc}>
          {reviewList[currentReviewIndex].fName +
            " " +
            reviewList[currentReviewIndex].lName}{" "}
          - {reviewList[currentReviewIndex].docName}
        </small>
      )}

      <div className={ReviewStyles.reviewButtonParent}>
        <button onClick={() => submitReview(currentReviewIndex)}>
          submit review
        </button>
      </div>
    </div>
  );
};

export default Review;
