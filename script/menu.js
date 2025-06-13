import { menuList } from "./dom.js";
import { addToCart } from "./cart.js";

export async function loadMenu() {
  try {
    const res = await fetch("menu.json");
    const plats = await res.json();

    plats.forEach((plat) => {
      const card = document.createElement("div");
      card.className =
        "bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center";

      card.innerHTML = `
        <img src="${plat.image}" alt="${plat.name}" class="w-full h-36 object-cover rounded-md mb-4" />
        <h3 class="text-lg font-semibold mb-1">${plat.name}</h3>
        <p class="text-gray-600 mb-2">${plat.price} €</p>
      `;

      const button = document.createElement("button");
      button.textContent = "Ajouter";
      button.className =
        "mt-auto px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition";
      button.addEventListener("click", () =>
        addToCart(plat.id, plat.name, plat.price)
      );

      card.appendChild(button);
      menuList.appendChild(card);
    });
  } catch (e) {
    menuList.innerHTML =
      "<p class='text-red-600 font-semibold'>Erreur de chargement du menu</p>";
  }
}
