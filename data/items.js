async function fetchItems() {
  let response = await fetch("https://dummyjson.com/products");
  let data = await response.json();

  return data.products.map((item) => ({
    id: item.id,
    image: item.thumbnail,
    company: item.category,
    description: item.description,
    item_name: item.title,
    original_price: item.price + 200,
    current_price: item.price,
    discount_percentage: 20,
    rating: {
      stars: item.rating,
      count: item.stock,
    },
  }));
}
