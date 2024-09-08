// Filename - components/SidebarData.js

import React from "react";
import { AiFillHome } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { FaIndustry, FaListCheck } from "react-icons/fa6";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/student/dashboard",
    icon: <AiFillHome />
  },
  {
    title: "Placements",
    // path: "",
    icon: <FaIndustry />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,

    subNav: [
      {
        title: "Placement Profile",
        path: "/student/placement-profile",
        icon: <ImProfile />,
        cName: "sub-nav",
      },
      {
        title: "Job Listings",
        path: "/student/job-listings",
        icon: <FaListCheck />,
      },
    ],
  },
];
