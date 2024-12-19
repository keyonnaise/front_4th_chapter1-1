/**
 * 로컬 스토리지 또는 폴백 저장소 관리 클래스
 */
class Storage {
  fallbackStorage = {};
  valid = checkLocalStorage();

  /**
   * 항목 저장
   * @param {string} key - 저장할 키
   * @param {*} value - 저장할 값
   */
  setItem(key, value) {
    const string = typeof value === "string" ? value : JSON.stringify(value);
    if (this.valid) {
      localStorage.setItem(key, string);
      return;
    }
    this.fallbackStorage[key] = string;
  }

  /**
   * 항목 반환
   * @param {string} key - 가져올 키
   * @returns {*} 저장된 값 또는 null
   */
  getItem(key) {
    let value = this.valid
      ? localStorage.getItem(key)
      : this.fallbackStorage[key];

    if (!value) return null;

    try {
      const parsed = JSON.parse(value || "");
      return parsed;
    } catch (error) {
      console.log(error);
      return value || null;
    }
  }

  /**
   * 항목 제거
   * @param {string} key - 제거할 키
   */
  removeItem(key) {
    if (this.valid) {
      localStorage.removeItem(key);
      return;
    }
    delete this.fallbackStorage[key];
  }
}

function checkLocalStorage() {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const storage = new Storage();
