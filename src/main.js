import { storage } from "./utils/storage";
import { useUserStore } from "./stores/useUserStore";

window.isHashRouter = false;

/**
 * 앱 초기화
 * @returns {void}
 * @description
 * 1. 로컬 스토리지에서 사용자 정보 가져오기
 *    - 로컬 스토리지에 사용자 정보가 있다면 `userStore`의 `setProfile` 함수를 호출하여 사용자 프로필 설정
 */
(function () {
  const user = storage.getItem("user");

  if (user) {
    const { setUser } = useUserStore();
    setUser(user);
  }
})();

// NOTE: 뭔가 애매르송한 await import
await import("./router");
