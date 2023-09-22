import Profile from "./admin_components/profile/Profile";
import Availability from "./admin_components/availability/Availability";
import Opportunities from "./admin_components/opportunities/Opportunities";
import Review from "./admin_components/review/Review";
import Management from "./admin_components/management/Management";
import Settings from "./admin_components/settings/Settings";

import {
  PROFILE,
  AVAILABILITY,
  OPPORTUNITIES,
  REVIEW,
  MANAGEMENT,
  SETTINGS,
} from "@utils/constants";

const adminPages = {
  [PROFILE]: <Profile />,
  [AVAILABILITY]: <Availability />,
  [OPPORTUNITIES]: <Opportunities />,
  [REVIEW]: <Review />,
  [MANAGEMENT]: <Management />,
  [SETTINGS]: <Settings />,
};

export default adminPages;
