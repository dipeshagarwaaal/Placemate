import React from "react";
import { FaCheckSquare, FaUsers } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { GrUserManager, GrUserWorker } from "react-icons/gr";
import { FaListUl } from "react-icons/fa";
import { RiArrowDownSFill, RiArrowUpSFill, RiPlayListAddLine } from "react-icons/ri";
import { PiStudentDuotone } from "react-icons/pi";
import { FaClipboardCheck, FaIndustry, FaEnvelopeOpenText } from "react-icons/fa";
import { LiaIndustrySolid } from "react-icons/lia";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <AiFillHome />
  },
  {
    title: "TPO",
    icon: <FaUsers />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "List All",
        path: "/admin/tpo",
        icon: <GrUserManager />,
        cName: "sub-nav",
      },
      {
        title: "Add New",
        path: "/admin/add-tpo-admin",
        icon: <GrUserWorker />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Management",
    icon: <FaUsers />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "List All",
        path: "/admin/management",
        icon: <GrUserManager />,
        cName: "sub-nav",
      },
      {
        title: "Add New",
        path: "/admin/add-management-admin",
        icon: <GrUserWorker />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Student",
    icon: <FaUsers />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "List All",
        path: "/admin/student",
        icon: <GrUserManager />,
        cName: "sub-nav",
      },
      {
        title: "Approve",
        path: "/admin/approve-student",
        icon: <FaCheckSquare />,
        cName: "sub-nav",
      },
      {
        title: "Add New",
        path: "/admin/add-student",
        icon: <GrUserWorker />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Company",
    icon: <LiaIndustrySolid />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "List All",
        path: "/admin/companys",
        icon: <FaListUl />,
        cName: "sub-nav",
      },
      {
        title: "Add New",
        path: "/admin/add-company",
        icon: <RiPlayListAddLine />,
      },
    ],
  },
  {
    title: "Job Listings",
    icon: <FaIndustry />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,

    subNav: [
      {
        title: "List All",
        path: "/admin/job-listings",
        icon: <FaListUl />,
        cName: "sub-nav",
      },
      {
        title: "Add New",
        path: "/admin/post-job",
        icon: <RiPlayListAddLine />,
      },
    ],
  },
];
