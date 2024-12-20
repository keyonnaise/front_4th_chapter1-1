import { router } from "../router/router";
import { useUserStore } from "../stores/useUserStore";
import { foundation } from "./foundation";

function renderLoginPage() {
  const { setUser } = useUserStore();

  foundation(buildHTML(), {
    connectedcallback() {
      const $form = document.querySelector("#login-form");
      let fields = {
        username: "newbie",
        password: "",
        email: "",
        bio: "",
      };

      const handleInput = (e) => {
        fields[e.target.name] = e.target.value;
      };

      const handleSubmit = (e) => {
        e.preventDefault();

        setUser({
          username: fields.username,
          email: fields.email,
          bio: fields.bio,
        });

        router.push("/profile");
      };

      $form.addEventListener("input", handleInput);
      $form.addEventListener("submit", handleSubmit);
    },
  });
}

function buildHTML() {
  return /* HTML */ `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="relative bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">
          항해플러스
        </h1>
        <form id="login-form">
          <div class="mb-4">
            <input
              id="username"
              type="text"
              name="username"
              placeholder="사용자 이름"
              class="w-full p-2 border rounded"
            />
          </div>
          <div class="mb-6">
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              class="w-full p-2 border rounded"
            />
          </div>
          <button
            id="submit"
            type="submit"
            class="w-full bg-blue-600 text-white p-2 rounded font-bold aria-disabled:bg-gray-200"
          >
            로그인
          </button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6" />
        <div class="text-center">
          <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">
            새 계정 만들기
          </button>
        </div>
      </div>
    </main>
  `;
}

export { renderLoginPage };
