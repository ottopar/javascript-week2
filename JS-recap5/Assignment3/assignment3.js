// Error handlingiä fetchillä.
// yritä get requestia ei olemassa olevasta
// handle try/catchilla
// yritä muita metodeja
// console log errorit

async function errorTesting1() {
  const userData = {
    body: JSON.stringify({
      nimi: "Maija",
      tyo: "Poliisi",
    }),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const response = await fetch("https://reqres.in/horses", userData);
    const json = await response.json();
    console.log("result", json);
  } catch (e) {
    console.log("error", e);
  }
}

async function errorTesting2() {
  const userData = {
    body: JSON.stringify({
      nimi: "Maija",
      tyo: "Poliisi",
    }),
    method: "UPDATE",
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const response = await fetch("https://reqres.in/api/users", userData);
    const json = await response.json();
    console.log("result", json);
  } catch (e) {
    console.log("error", e);
  }
}

async function errorTesting3() {
  try {
    const response = await fetch("https://google");

    const jsonData = await response.json();

    console.log(jsonData);
  } catch (error) {
    console.log(error.message);
  }
}

async function errorTesting4() {
  const userData = {
    body: JSON.stringify({
      nimi: "Maija",
      tyo: "Poliisi",
    }),
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const response = await fetch("https://reqres.in/api/users", userData);
    const json = await response.json();
    console.log("result", json);
  } catch (e) {
    console.log("error", e);
  }
}

errorTesting1();
errorTesting2();
errorTesting3();
errorTesting4();
