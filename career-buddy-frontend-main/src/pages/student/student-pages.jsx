import Profile from "./student_components/profile/Profile";
import Booking from "./student_components/booking/Booking";
import Opportunities from "./student_components/opportunities/Opportunities";
import Documents from "./student_components/documents/Documents";
import CreateDocument from "./student_components/create_document/CreateDocument";
import Notifications from "./student_components/notifications/Notifications";

import {
  PROFILE,
  BOOKING,
  OPPORTUNITIES,
  DOCUMENTS,
  CREATE_DOCUMENT,
  NOTIFICATIONS,
} from "@utils/constants";

const studentPages = {
  [PROFILE]: <Profile />,
  [BOOKING]: <Booking />,
  [OPPORTUNITIES]: <Opportunities />,
  [DOCUMENTS]: <Documents />,
  [CREATE_DOCUMENT]: <CreateDocument />,
  [NOTIFICATIONS]: <Notifications />,
};

export default studentPages;
