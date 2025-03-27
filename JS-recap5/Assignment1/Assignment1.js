// GET metodi. fetch api async/await, tee get request URL https://reqres.in/api/users/1
// console log vastaus

`use strict`;

async function reqresGet() {
  try {
    const response = await fetch("https://reqres.in/api/users/2");

    const jsonData = await response.json();

    console.log(jsonData);
  } catch (error) {
    console.log(error.message);
  }
}

reqresGet();
