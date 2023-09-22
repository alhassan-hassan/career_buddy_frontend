import OneLineData from "@components/resume-sheet-components/one-line-data/OneLineData";
import BoldOneLineData from "@components/resume-sheet-components/one-line-data/BoldOneLineData";
import ResumeSheetStyle from "./resume-sheet.module.scss";
import MultiLineData from "@components/resume-sheet-components/multi-line-data/MultiLineData";
import ResumeSection from "@components/resume-sheet-components/resume-section/ResumeSection";

// import { useSelector, useDispatch } from "react-redux";
import BulletedLineData from "@components/resume-sheet-components/bulleted-line-data/BulletedLineData";

const ResumeSheet = ({ content }) => {
  if (window.location.pathname === "/print") {
    setTimeout(() => window.print(), 1000);
  }

  // const resumeData = JSON.parse(content) ?? {};

  // const resumeData = content ? JSON.parse(content) : {};
  const resumeData = content ? content : {};

  return (
    <div className={ResumeSheetStyle.sheet}>
      <div className={ResumeSheetStyle.resumeData}>
        <center>
          <div
            className="name"
            style={{ fontSize: "14pt", fontWeight: "bold" }}
          >
            {resumeData.name?.toUpperCase() ?? "DAVID EBO SAMPAH"}
          </div>
          <article>
            {resumeData["postal address"] ?? "PMB CT 3, Cantonments"}
          </article>
          <article>
            <span>{resumeData["phone number"] ?? "0546987125"}</span>/
            <span> {resumeData["nationality"] ?? "Ghanaian"}</span>
          </article>
          <article>{resumeData["email"] ?? "david.ebo@sampah.edu.gh"}</article>
          <article style={{ color: "dodgerblue" }}>
            {resumeData["linkedin"] ?? "https://linkedin.com/ebo-sampah"}
          </article>
        </center>
      </div>
      <div className="education">
        <ResumeSection name="education" />
        <BoldOneLineData
          left={resumeData["university"] ?? "Ashesi University"}
          right={resumeData["location"] ?? "Berekusu Easten Region"}
        />
        <BoldOneLineData
          left={resumeData["program"] ?? "BSc. Computer Science"}
          right={
            resumeData["expected date of graduation"] ??
            "Expected Date of Gradutaion: July 2016"
          }
        />
        <OneLineData
          left={"Cumulative GPA: " + (resumeData["cgpa"] ?? "3.75/4.00")}
        />
        <br />

        <BoldOneLineData
          left={resumeData["high school"] ?? "ABCD Senior High School"}
          right={resumeData["high school location"] ?? "Cantonments, Accra"}
        />

        <BoldOneLineData
          left={resumeData["high school program"] ?? "General Arts"}
          right={resumeData["high school duration"] ?? "Sept 2009 - July 2012"}
        />
      </div>
      <br />
      <div className="achievements">
        <ResumeSection name="achivements/awards" />
        <BoldOneLineData
          left={
            resumeData["achievement 1"] ??
            "The MasterCard Foundation Scholar Program, Ashesi University"
          }
          right={resumeData["duration 1"] ?? "2012 - 2016"}
        />

        <BoldOneLineData
          left={resumeData["achievement 2"] ?? " Dean's List Honours"}
          right={resumeData["duration 2"] ?? "2012 - 2013"}
        />
        <BoldOneLineData
          left={resumeData["achievement 3"] ?? "Kufuor Scholar"}
          right={resumeData["duration 3"] ?? "2018 - 2021"}
        />
      </div>
      <br />
      <div className="work-experience">
        <ResumeSection name="work experience" />
        <MultiLineData
          firm={resumeData["work experience 1 firm"] ?? "ABC Children's Home"}
          location={
            resumeData["work experience 1 location"] ?? "Cantonments, Accra"
          }
          duration={
            resumeData["work experience 1 duration"] ?? "June 2013 - Present"
          }
          position={
            resumeData["work experience 1 position"] ?? "Marketing Intern"
          }
          impacts={[
            `${
              resumeData["work experience 1 impact 1"] ??
              "Supervise the planning of the Annual Company Street Festival "
            }`,
            `${
              resumeData["work experience 1 impact 2"] ??
              "Plan a charity event with the aim of raising $3000 to help provide shelter for street children "
            }`,
            `${
              resumeData["work experience 1 impact 3"] ??
              "Update and manage the company’s website (increased website traffic by 20%)"
            }`,
          ]}
        />
        <br />
        <MultiLineData
          firm={resumeData["work experience 2 firm"] ?? "XYZ Foundation"}
          location={
            resumeData["work experience 2 location"] ?? "Dzorwulu, Accta"
          }
          duration={
            resumeData["work experience 2 duration"] ??
            "December 20212 - May 2013"
          }
          position={resumeData["work experience 2 position"] ?? "President"}
          impacts={[
            `${
              resumeData["work experience 2 impact 1"] ??
              "Managed club and presided over club activities and Editorial Meetings"
            }`,
            `${
              resumeData["work experience 2 impact 2"] ??
              "Organised seminars involving key figures to dialogue on the role of leadership in Africa"
            }`,
            `${
              resumeData["work experience 2 impact 3"] ??
              "Increased membership and developed club programs by 22% and 40% respectively"
            }`,
          ]}
        />
      </div>
      <br />
      <div className="projects-research">
        <ResumeSection name="projects & research" />
        <MultiLineData
          firm={
            resumeData["projects & research firm"] ?? "Green Hills Consortium"
          }
          location={
            resumeData["projects & research location"] ?? "Sawaba, Kumasi"
          }
          duration={
            resumeData["projects & research duration"] ??
            "November 2013 - August 2014"
          }
          position={
            resumeData["projects & research position"] ?? "Jambo - Team Member"
          }
          impacts={[
            `${
              resumeData["projects & research impact 1"] ??
              "Assisted a global team in designing and implementing a business model to provide digital access to 5.5 billion people living on less than $10 per day using a model that offers free mobile phone service"
            }`,
            `${
              resumeData["projects & research impact 2"] ??
              "Supervise the planning of the Annual Company Street Festival"
            }`,
            `${
              resumeData["projects & research impact 3"] ??
              "Supervise the planning of the Annual Company Street Festival"
            }`,
          ]}
        />
      </div>
      <br />
      <div className="co-curricular">
        <ResumeSection name="co-curricular activities" />
        <MultiLineData
          firm={resumeData["co-curricular firm"] ?? "Ashesi University"}
          location={
            resumeData["co-curricular activity"] ?? "Ashesi Robotics Experience"
          }
          duration={
            resumeData["co-curricular duration"] ?? "June 2013 - September 2014"
          }
          position={resumeData["co-curricular position"] ?? "Mentor"}
          impacts={[
            `${
              resumeData["co-curricular impact 1"] ??
              "Mentored 5 high school students for 1 week and helped them design a Robotic Tour Guide"
            }`,
            `${
              resumeData["co-curricular impact 2"] ??
              "Supervised and evaluated group projects and weekly tasks"
            }`,
            `${
              resumeData["co-curricular impact 3"] ??
              "Supervised and evaluated group projects and weekly tasks"
            }`,
          ]}
        />
      </div>
      <br />
      <div className="skills">
        <ResumeSection name="skills" />
        <BulletedLineData
          data={resumeData["skill 1"] ?? "Advanced Proficiency in French"}
        />
        <BulletedLineData
          data={
            resumeData["skill 2"] ??
            "Programming Languages (Proficient in Java, C++, SQL, HTML, CSS, PHP, and JavaScript)"
          }
        />
        <BulletedLineData
          data={
            resumeData["skill 3"] ??
            "Graphic designing using software such as Indigo Studio, Balsamic, Pencil, Lumzy "
          }
        />
      </div>
    </div>
  );
};

export default ResumeSheet;
