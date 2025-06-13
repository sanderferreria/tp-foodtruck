import { showToast } from "./toast.js";
import { suiviBloc, etapes } from "./dom.js";

export function startOrderProgress() {
  let commandesEnCours = 1;
  suiviBloc.classList.remove("hidden");

  let i = 0;
  const interval = setInterval(() => {
    if (i >= etapes.length) {
      clearInterval(interval);
      commandesEnCours--;
      showToast("Commande livrée !");

      const last = etapes[etapes.length - 1];
      const circle = last.querySelector(".w-4");
      const title = last.querySelector("p.text-sm");
      if (circle && title) {
        circle.className =
          "w-4 h-4 mt-1 rounded-full bg-green-500 flex-shrink-0 transition-all";
        title.classList.remove("text-blue-600", "text-gray-700");
        title.classList.add("text-green-600", "font-medium");
      }
      return;
    }

    etapes.forEach((li, j) => {
      const circle = li.querySelector(".w-4");
      const title = li.querySelector("p.text-sm");

      if (!circle || !title) return;

      // Reset par défaut
      circle.className =
        "w-4 h-4 mt-1 rounded-full bg-gray-400 flex-shrink-0 transition-all";
      title.classList.remove(
        "text-blue-600",
        "text-green-600",
        "font-semibold"
      );
      title.classList.add("text-gray-700");

      if (j < i) {
        circle.classList.replace("bg-gray-400", "bg-green-500");
        title.classList.replace("text-gray-700", "text-green-600");
        title.classList.add("font-medium");
      } else if (j === i) {
        circle.classList.replace("bg-gray-400", "bg-blue-500");
        circle.classList.add("animate-pulse");
        title.classList.replace("text-gray-700", "text-blue-600");
        title.classList.add("font-semibold");
      } else {
        circle.classList.replace("bg-blue-500", "bg-gray-400");
        circle.classList.replace("bg-green-500", "bg-gray-400");
        circle.classList.remove("animate-pulse");
      }
    });

    i++;
  }, 2000);
}
