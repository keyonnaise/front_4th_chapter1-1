import { useUserStore } from "../stores/useUserStore";

function renderHeader() {
  const { getUser, removeUser } = useUserStore();
  const user = getUser();

  const $root = document.querySelector("#root");

  $root.addEventListener("click", (e) => {
    if (e.target.id === "logout") {
      removeUser();
    }
  });

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = buildHTML();

  const $menu = tempDiv.querySelector("#menu");

  const items = user
    ? [
        { id: "home", pathname: "/" },
        { id: "profile", pathname: "/profile" },
        { id: "logout", pathname: "/login" },
      ]
    : [
        { id: "home", pathname: "/" },
        { id: "login", pathname: "/login" },
      ];

  const itemNameMap = {
    home: "홈",
    profile: "프로필",
    login: "로그인",
    logout: "로그아웃",
  };

  $menu.innerHTML = items
    .map(({ id, pathname }) => {
      return `<li><a id="${id}" class="${pathname === window.location.pathname || "" ? "text-blue-600 font-bold" : "text-gray-600"}" href="${pathname}">${itemNameMap[id]}</a></li>`;
    })
    .join("");

  return tempDiv.innerHTML;
}

function buildHTML() {
  return /* HTML */ `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul id="menu" class="flex justify-around"></ul>
    </nav>
  `;
}

export { renderHeader };
