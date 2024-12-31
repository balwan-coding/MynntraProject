let bagItems;
let filteredItems = [];

onLoad();

function onLoad() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  filteredItems = [...items];
  displayItem();
  displayBagIcon();
  setupSearchListener();
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
    filteredItems = [...items];
  } else {
    filteredItems = items.filter((item) => {
      return (
        item.item_name.toLowerCase().includes(searchTerm) ||
        item.company.toLowerCase().includes(searchTerm)
      );
    });
  }
  displayItem();
}

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();
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

function displayItem() {
  let actionContainerElement = document.querySelector(".items-container");
  let innerHTML = "";

  if (!actionContainerElement) {
    return;
  }

  filteredItems.forEach((item) => {
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
      <button class="btn-add-bag" onclick="addToBag(${item.id}) ,runForThreeSeconds(showOrder('Thnaku for buy :${item.item_name} Product added to card'));">Buy Now</button>
      <button class="btn-add-bag" onclick="addToBag(${item.id}) ,runForThreeSeconds(showOrder('Product added to card'));">Add to Bag</button>
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

function showOrder(mes) {
  let order = document.querySelector("#showOder");
  order.innerHTML = `<p><span class="showOrder-span">✔</span>${mes}.</p>`;
}

function loadBagItemObjects() {
  bagItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
}
