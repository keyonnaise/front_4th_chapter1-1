function renderFooter() {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = buildHTML();

  return tempDiv.innerHTML;
}

function buildHTML() {
  return /* HTML */ `
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `;
}

export { renderFooter };