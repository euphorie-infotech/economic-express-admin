import NewsCategory from "../pages/NewsCategory/NewsCategory";
import UserModule from "../pages/UserModule/UserModule";

export const routes = [
  {
    id: 1,
    name: "News Category",
    path: "/news-category",
    element: <NewsCategory />,
  },
  {
    id: 2,
    name: "User Module",
    path: "/user-module",
    element: <UserModule />,
  },
];
