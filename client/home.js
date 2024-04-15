const baseUrl = "https://cors.noroff.dev/https://www.trailblaze-jackets.no/wp-json/wp/v2/posts";

async function fetchProducts(url) {
  const response = await fetch(url);
  const posts = await response.json();
  console.log(posts);
}

fetchProducts(baseUrl);