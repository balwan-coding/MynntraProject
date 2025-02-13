async function fetchItems() {
  let response = await fetch("https://dummyjson.com/products");
  let data = await response.json();

  return data.products.map((item) => ({
    id: item.id,
    image: item.thumbnail,
    company: item.category,
    item_name: item.title,
    original_price: item.price + 200, // Example: Original price को बढ़ा रहे हैं
    current_price: item.price,
    discount_percentage: 20, // Dummy discount percentage
    rating: {
      stars: item.rating,
      count: item.stock, // स्टॉक को count की तरह यूज़ कर रहे हैं
    },
  }));
}
