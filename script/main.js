import { loadMenu } from "./menu.js";
import { loadCartFromStorage, saveToHistory, cart } from "./cart.js";
import { showCartPreview } from "./preview.js";
import { startOrderProgress } from "./delivery.js";
import { showToast } from "./toast.js";
import { btnOrder, btnValidate, btnCancel, recapModal } from "./dom.js";

const historyModal = document.getElementById("history-modal");
const historyList = document.getElementById("history-list");
const closeHistoryBtn = document.getElementById("close-history");
const btnHistory = document.getElementById("btn-history");

loadCartFromStorage();
loadMenu();

btnOrder.addEventListener("click", showCartPreview);

btnCancel.addEventListener("click", () => {
  recapModal.classList.add("hidden");
});

btnValidate.addEventListener("click", () => {
  recapModal.classList.add("hidden");
  saveToHistory(cart);
  localStorage.removeItem("cart");
  showToast("Votre commande a bien été envoyée !");
  startOrderProgress();
});

btnHistory.addEventListener("click", showHistory);
closeHistoryBtn.addEventListener("click", () => {
  historyModal.classList.add("hidden");
});

function showHistory() {
  historyList.innerHTML = "";
  const raw = localStorage.getItem("history");
  const data = raw ? JSON.parse(raw) : [];

  if (data.length === 0) {
    historyList.innerHTML =
      "<li class='text-gray-500'>Aucune commande pour l’instant.</li>";
  } else {
    data.forEach((order) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="border p-2 rounded bg-gray-100">
          <p class="text-xs text-gray-500">${order.date}</p>
          <ul class="ml-4 list-disc">
            ${order.items.map((i) => `<li>${i.name} x${i.qty}</li>`).join("")}
          </ul>
        </div>
      `;
      historyList.appendChild(li);
    });
  }

  historyModal.classList.remove("hidden");
}
