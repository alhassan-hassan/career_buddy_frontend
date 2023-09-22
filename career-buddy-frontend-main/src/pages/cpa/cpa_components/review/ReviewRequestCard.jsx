import { FileAttachment, FileIcon } from "@components/icons/Icons";
import ReviewRequestedCardStyles from "./review-requested-card.module.scss";

const ReviewRequestCard = ({ docName, fName, lName, onClick }) => {
  return (
    <div className={ReviewRequestedCardStyles.wrapper} onClick={onClick}>
      <h6>{fName + " " + lName}</h6>
      <div>
        <FileIcon />
        <small>{docName}</small>
      </div>
    </div>
  );
};

export default ReviewRequestCard;
