const convenient_fees = 99;

let bagItemObjects = [];
let items = []; // API से आने वाला डेटा

onLoad();

async function onLoad() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];

  // **API से डेटा लाना**
  items = await fetchItems(); // ✅ API से सभी आइटम लोड करें

  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}

function loadBagItemObjects() {
  // **API से लाए गए सभी items में से बैग में मौजूद items को ढूंढना**
  bagItemObjects = bagItems
    .map((itemId) => {
      return items.find((item) => item.id == itemId);
    })
    .filter((item) => item); // **undefined को हटा देता है**
}

function addToBag(itemId) {
  if (!bagItems.includes(itemId)) {
    bagItems.push(itemId);
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
  }
}

function removeFromBag(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}

function displayBagItems() {
  let containerElement = document.querySelector(".bag-items-container");
  let innerHTML = "";

  bagItemObjects.forEach((bagItem) => {
    innerHTML += generateItemHTML(bagItem);
  });

  containerElement.innerHTML = innerHTML;
}

function displayBagSummary() {
  let bagSummaryElement = document.querySelector(".bag-summary");

  let totalMRP = 0;
  let totalDiscount = 0;
  let totalItem = bagItemObjects.length;

  bagItemObjects.forEach((bagItem) => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  let finalPayment = totalMRP - totalDiscount + convenient_fees;

  bagSummaryElement.innerHTML = ` 
    <div class="bag-details-container">
      <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
      <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">₹${totalMRP}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Convenience Fee</span>
        <span class="price-item-value">₹99</span>
      </div>
      <hr>
      <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">₹${finalPayment}</span>
      </div>
    </div>
    <button class="btn-place-order" onclick="runForThreeSeconds(showOrder('Your order will be delivered on Sunday'));">
      PLACE ORDER
    </button>
  `;
}

function generateItemHTML(item) {
  return `<div id="bag-cards" class="card mb-3 text-center" style="width: 18rem">
  <div style=" background-color: rgb(252, 192, 206);"><img src="${item.image}" alt="${item.item_name}" class="card-img-top" ></div>
  <div class="card-body text-center d-flex flex-column ">
    <h5 class="card-title">${item.company}</h5>
    <p class="card-text">${item.item_name}</p>

  <ul class="d-flex text-center flex-column">
    <p class="">${item.current_price}</p>
    <p class="text-cnter"> ${item.original_price}</p>

  </ul>
  <div class="card-body text-center">
        
  <div class="delivery-details">
    Delivery by
    <span class="delivery-details-days">21/04/25</span>
  </div>
</div>
  </div>
<div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
   </div>
 </div>`;
}
