import {
  HomeIcon,
  BellIcon,
  FileIcon,
  PlusIcon,
  LogoutIcon,
  ProfileIcon,
  GiftIcon,
  ReviewIcon,
  StacksIcon,
  FolderIcon,
  CalendarIcon,
  ManagementIcon,
} from "@components/icons/Icons";

const studentPageNames = {
  PROFILE: "profile",
  OPPORTUNITIES: "opportunities",
  BOOKING: "booking",
  DOCUMENTS: "documents",
  CREATE_DOCUMENT: "create document",
  NOTIFICATIONS: "notifications",
  LOGOUT: "logout",
};

const cpaPageNames = {
  PROFILE: "profile",
  REVIEW: "review",
  AVAILABILITY: "availability",
  LOGOUT: "logout",
};

const adminPageNames = {
  PROFILE: "profile",
  AVAILABILITY: "availability",
  OPPORTUNITIES: "opportunities",
  REVIEW: "review",
  MANAGEMENT: "management",
  LOGOUT: "logout",
};

export const studentPages = [
  {
    name: studentPageNames.PROFILE,
    customSVG: <ProfileIcon />,
  },
  {
    name: studentPageNames.BOOKING,
    customSVG: <CalendarIcon />,
  },
  {
    name: studentPageNames.OPPORTUNITIES,
    customSVG: <StacksIcon />,
    label: 12,
  },
  {
    name: studentPageNames.DOCUMENTS,
    customSVG: <FolderIcon />,
  },
  {
    name: studentPageNames.CREATE_DOCUMENT,
    customSVG: <PlusIcon />,
  },
  {
    name: studentPageNames.NOTIFICATIONS,
    customSVG: <BellIcon />,
    label: 3,
  },
  {
    name: studentPageNames.LOGOUT,
    customSVG: <LogoutIcon />,
  },
];

export const cpaPages = [
  {
    name: cpaPageNames.PROFILE,
    customSVG: <ProfileIcon />,
  },
  {
    name: cpaPageNames.REVIEW,
    customSVG: <ReviewIcon />,
    label: 21,
  },
  {
    name: cpaPageNames.AVAILABILITY,
    customSVG: <CalendarIcon />,
    label: 21,
  },
  {
    name: cpaPageNames.LOGOUT,
    customSVG: <LogoutIcon />,
  },
];

export const adminPages = [
  {
    name: adminPageNames.PROFILE,
    customSVG: <ProfileIcon />,
  },
  {
    name: adminPageNames.REVIEW,
    customSVG: <ReviewIcon />,
    label: 21,
  },
  {
    name: adminPageNames.AVAILABILITY,
    customSVG: <CalendarIcon />,
    label: 21,
  },
  {
    name: adminPageNames.OPPORTUNITIES,
    customSVG: <StacksIcon />,
    label: 21,
  },
  {
    name: adminPageNames.MANAGEMENT,
    customSVG: <ManagementIcon />,
    label: 3,
  },
  {
    name: adminPageNames.LOGOUT,
    customSVG: <LogoutIcon />,
  },
];
