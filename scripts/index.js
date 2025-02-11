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
  searchInput.addEventListener("input", function () {
    let searchTerm = searchInput.value.toLowerCase().trim();
    filterItems(searchTerm);
  });
}

function filterItems(searchTerm) {
  if (searchTerm === "") {
    displayItem(); // पूरे `filteredItems` को फिर से दिखाएँ
  } else {
    let searchedItems = filteredItems.filter((item) => {
      return (
        item.item_name.toLowerCase().includes(searchTerm) ||
        item.company.toLowerCase().includes(searchTerm)
      );
    });
    displayItem(searchedItems);
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
    innerHTML += `<div class="item-container">
      <img class="item-image" src="${item.image}" alt="${item.item_name}">
      <div class="rating">
       ${item.rating.stars} ⭐ | ${item.rating.count}
      </div>
      <div class="company-name">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount">(${item.discount_percentage}% OFF)</span>
      </div>
      <div>
      <button class="btn-add-bag" onclick="addToBag(${item.id}); showOrder('Thank you for buying: ${item.item_name} Product added to cart'); runForThreeSeconds();">Buy Now</button>
      <button class="btn-add-bag" onclick="addToBag(${item.id}); showOrder('Product added to cart'); runForThreeSeconds();">Add to Bag</button>
      </div>
    </div>`;
  });

  actionContainerElement.innerHTML = innerHTML;
}

function runForThreeSeconds() {
  setTimeout(() => {
    let order = document.querySelector("#showOder");
    if (order) {
      order.innerHTML = "";
    }
  }, 2000);
}

function showOrder(message) {
  let order = document.querySelector("#showOder");
  order.innerHTML = `<p><span class="showOrder-span">✔</span>${message}.</p>`;
}

function openSidebar() {
  document.getElementById("sidebar").style.left = "0";
}

function closeSidebar() {
  document.getElementById("sidebar").style.left = "-250px";
}

function toggleMode() {
  let btn = document.querySelector(".toggle-btn");
  let isDarkMode = document.body.classList.toggle("dark-mode");

  document
    .querySelectorAll("header, main, footer, .footer_container, .sidebar")
    .forEach((section) => {
      section.classList.toggle("dark-mode");
    });

  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");

  btn.innerHTML = isDarkMode ? "☀️" : "🌙";
}

window.onload = function () {
  let savedMode = localStorage.getItem("darkMode");

  if (savedMode === "enabled") {
    document.body.classList.add("dark-mode");
    document
      .querySelectorAll("header, main, footer, .footer_container, .sidebar")
      .forEach((section) => {
        section.classList.add("dark-mode");
      });

    document.querySelector(".toggle-btn").innerHTML = "☀️";
  }
};
