/**
 * NOTE:
 * 라우터 분기에 대해 좀 더 생각해 봐야겠다.
 * 각 매인에서 window.routerType = ('browser'|'hash') 이렇게 값을 저장하고
 * 이 파일에서 const createRouter = window.routerType === "browser" ? createBrowserRouter : createHashRouter의
 * 방식으로 작성해봤는데 잘 안 됐음.
 * 고민을 좀 더 해봐야 할 것 같다.
 */

import { renderLoginPage } from "./pages/renderLoginPage";
import { renderMainPage } from "./pages/renderMainPage";
import { renderProfilePage } from "./pages/renderProfilePage";
import { createBrowserRouter } from "./utils/createBrowserRouter";
import { createHashRouter } from "./utils/createHashRouter";

console.log(window.isHashRouter);

const createRouter = window.isHashRouter
  ? createHashRouter
  : createBrowserRouter;

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

// render: () => {
//   const template = /* HTML */ `
//     <div>
//       <nav>
//         <ul>
//           <li><a href="/">Main</a></li>
//           <li><a href="/profile">Profile</a></li>
//           <li><a href="/login">Login</a></li>
//         </ul>
//       </nav>
//       <br />
//       <hr />
//       <br />
//       <div>Main</div>
//     </div>
//   `;

//   const $root = document.querySelector("#root");
//   $root.innerHTML = template;
// }
