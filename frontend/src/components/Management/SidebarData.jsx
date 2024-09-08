// Filename - components/SidebarData.js

import React from "react";
import { FaListUl } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { RiArrowDownSFill, RiArrowUpSFill, RiPlayListAddLine } from "react-icons/ri";
import { PiStudentDuotone } from "react-icons/pi";
import { FaClipboardCheck } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/management/dashboard",
    icon: <AiFillHome />
  },
  {
    title: "TPO",
    icon: <GrUserWorker />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,

    subNav: [
      {
        title: "List All",
        path: "/management/tpoadmin",
        icon: <FaListUl />,
        cName: "sub-nav",
      },
      {
        title: "Add New",
        path: "/management/tpoadmin",
        icon: <RiPlayListAddLine />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Students",
    icon: <PiStudentDuotone />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      // {
      //   title: "List All",
      //   path: "/management/approve-student",
      //   icon: <FaListUl />,
      //   cName: "sub-nav",
      // },
      {
        title: "Approve",
        path: "/management/approve-student",
        icon: <FaClipboardCheck />,
        cName: "sub-nav",
      },
    ],
  },
];
