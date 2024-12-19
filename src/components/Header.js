import { useRouteStore } from "../stores/useRouteStore";
import { useUserStore } from "../stores/useUserStore";
import { storage } from "../utils/storage";

export const Header = () => {
  const { subscribe } = useRouteStore();
  let mounted = false;

  const unsubscribe = subscribe(({ route }) => {
    mounted = !mounted;

    if (mounted) {
      const { removeUser } = useUserStore();
      const user = storage.getItem("user");

      const $menu = document.querySelector("#menu");

      if (user) {
        const items = [
          { name: "홈", pathname: "/" },
          { name: "프로필", pathname: "/profile" },
          { name: "로그아웃", pathname: "/login" },
        ]
          .map((item) =>
            item.name === "로그아웃"
              ? `<li><a id="logout" class="text-gray-600" href="${item.pathname}">${item.name}</a></li>`
              : `<li><a class="${item.pathname === route.pathname ? "text-blue-600 font-bold" : "text-gray-600"}" href="${item.pathname}">${item.name}</a></li>`,
          )
          .join("");

        $menu.innerHTML = items;
        $menu.addEventListener("click", (e) => {
          if (e.target.id === "logout") {
            removeUser();
          }
        });
      } else {
        const items = [
          { name: "홈", pathname: "/" },
          { name: "로그인", pathname: "/login" },
        ]
          .map(
            (item) =>
              `<li><a class="${item.pathname === route.pathname ? "text-blue-600 font-bold" : "text-gray-600"}" href="${item.pathname}">${item.name}</a></li>`,
          )
          .join("");
        $menu.innerHTML = items;
      }
    } else {
      unsubscribe();
    }
  });

  return /* HTML */ `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul id="menu" class="flex justify-around"></ul>
    </nav>
  `;
};
