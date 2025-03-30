export const restaurantRow = ({ name, address }) => {
  const row = document.createElement("tr");
  row.classList.add("ravintolat");
  row.innerHTML = `
    <td class="nimi">${name}</td>
    <td class="address">${address}</td>
  `;
  return row;
};

export const restaurantModal = (restaurant, { courses = [] }) => {
  const { name, address, postalCode, city, phone, company } = restaurant;
  const menuHtml = courses.length
    ? createMenuHtml(courses)
    : '<p class="error-message">Menun lataus epäonnistui. Yritä myöhemmin uudelleen.</p>';

  return `
    <h2 id="otsikko">${name}</h2>
    <div id="info">
      Osoite: ${address} <br>
      Postinumero: ${postalCode} <br>
      Kaupunki: ${city} <br>
      Puh: ${phone} <br>
      Yritys: ${company} <br>
      <strong>Päivän menu:</strong> <br><br>
      ${menuHtml}
      <br><strong>Paina ESC sulkeaksesi ikkunan</strong>
    </div>
  `;
};

const createMenuHtml = (courses) => {
  return courses.reduce(
    (html, { name, price, diets }) =>
      html +
      `
      <strong>${name}</strong> <br>
      Hinta: ${price} <br>
      Allergeenit: ${diets} <br>
    `,
    ""
  );
};
