document.getElementById("fetch-button").addEventListener("click", fetchData);
document.getElementById("bitcoin").addEventListener("click", fetchBitcoin);

const inputField = document.querySelector('#inputField');
const typeField = document.querySelector('#type');
const nameField = document.querySelector('#name');



async function fetchData(limit, type, name) {
  renderLoadingState();

  console.log(inputField.value)
  limit = await inputField.value;
  type = await typeField.value;
  name = await nameField.value;

  try {
    const limitResponse = await fetch(`https://api.jikan.moe/v4/anime?limit=${limit}&type=${type}&q=${name}`);

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

  try{
    const bitcoinResponse = await fetch(`https://api.jikan.moe/v4/anime?limit=${limit}&type=${type}&q=${name}`);

    console.log (bitcoinResponse + "bit")

    if (!bitcoinResponse.ok) {
      throw new Error("Network response was not ok");
    }
    const dataBitcoin= await bitcoinResponse.json();
    renderResults(dataBitcoin);
    
  } catch (error) {
    console.log(error)
    renderErrorState();
  }
}

async function fetchBitcoin() {
  renderLoadingState();

  console.log("bitcoin")
  try{
    const bitcoinResponse = await fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`);

    console.log (bitcoinResponse + "bit")

    if (!bitcoinResponse.ok) {
      throw new Error("Network response was not ok");
    }
    const dataBitcoin= await bitcoinResponse.json();
    renderResultsBitcoin(dataBitcoin);
    
  } catch (error) {
    console.log(error)
    renderErrorState();
  }
}

function renderErrorState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; 
  container.innerHTML = "<p>Failed to load data</p>";
  console.log("Failed to load data");
}

function renderLoadingState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; 
  container.innerHTML = "<p>Loading...</p>";
  console.log("Loading...");
}

function renderResultsBitcoin(data) {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; 

  data.forEach(item => {
    const div = document.createElement("div");
    console.log("DIANA");
    div.className = "item";
    div.innerHTML = `<h1>${data.item.bpi}</h1>`;
    container.appendChild(div);
  });
}

const renderResults = (data) => {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; 

  data.data.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<img src="${item.images.jpg.image_url}" alt="${item.title}">`;
    container.appendChild(div);
  });
}