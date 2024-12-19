/**
 * 상태 관리 스토어 생성
 * @param {function} initializer - 초기 상태 생성 함수 (set, get을 인자로 받음)
 * @returns {function} 스토어 접근 함수 (subscribe 및 상태 포함)
 * @description
 * - 초기 상태를 생성하고, 상태 변경 및 구독 기능을 제공하는 스토어를 생성
 * - `initializer` 함수는 초기 상태를 정의하고, `set`과 `get` 함수를 사용하여 상태를 변경하거나 가져올 수 있음
 */
export function createStore(initializer) {
  const listeners = new Set();
  let state;

  /**
   * 리스너 등록
   * @param {function} listener - 상태 변경 시 실행할 함수
   * @returns {function} 리스너 해제 함수
   * @description
   * - 리스너를 등록하고, 등록 해제 함수를 반환
   */
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  /**
   * 현재 상태 반환
   * @returns {*} 현재 상태
   * @description
   * - 현재 상태를 반환
   */
  const get = () => {
    return state;
  };

  /**
   * 상태 변경 및 리스너 실행
   * @param {*} nextValue - 새로운 상태 또는 상태 변경 함수 (현재 상태를 인자로 받음)
   * @returns {void}
   * @description
   * - 새로운 상태로 상태를 업데이트하고, 등록된 모든 리스너를 실행
   * - newState가 함수인 경우, 현재 상태를 인자로 받아 새로운 상태를 계산
   */
  const set = (nextValue) => {
    const setter = nextValue;
    state = typeof nextValue === "function" ? setter(state) : nextValue;
    listeners.forEach((listener) => listener(state));
  };

  state = initializer(set, get);

  /**
   * 스토어 접근 함수 반환
   * @returns {object} subscribe 함수 및 현재 상태를 포함하는 객체
   * @description
   * - `subscribe` 함수와 현재 상태를 포함하는 객체를 반환하여 외부에서 스토어에 접근할 수 있도록 함
   */
  return () => ({ subscribe, ...state });
}
