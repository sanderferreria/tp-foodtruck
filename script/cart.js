import { cartList, totalEl, btnOrder } from "./dom.js";

export let cart = [];

export function addToCart(id, name, price) {
  const item = cart.find((p) => p.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  updateCart();
}

export function changeQuantity(id, delta) {
  const item = cart.find((p) => p.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((p) => p.id !== id);
  }
  updateCart();
}

export function updateCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className =
      "flex justify-between items-center bg-white p-3 rounded shadow";

    const info = document.createElement("div");
    info.innerHTML = `
      <p class="font-semibold">${item.name}</p>
      <p class="text-sm text-gray-600">x${item.qty} - ${(
      item.price * item.qty
    ).toFixed(2)} €</p>
    `;

    const actions = document.createElement("div");
    actions.className = "flex items-center gap-2";

    const btnMinus = document.createElement("button");
    btnMinus.textContent = "-";
    btnMinus.className =
      "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600";
    btnMinus.addEventListener("click", () => changeQuantity(item.id, -1));

    const btnPlus = document.createElement("button");
    btnPlus.textContent = "+";
    btnPlus.className =
      "px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700";
    btnPlus.addEventListener("click", () => changeQuantity(item.id, 1));

    actions.appendChild(btnMinus);
    actions.appendChild(btnPlus);

    div.appendChild(info);
    div.appendChild(actions);
    cartList.appendChild(div);
  });

  totalEl.textContent = `Total : ${total.toFixed(2)}€`;
  btnOrder.disabled = cart.length === 0;

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function loadCartFromStorage() {
  const data = localStorage.getItem("cart");
  if (data) {
    cart = JSON.parse(data);
    updateCart();
  }
}

export function saveToHistory(currentCart) {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  history.push({
    date: new Date().toLocaleString(),
    items: currentCart,
  });
  localStorage.setItem("history", JSON.stringify(history));
}
