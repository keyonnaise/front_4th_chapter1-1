import { router } from "../router/router";
import { useRouteStore } from "../stores/useRouteStore";

export function foundation(
  template,
  { connectedcallback, disconnectedcallback } = {},
) {
  const { subscribe } = useRouteStore();
  const $root = document.querySelector("#root");
  let mounted = false;

  const attachEventListeners = () => {
    $root.addEventListener("click", handleAnchorClick);
  };

  const detachEventListeners = () => {
    $root.removeEventListener("click", handleAnchorClick);
  };

  const unsubscribe = subscribe(() => {
    mounted = !mounted;

    if (mounted) {
      $root.innerHTML = template;

      attachEventListeners();
      connectedcallback?.();
    } else {
      detachEventListeners();
      disconnectedcallback?.();
      unsubscribe();
    }
  });
}

function handleAnchorClick(e) {
  if (e.target.tagName === "A") {
    e.preventDefault();
    router.push(e.target.getAttribute("href"));
  }
}
