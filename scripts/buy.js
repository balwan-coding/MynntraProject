let product = localStorage.getItem("selectedProduct");

if (product) {
  product = JSON.parse(product);
  document.getElementById("product-details").innerHTML = `
        <div class="card d-flex flex-row" style="height: 20rem; width: 70%;">
       <div class="" style="width: 40%;">
          <img src="${product.image}" class="object-fit-cover " alt="${product.item_name}">
       </div>
          <div class="card-body">
            <h5 class="card-title">${product.company}</h5>
            <p class="card-text">${product.item_name}</p>
            <p class="card-text">${product.description}</p>
            <p>Price: ${product.current_price}</p>
            <p>Original Price: ${product.original_price}</p>
            <p>Discount: ${product.discount_percentage}% OFF</p>
            <div class="d-flex justify-content-between">
            <p>Rating: ${product.rating.stars} ⭐ ${product.rating.count}</p>
            <button type="button" class="btn btn-primary" onclick="showAlert('thanks for buy ${product.item_name} your order delivered to Sunday'); runForThreeSeconds()">buy Now</button>
           </div>
          </div>
        </div>`;
} else {
  document.getElementById("product-details").innerHTML =
    "<p>No product found.</p>";
}
