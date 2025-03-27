// your code here

// Nyt on erittäin huono versio tästä, tähän ehdottomasti parannuksia ennen kuin palautan

// Array poistettu, käytä AJAX fetchia restaurnt APIsta.

async function fetchData(url, options = {}) {
  const response = await fetch(url, options);

  const json = await response.json();

  if (!response.ok) {
    if (json.message) {
      throw new Error(`${json.message}, koodi:${response.status} !!!!!!!`);
    }
    throw new Error(`Error ${response.status} !!!!`);
  }
  return json;
}

const apiUrl = "https://media2.edu.metropolia.fi/restaurant/api/v1";

let restaurants = [];

const createMenuHtml = (courses) => {
  console.log(courses);
  let html = "";
  for (const { name, price, diets } of courses) {
    html += `

        <strong>${name}</strong>,
        Hinta: ${price},
        Allergeenit: ${diets}

  `;
  }
  return html;
};

async function getRestaurants() {
  try {
    console.log("start");
    const Restaurants = await fetchData(`${apiUrl}/restaurants`);
    console.log(restaurants);
    for (let restaurant of Restaurants) {
      restaurants.push(restaurant);
    }
  } catch (error) {
    console.error(error);
  }
}

async function getDailyMenu(id, lang) {
  try {
    return await fetchData(`${apiUrl}/restaurants/daily/${id}/${lang}`);
  } catch (error) {
    console.error(error);
  }
}

// Näytä ravintolat (array) aakkosjärjestyksessä, nimet ja osoitteet

async function main() {
  await getRestaurants();

  restaurants.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

  const taulu = document.querySelector("table");

  for (let restaurant of restaurants) {
    taulu.insertAdjacentHTML(
      "beforeend",
      `
<tr class="ravintolat">
  <td class="nimi">${restaurant.name}</td>
  <td class="address">${restaurant.address}</td>
</tr>
  `
    );
  }

  // Käytä .highlight, kun klikkaat html elementtiä (classList)
  // kun painaa uutta, poistaa aikaisemmasta highlightin

  taulu.addEventListener("click", async (e) => {
    if (e.target.closest("tr.ravintolat")) {
      console.log("Clicked");
      let allRows = taulu.querySelectorAll("tr");
      allRows.forEach((row) => row.classList.remove("highlight"));
      e.target.closest("tr.ravintolat").classList.add("highlight");

      console.log(e.target.closest("td"));

      const clickedCell = e.target.closest("td");

      const dialog = document.querySelector("dialog");
      dialog.showModal();

      for (const restaurant of restaurants) {
        if (
          clickedCell.textContent.trim() == restaurant.name ||
          clickedCell.textContent.trim() == restaurant.address
        ) {
          const coursesResponse = await getDailyMenu(restaurant._id, "fi");

          const menuHtml = createMenuHtml(coursesResponse.courses);

          document.getElementById("otsikko").innerHTML = restaurant.name;
          document.getElementById("info").innerHTML = `
        Osoite: ${restaurant.address} <br>
        Postinumero: ${restaurant.postalCode} <br>
        Kaupunki: ${restaurant.city} <br>
        Puh: ${restaurant.phone} <br>
        Yritys: ${restaurant.company} <br>
        Päivän ruoka: <br>
        ${menuHtml}

        `;
        }
      }
    }
  });
}

main();
