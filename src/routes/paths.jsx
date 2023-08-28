import NewsCategory from "../pages/NewsCategory/NewsCategory";
import UserModule from "../pages/UserModule/UserModule";
import Tags from "../pages/Tags/Tags";
import Login from "../components/Login";

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
  {
    id: 3,
    name: "Tags",
    path: "/tags",
    element: <Tags />,
  },
];
