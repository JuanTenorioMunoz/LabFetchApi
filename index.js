document.getElementById("fetch-button").addEventListener("click", fetchData);
const inputField = document.querySelector('#inputField');
const resultsContainer = document.getElementById("results-container");

async function fetchData(limit, query, type) {
  renderLoadingState();
  console.log(inputField.value)
  limit = await inputField.value

  try {
    const limitResponse = await fetch(`https://api.jikan.moe/v4/anime?limit=${limit}`);
    const queryResponse = await fetch(`https://api.jikan.moe/v4/anime?limit=${limit}`);
    const typeResponse = await fetch(`https://api.jikan.moe/v4/anime?limit=${limit}`);

    console.log (limitResponse + "limt")


    if (!limitResponse.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await limitResponse.json();
    renderResults(data);
    
  } catch (error) {
    console.log(error)
    renderErrorState();
  }
}


function renderErrorState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data
  container.innerHTML = "<p>Failed to load data</p>";
  console.log("Failed to load data");
}

function renderLoadingState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data
  container.innerHTML = "<p>Loading...</p>";
  console.log("Loading...");
}

/* function renderData(data) {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data

  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = ` <img src="${data?.data[0]?.images?.jpg?.image_url}" alt="fetchAlt">`;
  console.log("this should trender" + data)
  container.appendChild(div);
} */

/*const renderResults = async (data) => {

  for (let index = 0; index < data.length; index++) {
    console.log(seriesData[index])
    console.log("SOMTHING")
  }
} */

function renderResults(data) {
  const container = resultsContainer;
  container.innerHTML = ""; 

  data.data.forEach(item => {
    const div = document.createElement("div");
    div.className = "anime";
    div.innerHTML = `<img src="${item.images.jpg.image_url}" alt="${item.title}">`;
    container.appendChild(div);
  });
}