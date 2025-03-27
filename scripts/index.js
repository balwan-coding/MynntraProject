let bagItems;
let filteredItems = [];

onLoad();

async function onLoad() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  filteredItems = await fetchItems();
  displayBagIcon();
  setupSearchListener();
  displayItem();
}

function setupSearchListener() {
  let searchInput = document.querySelector(".search_input");
  searchInput.addEventListener("input", () => {
    let searchTerm = searchInput.value.toLowerCase().trim();
    filterItems(searchTerm);
  });
}

function filterItems(searchTerm) {
  if (searchTerm === "") {
    displayItem(items);
    document.querySelector("#msg").innerHTML = "";
  } else {
    let searchedItems = filteredItems.filter((item) => {
      return item.item_name.toLowerCase().includes(searchTerm);
    });

    if (searchedItems.length === 0) {
      document.querySelector("#msg").innerHTML = "No products found";
      displayItem([]);
    } else {
      document.querySelector("#msg").innerHTML = "";
      displayItem(searchedItems);
    }
  }
}

function addToBag(itemId) {
  if (!bagItems.includes(itemId)) {
    bagItems.push(itemId);
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    displayBagIcon();
  }
}

function displayBagIcon() {
  let bagItemCountElement = document.querySelector(".bag-item-count");
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = "visible";
    bagItemCountElement.innerText = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = "hidden";
  }
}

function displayItem(items = filteredItems) {
  let actionContainerElement = document.querySelector(".items-container");
  let innerHTML = "";

  if (!actionContainerElement) {
    return;
  }

  items.forEach((item) => {
    innerHTML += `<div class="card mb-2 text-center" style="width: 18rem;">
  <div style=" background-color: rgb(252, 192, 206);"><img src="${item.image}" alt="${item.item_name}" class="card-img-top" ></div>
  <div class="card-body ">
<div class="rating">
  ${item.rating.stars} ⭐ | ${item.rating.count}
</div>
    <h5 class="card-title">${item.company}</h5>
    <p class="card-text">${item.item_name}</p>
  </div>
  <ul class="d-flex">
    <p class="">${item.current_price}</p>
    <p class=""> ${item.original_price}</p>
    <p class="">(${item.discount_percentage}% OFF)</p>
  </ul>
  <div class="card-body">
<button
   type="button" class="btn btn-primary"
  onclick="addToBag(${item.id}); showAlert('Product added to cart'); runForThreeSeconds();"
>
  Add to Bag
</button>
   </div>
 </div>`;
  });

  actionContainerElement.innerHTML = innerHTML;
}

function runForThreeSeconds() {
  setTimeout(() => {
    let order = document.querySelector("#showAlert");
    order.style.display = "none";
    if (order) {
      order.innerHTML = "";
    }
  }, 2000);
}

function showAlert(message) {
  let order = document.querySelector("#showAlert");
  order.innerHTML = `<p><span class="showOrder-span">✔</span> ${message}.</p>`;
  order.style.display = "block";
}

function toggleMode() {
  let btn = document.querySelector(".toggle-img");
  let isDarkMode = document.body.classList.toggle("dark-mode");

  document
    .querySelectorAll("header, main, footer, .footer_container, .sidebar")
    .forEach((section) => {
      section.classList.toggle("dark-mode");
    });

  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");

  btn.src = isDarkMode
    ? "/MyntraClone/svg/sun.svg"
    : "/MyntraClone/svg/moon.svg";
}

window.onload = function () {
  let savedMode = localStorage.getItem("darkMode");

  if (savedMode === "enabled") {
    document.body.classList.add("dark-mode");
    document
      .querySelectorAll("nav, main, footer,.footer_container, .card, a")
      .forEach((section) => {
        section.classList.add("dark-mode");
      });

    document.querySelector(".toggle-img").src = "/MyntraClone/svg/sun.svg";
  }
};
