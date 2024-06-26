
import CourseCategory from "views/CourseCategory/CourseCategory";
import Dashboard from "views/Dashboard.js";
import { ArrowRight } from 'react-bootstrap-icons';
import TableList from "views/TableList.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    // icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
    {
    path: "/table",
    name: "Table List",
    // icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/CourseCategory",
    name: "Course Category",
    icon: "bi bi-motherboard-fill",
    component: CourseCategory,
    layout: "/admin"
  },
  // {
  //   path: "/Login",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: Login,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "nc-icon nc-circle-09",
  //   component: UserProfile,
  //   layout: "/admin"
  // },

  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
