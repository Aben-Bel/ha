const btn = document.querySelector(".btn");
btn.addEventListener("click", generate);

function generate(e) {
  e.preventDefault();
  console.log("generate called");
  const result = [];
  const inputs = document.querySelectorAll("input");
  for (let input of inputs) {
    if (input.checked) {
      const g = input.parentElement.className;
      let n = 11;
      if (g === "grid") {
        n = 11;
      } else if (g === "grid1") {
        n = 7;
      } else {
        n = 5;
      }
      console.log(input.id, n);
      result.push([
        Math.floor((input.id - 1) / n),
        (parseInt(input.id) - 1) % n,
      ]);
    }
  }
  const p = document.querySelector("#result");
  p.textContent = "Result: " + JSON.stringify(result);
  console.log(result);
}
