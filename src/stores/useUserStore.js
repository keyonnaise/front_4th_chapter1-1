import { storage } from "../utils/storage";
import { createStore } from "./createStore";

/**
 * 사용자 정보 타입
 * @typedef {object} User
 * @property {string} username - 사용자 이름
 * @property {string} email - 사용자 이메일 주소
 * @property {string} bio - 사용자 자기소개
 */

/**
 * 사용자 정보 스토어 생성
 * @description
 * - 사용자 정보를 관리하는 스토어를 생성
 * - 로컬 스토리지와 연동하여 사용자 정보를 저장하고 불러옴
 */
export const useUserStore = createStore((set, get) => ({
  user: null,

  /**
   * 현재 사용자 정보 반환
   * @returns {User | null} 현재 사용자 정보 또는 null
   * @description
   * - 현재 스토어에 저장된 사용자 정보를 반환
   */
  getUser() {
    const { user } = get();
    return user;
  },

  /**
   * 사용자 정보 설정 및 로컬 스토리지 저장
   * @param {User} user - 설정할 사용자 정보
   * @returns {void}
   * @description
   * - 새로운 사용자 정보를 설정하고, 로컬 스토리지에 저장
   */
  setUser(user) {
    storage.setItem("user", user);
    set((prev) => ({ ...prev, user }));
  },

  /**
   * 사용자 정보 제거 및 로컬 스토리지 삭제
   * @returns {void}
   * @description
   * - 사용자 정보를 null로 설정하고, 로컬 스토리지에서 삭제
   */
  removeUser() {
    storage.removeItem("user");
    set((prev) => ({ ...prev, user: null }));
  },
}));
