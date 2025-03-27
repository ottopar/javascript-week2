// Post request URL https://reqres.in/api/users JSON:illa käyttäjästä (nimi ja työ)
// console log

async function sendData() {
  const userData = {
    body: JSON.stringify({
      nimi: "Heikki",
      tyo: "Ohjelmoija",
    }),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const response = await fetch("https://reqres.in/api/users", userData);
    if (!response.ok) throw new Error("Invalid input!");
    const json = await response.json();
    console.log("result", json);
  } catch (e) {
    console.log("error", e);
  }
}

sendData();
