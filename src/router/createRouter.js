import { useRouteStore } from "../stores/useRouteStore";
import { useUserStore } from "../stores/useUserStore";
import { renderErrorPage } from "../pages/renderErrorPage";

const BASE_ROUTE_MAP = {
  404: {
    pathname: "*",
    accessLevel: 0,
    render: renderErrorPage,
  },
};

const { getUser } = useUserStore();
const { setRoute } = useRouteStore();

let routes = [];

const createRouter = window.isHashRouter
  ? createHashRouter
  : createBrowserRouter;

function createBrowserRouter(_routes) {
  routes = _routes;

  const initialize = () => {
    window.addEventListener("popstate", (e) => {
      e.preventDefault();
      handleRouteChange(window.location.pathname);
    });
    handleRouteChange(window.location.pathname);
  };

  initialize();

  return { push: navigateTo };
}

function createHashRouter(_routes) {
  routes = _routes;

  const initialize = () => {
    window.addEventListener("hashchange", () => {
      const pathname = window.location.hash.slice(1) || "/";
      handleRouteChange(pathname);
    });

    window.addEventListener("popstate", (e) => {
      e.preventDefault();

      const pathname = window.location.hash.slice(1) || "/";
      handleRouteChange(pathname);
    });

    const pathname = window.location.hash.slice(1) || "/";
    handleRouteChange(pathname);
  };

  initialize();

  return { push: navigateTo };
}

function handleRouteChange(destination) {
  const user = getUser();
  let found = routes.find((route) => route.pathname === destination);

  if (!found) {
    found = BASE_ROUTE_MAP[404];
  }

  if (found.accessLevel === 1 && !onlyGuest(user)) {
    navigateTo("/", (destination) => handleRouteChange(destination));
    return;
  }

  if (found.accessLevel === 2 && !onlyUser(user)) {
    navigateTo("/login", (destination) => handleRouteChange(destination));
    return;
  }

  applyChanges(found);
}

function navigateTo(pathname) {
  if (window.isHashRouter) {
    window.location.hash = `#${pathname}`;
  } else {
    window.history.pushState(null, null, window.location.origin + pathname);
  }

  handleRouteChange(pathname);
}

function applyChanges(route) {
  route.render();
  setRoute(route);
}

function onlyGuest(user) {
  return user === null;
}

function onlyUser(user) {
  return user !== null;
}

export { createRouter };
