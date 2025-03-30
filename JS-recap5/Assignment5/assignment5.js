import { apiUrl } from "./variables.js";
import { fetchData } from "./utils.js";
import { restaurantRow, restaurantModal } from "./components.js";

let restaurants = [];
let filteredRestaurants = [];

const getRestaurants = async () => {
  try {
    const fetchedRestaurants = await fetchData(`${apiUrl}/restaurants`);
    restaurants = fetchedRestaurants;
    filteredRestaurants = [...restaurants];
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    document.querySelector(".error-message").textContent =
      "Failed to load restaurants. Please try again later.";
  }
};

const getDailyMenu = async (id, lang) => {
  try {
    return await fetchData(`${apiUrl}/restaurants/daily/${id}/${lang}`);
  } catch (error) {
    console.error("Error fetching menu:", error);
    return { courses: [] };
  }
};

const filterRestaurants = (company) => {
  filteredRestaurants =
    company === "all"
      ? [...restaurants]
      : restaurants.filter((restaurant) => restaurant.company === company);

  updateRestaurantDisplay();
};

const updateRestaurantDisplay = () => {
  const taulu = document.querySelector("table");
  taulu.innerHTML = "";

  filteredRestaurants
    .sort((a, b) => (a?.name ?? "").localeCompare(b?.name ?? ""))
    .forEach((restaurant) => {
      const row = restaurantRow(restaurant);
      taulu.appendChild(row);
    });
};

// Näytä ravintolat (array) aakkosjärjestyksessä, nimet ja osoitteet
const main = async () => {
  // Lisää filter napit
  document.body.insertAdjacentHTML(
    "beforebegin",
    `
    <div class="filter-buttons">
      <button onclick="window.filterRestaurants('all')">All Restaurants</button>
      <button onclick="window.filterRestaurants('Sodexo')">Sodexo Only</button>
      <button onclick="window.filterRestaurants('Compass Group')">Compass Group Only</button>
    </div>
    <div class="error-message"></div>
  `
  );

  window.filterRestaurants = filterRestaurants;

  await getRestaurants();
  updateRestaurantDisplay();

  const taulu = document.querySelector("table");

  taulu.addEventListener("click", async ({ target }) => {
    const rowElement = target.closest("tr.ravintolat");
    if (!rowElement) return;

    const allRows = taulu.querySelectorAll("tr");
    allRows.forEach((row) => row.classList.remove("highlight"));
    rowElement.classList.add("highlight");

    const name = rowElement.querySelector(".nimi").textContent.trim();
    const address = rowElement.querySelector(".address").textContent.trim();

    const matchingRestaurant = filteredRestaurants.find(
      (restaurant) => restaurant.name === name && restaurant.address === address
    );

    if (matchingRestaurant) {
      const menu = await getDailyMenu(matchingRestaurant._id, "fi");
      const dialog = document.querySelector("dialog");
      dialog.innerHTML = restaurantModal(matchingRestaurant, menu);
      dialog.showModal();
    }
  });
};

main();
