// components
import Icon from "@components/icons/Icon";

// styles
import SidebarStyles from "./sidebar.module.scss";

// extras
import { studentPages, cpaPages, adminPages } from "./sidebar_pages";
// import useAuth from "@hooks/useAuth";

const Sidebar = ({ setCurrentPage, currentPage, styles = {}, currentRole }) => {
  // const { auth } = useAuth();

  const APP_THEME = "#A76A99";
  const WHITE = "#fff";
  let route = window.location.href.split("/").pop();
  let sidebar = route;

  let pages_map = {
    cpa: cpaPages,
    student: studentPages,
    admin: adminPages,
  };

  let pages = pages_map[currentRole ?? route];
  // let pages = pages_map["cpa"];

  return (
    <div className={SidebarStyles[sidebar]} style={{ ...styles }}>
      {pages.map((page, index) => (
        <div onClick={() => setCurrentPage(page.name)} key={page.name}>
          <Icon
            name={page.name}
            label={`${page.label ?? ""}`}
            customSVG={page.customSVG}
            style={{
              backgroundColor: `${currentPage === page.name ? APP_THEME : ""}`,
              color: `${currentPage === page.name ? WHITE : ""}`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
