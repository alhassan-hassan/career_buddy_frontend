// libraries
import { useState } from "react";

// styles
import SubFormStyles from "./sub-form.module.scss";

// components
import Icon from "@components/icons/Icon";
import Input from "@components/input/Input";
import {
  CaretDownIcon,
  CaretUpIcon,
  CircleCheckIcon,
} from "@components/icons/Icons";

const SubForm = ({ section, setResumeData, resumeData }) => {
  const [isOpen, toggleDropdown] = useState(false);
  const OPEN = "open";
  const CLOSE = "close";

  const updateResumeField = (e) => {
    let newUpdate = { ...resumeData };
    newUpdate[e.target.id] = e.target.value;
    setResumeData(newUpdate);
  };

  return (
    <div>
      <header onClick={() => toggleDropdown(!isOpen)}>
        <Icon customSVG={<CircleCheckIcon />} />
        <span>{section.title}</span>
        <Icon customSVG={isOpen ? <CaretUpIcon /> : <CaretDownIcon />} />
      </header>
      <div className={SubFormStyles[`${isOpen ? OPEN : CLOSE}`]}>
        {section.fields.map((field) => (
          <>
            <Input
              key={field}
              label={field}
              id={field}
              defaultValue={resumeData[field]}
              onChange={(e) => updateResumeField(e)}
            />
            <br />
          </>
        ))}
      </div>
    </div>
  );
};

export default SubForm;
