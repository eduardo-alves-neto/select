const data = [
  { description: "Teste1", value: 1 },
  { description: "Teste2", value: 2 },
  { description: "Teste3", value: 3 },
  { description: "Teste4", value: 4 },
  { description: "Teste5", value: 5 },
];

const dropdowns = document.querySelectorAll(".dropdown");
const viewJsonValue = document.querySelector(".select-viewJson pre code");

dropdowns.forEach((dropdown) => {
  const menu = dropdown.querySelector(".menu");

  //mock de dados
  data.forEach((item) => {
    const option = document.createElement("li");
    option.innerText = item.description;
    option.setAttribute("data-value", item.value);
    menu.appendChild(option);
  });

  //
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");

  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.getAttribute("data-value");
      const description = option.innerText;
      const viewJson = { value, description };
      viewJsonValue.innerText = JSON.stringify(viewJson);

      selected.innerText = option.innerText;
      selected.classList.add("text-fade-in");

      setTimeout(() => {
        selected.classList.remove("text-fade-in");
      }, 300);

      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");

      options.forEach((option) => {
        option.classList.remove("active");
      });

      option.classList.add("active");
    });
  });

  //quando o user clicar fora do select ele fecha
  window.addEventListener("click", (e) => {
    const size = dropdown.getBoundingClientRect();

    if (
      e.clientX < size.left ||
      e.clientX > size.right ||
      e.clientY < size.top ||
      e.clientY > size.bottom
    ) {
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
    }
  });
});
