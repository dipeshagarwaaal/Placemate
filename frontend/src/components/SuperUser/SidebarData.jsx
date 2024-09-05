// Filename - components/SidebarData.js

import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <AiIcons.AiFillHome />
  },
  {
    title: "Users",
    // path: "",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Management",
        path: "/admin/management",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "TPO",
        path: "/admin/tpo",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Student",
        path: "/admin/student",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Approve Student",
    path: "/admin/approve-student",
    icon: <FaIcons.FaEnvelopeOpenText />,
  },
];
