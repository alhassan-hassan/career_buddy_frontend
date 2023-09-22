import { FileIcon } from "@components/icons/Icons";

import Doc from "./doc.module.scss";

const Document = ({ name = "hello", onClick }) => {
  return (
    <div className={Doc.wrapper} onClick={onClick}>
      <FileIcon />
      <small>{name}</small>
    </div>
  );
};

export default Document;
