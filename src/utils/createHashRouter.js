import { renderErrorPage } from "../pages/renderErrorPage";
import { useRouteStore } from "../stores/useRouteStore";
import { useUserStore } from "../stores/useUserStore";

/**
 * @typedef {object} Route
 * @property {string} pathname - 경로명
 * @property {number} accessLevel - 접근 레벨 (0: 게스트&사용자, 1: 게스트, 2: 사용자)
 * @property {function(): void} render - 경로에 해당하는 UI 렌더링 함수
 */

/**
 * 라우터 생성 함수
 * @param {Route[]} routes - 라우트 배열
 * @returns {{ push: (pathname: string, data?: any) => void }} push 함수를 가진 객체
 * @description
 * - 라우팅 기능을 제공하는 함수
 * - 접근 권한을 확인하고, 주어진 경로에 따라 UI를 렌더링
 */
export function createHashRouter(routes) {
  /**
   * 경로 처리 함수
   * @param {string} pathname - 처리할 경로명
   * @returns {void}
   * @description
   * - 주어진 경로에 해당하는 라우트를 찾아 렌더링
   * - 일치하는 경로가 없을 경우 404 페이지를 렌더링
   * - 접근 권한을 확인하여 미로그인 사용자의 접근을 제한
   */
  const handleRoute = (pathname) => {
    const { getUser } = useUserStore();
    const { setRoute } = useRouteStore();

    const user = getUser();
    let found = routes.find((route) => route.pathname === pathname);

    // 매칭되는 경로가 없을 때
    if (found === undefined) {
      found = {
        pathname,
        accessLevel: 0,
        render: renderErrorPage,
      };
    }

    // 페이지 접근 권한 확인
    if (found.accessLevel === 1 && user) {
      push("/");
      return;
    }

    if (found.accessLevel === 2 && user === null) {
      push("/login");
      return;
    }

    found.render();
    setRoute(found);
  };

  /**
   * 경로 이동 함수
   * @param {string} pathname - 이동할 경로명
   * @returns {void}
   * @description
   * - 주어진 경로로 이동하고, history state를 업데이트
   */
  const push = (pathname) => {
    window.location.hash = `#${pathname}`;
    // handleRoute(pathname);
  };

  /**
   * 초기화 함수
   * @returns {void}
   * @description
   * - popstate 이벤트 리스너를 등록하고, 초기 경로를 처리
   */
  const initialize = () => {
    const pathname = window.location.hash.slice(1) || "/";

    window.addEventListener("hashchange", () => {
      const pathname = window.location.hash.slice(1) || "/";
      handleRoute(pathname);
    });
    window.addEventListener("popstate", (e) => {
      const pathname = window.location.hash.slice(1) || "/";
      e.preventDefault();
      handleRoute(pathname);
    });

    handleRoute(pathname);
  };

  initialize();

  return { push };
}
