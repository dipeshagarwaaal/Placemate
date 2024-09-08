// Filename - components/SidebarData.js

import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/tpo/dashboard",
    icon: <AiIcons.AiFillHome />

    // subNav: [
    //   {
    //     title: "Our Aim",
    //     path: "/about-us/aim",
    //     icon: <IoIcons.IoIosPaper />,
    //   },
    //   {
    //     title: "Our Vision",
    //     path: "/about-us/vision",
    //     icon: <IoIcons.IoIosPaper />,
    //   },
    // ],
  },
  {
    title: "Students",
    // path: "",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Approve Students",
        path: "/tpo/approve-student",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      //   {
      //     title: "Service 2",
      //     path: "/services/services2",
      //     icon: <IoIcons.IoIosPaper />,
      //     cName: "sub-nav",
      //   },
      //   {
      //     title: "Service 3",
      //     path: "/services/services3",
      //     icon: <IoIcons.IoIosPaper />,
      //   },
    ],
  },
  {
    title: "Job Listings",
    // path: "/tpo/post-job",
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "All Jobs",
        path: "/tpo/job-listings",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Post Job",
        path: "/tpo/post-job",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Company",
    // path: "/tpo/post-job",
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "All Companys",
        path: "/tpo/companys",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Add Company",
        path: "/tpo/add-company",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
];
