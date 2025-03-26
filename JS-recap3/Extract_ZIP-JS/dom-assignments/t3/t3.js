// Näytä selaimen tiedot #target kohdassa

// Selaimen nimi ja versio
// OS
// näytön width ja height
// Available screen space selaimessa
// Päivämäärä ja aika (suomi)
// Jokainen näistä omaan <p> elementtiin

const target = document.getElementById('target');

const nameAndVersion = navigator.userAgent;

const screenWidth = window.screen.width;

const screenHeight = window.screen.height;

const availableWidth = window.innerWidth;

const availableHeight = window.innerHeight;

const date = new Date();
const fiDate = date.toLocaleString('fi', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});

target.innerHTML = `
<p>Selain, versio, OS ja muuta: ${nameAndVersion}</p>
<p>Näytön leveys: ${screenWidth}</p>
<p>Näytön korkeus: ${screenHeight}</p>
<p>Saatavilla oleva leveys: ${availableWidth}</p>
<p>saatavilla oleva korkeus: ${availableHeight}</p>
<p>päivämäärä: ${fiDate}</p>
`;
