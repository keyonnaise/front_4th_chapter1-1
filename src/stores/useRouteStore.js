import { createStore } from "./createStore";

/**
 * @typedef {import('../router/createBrowserRouter').Route} Route
 */

/**
 * 라우트 스토어 생성
 * @description
 * - 현재 라우트 정보를 관리하는 스토어 생성
 */
export const useRouteStore = createStore((set, get) => ({
  route: null,

  getRoute() {
    const { route } = get();
    return route;
  },

  /**
   * 라우트 설정 함수
   * @param {Route} route - 설정할 라우트 정보
   * @returns {void}
   * @description
   * - 현재 라우트 정보를 업데이트
   */
  setRoute(route) {
    set((prev) => ({ ...prev, route }));
  },
}));
