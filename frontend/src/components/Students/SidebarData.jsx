// Filename - components/SidebarData.js

import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/student/dashboard",
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
    title: "Placements",
    // path: "",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Placement Profile",
        path: "/student/placement-profile",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Job Listings",
        path: "/student/job-listings",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      //   {
      //     title: "Service 3",
      //     path: "/services/services3",
      //     icon: <IoIcons.IoIosPaper />,
      //   },
    ],
  },
  // {
  //   title: "Job Listings",
  //   // path: "/tpo/post-job",
  //   icon: <FaIcons.FaEnvelopeOpenText />,

  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: "Post Job",
  //       path: "/tpo/post-job",
  //       icon: <IoIcons.IoIosPaper />,
  //     },
  //     // {
  //     //   title: "Event 2",
  //     //   path: "/events/events2",
  //     //   icon: <IoIcons.IoIosPaper />,
  //     // },
  //   ],
  // },
];
