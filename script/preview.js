import { cart } from "./cart.js";
import { recapList, recapTotal, recapModal } from "./dom.js";

export function showCartPreview() {
  recapList.innerHTML = "";
  let total = 0;
  let totalHT = 0;

  cart.forEach((item) => {
    const lineHT = (item.price * item.qty) / 1.2;
    total += item.price * item.qty;
    totalHT += lineHT;

    const li = document.createElement("div");
    li.className = "flex justify-between text-sm py-1 border-b border-gray-200";

    li.innerHTML = `
      <span class="text-gray-700">${item.name} x${item.qty}</span>
      <span class="text-gray-900 font-medium text-right">
        ${(item.price * item.qty).toFixed(2)} €<br>
        <span class="text-xs text-gray-500">(HT: ${lineHT.toFixed(2)} €)</span>
      </span>
    `;

    recapList.appendChild(li);
  });

  const qrText = cart.map((item) => `${item.name} x${item.qty}`).join(", ");
  const qrURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    // désolé..
    "https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1"
  )}&size=150x150`;

  const qrContainer = document.createElement("div");
  qrContainer.className = "flex justify-center mt-4";

  const qrImage = document.createElement("img");
  qrImage.src = qrURL;
  qrImage.alt = "QR Code de la commande";
  qrImage.className = "w-32 h-32";

  qrContainer.appendChild(qrImage);
  recapList.appendChild(qrContainer);

  const tva = total - totalHT;
  recapTotal.innerHTML = `
    <div class="mt-4 space-y-1 text-sm text-gray-700">
      <div class="flex justify-between">
        <span class="font-medium">Prix HT :</span>
        <span>${totalHT.toFixed(2)} €</span>
      </div>
      <div class="flex justify-between">
        <span class="font-medium">TVA (20%) :</span>
        <span>${tva.toFixed(2)} €</span>
      </div>
      <div class="flex justify-between text-base font-bold text-gray-900">
        <span>Total TTC :</span>
        <span>${total.toFixed(2)} €</span>
      </div>
    </div>
  `;

  recapModal.classList.remove("hidden");
}
