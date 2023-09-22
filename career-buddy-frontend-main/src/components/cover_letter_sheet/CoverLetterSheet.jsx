import CoverLetterSheetStyles from "./cover-letter-sheet.module.scss";

const CoverLetterSheet = ({ content }) => {
  return <div className={CoverLetterSheetStyles.sheet}>{content}</div>;
};

export default CoverLetterSheet;
