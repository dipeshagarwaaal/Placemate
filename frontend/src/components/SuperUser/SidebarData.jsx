import React from "react";
import { FaCheckSquare, FaUsers } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { PiStudentDuotone } from "react-icons/pi";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { GrUserManager, GrUserWorker } from "react-icons/gr";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <AiFillHome />
  },
  {
    title: "Users",
    icon: <FaUsers />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "Management",
        path: "/admin/management",
        icon: <GrUserManager />,
        cName: "sub-nav",
      },
      {
        title: "TPO",
        path: "/admin/tpo",
        icon: <GrUserWorker />,
        cName: "sub-nav",
      },
      {
        title: "Student",
        path: "/admin/student",
        icon: <PiStudentDuotone />,
      },
    ],
  },
  {
    title: "Approve Student",
    path: "/admin/approve-student",
    icon: <FaCheckSquare />,
  },
];
