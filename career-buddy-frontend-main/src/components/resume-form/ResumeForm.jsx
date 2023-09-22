// styles
import ResumeFormStyles from "./resume-form.module.scss";

import sections from "./ResumeFormSections";

import SubForm from "./SubForm";

// redux stuff

const ResumeForm = ({ styles = {}, setResumeData, resumeData }) => {
  return (
    <form
      autoComplete="off"
      className={ResumeFormStyles.form}
      style={{ ...styles }}
    >
      {sections.map((section, index) => (
        <section key={index} id={section.title}>
          <SubForm
            section={section}
            setResumeData={setResumeData}
            resumeData={resumeData}
          />
        </section>
      ))}
    </form>
  );
};

export default ResumeForm;
