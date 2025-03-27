// async funktio fetchData parametrit url ja options
// fetch api async/await urliin ja options
// Throw error jos response ei onnistu
// return response jos json promise onnistui
`use strict`;

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

async function test() {
  try {
    const user = {
      name: "John Doe",
      job: "Developer",
    };
    const url = "https://reqres.in/api/users";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const userData = await fetchData(url, options);
    console.log(userData);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

test();
