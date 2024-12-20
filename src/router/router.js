import { createRouter } from "./createRouter";
import { renderMainPage } from "../pages/renderMainPage";
import { renderProfilePage } from "../pages/renderProfilePage";
import { renderLoginPage } from "../pages/renderLoginPage";

export const router = createRouter([
  {
    pathname: "/",
    accessLevel: 0,
    render: renderMainPage,
  },
  {
    pathname: "/profile",
    accessLevel: 2,
    render: renderProfilePage,
  },
  {
    pathname: "/login",
    accessLevel: 1,
    render: renderLoginPage,
  },
]);
