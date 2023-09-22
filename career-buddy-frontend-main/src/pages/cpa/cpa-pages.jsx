import Profile from "./cpa_components/profile/Profile";
import Review from "./cpa_components/review/Review";
import Availability from "./cpa_components/availability/Availability";

import { PROFILE, REVIEW, AVAILABILITY } from "@utils/constants";

const cpaPages = {
  [PROFILE]: <Profile />,
  [REVIEW]: <Review />,
  [AVAILABILITY]: <Availability />,
};

export default cpaPages;
