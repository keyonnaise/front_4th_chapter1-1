import { router } from "../router";
import { useRouteStore } from "../stores/useRouteStore";

export function renderer(template, { onMount, onUnmount } = {}) {
  const { subscribe } = useRouteStore();
  let mounted = false;

  const unsubscribe = subscribe(({ route }) => {
    const pathname = window.isHashRouter
      ? window.location.hash.slice(1) || "/"
      : window.location.pathname;

    if (route.pathname !== pathname) return;

    mounted = !mounted;

    if (mounted) {
      // 페이지가 mount 됐을 때 실행되는 함수 그룹
      onMount?.();
    } else {
      // 페이지가 unmount 됐을 때 실행되는 함수 그룹
      onUnmount?.();
      unsubscribe();
    }
  });

  const $root = document.querySelector("#root");
  $root.innerHTML = template;
}

function initialize() {
  const $root = document.querySelector("#root");
  $root.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      router.push(e.target.getAttribute("href"));
    }
  });
}

initialize();
