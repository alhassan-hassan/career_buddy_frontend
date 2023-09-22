import CLTAStyles from "./cover-letter-text-area.module.scss";

const CoverLetterTextArea = ({
  setReviewContent,
  defaultContent,
  readOnly,
}) => {
  // if (window.location.pathname === "/print") {
  //   setTimeout(() => window.print(), 1000);
  // }
  return (
    <div className={CLTAStyles.wrapper}>
      {readOnly ? (
        <textarea
          name="cover-letter"
          id="cover-letter"
          placeholder="start typing..."
          onBlur={(e) => setReviewContent?.(e.target.value)}
          defaultValue={defaultContent ? defaultContent : ""}
          readOnly
        ></textarea>
      ) : (
        <textarea
          name="cover-letter"
          id="cover-letter"
          placeholder="start typing..."
          onBlur={(e) => setReviewContent?.(e.target.value)}
          defaultValue={defaultContent ? defaultContent : ""}
        ></textarea>
      )}
    </div>
  );
};

export default CoverLetterTextArea;
