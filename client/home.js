const baseUrl =
  "https://cors.noroff.dev/https://www.trailblaze-jackets.no/wp-json/wp/v2/posts";
const latestPostsCarousel = document.querySelector(".latest-posts-carousel");

let posts = [];

const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

let currentIndex = 0;

async function fetchLatestPosts(url) {
  try {
    const response = await fetch(url);
    posts = await response.json();
    showLatestPosts(currentIndex, currentIndex + 10);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function showLatestPosts(startIndex, endIndex) {
  latestPostsCarousel.innerHTML = "";
  for (let i = startIndex; i < endIndex; i++) {
    const postIndex = i % posts.length;
    const post = posts[postIndex];

    const postElement = document.createElement("a");
    postElement.href = `./blogs/specificBlog/blog.html?id=${post.id}`;
    postElement.classList.add("carousel-post");

    const titleElement = document.createElement("h4");
    titleElement.classList.add("carousel-post-title");
    titleElement.textContent = post.title.rendered;

    const imageElement = document.createElement("img");
    imageElement.alt = post.title.rendered;
    imageElement.classList.add("carousel-image");
    imageElement.src = post.jetpack_featured_media_url;

    const contentElement = document.createElement("p");
    contentElement.innerHTML = post.content.rendered;
    contentElement.classList.add("carousel-content");

    const postedDateElement = document.createElement("p");
    const dateTimeArray = post.date.split("T");
    postedDateElement.innerHTML = `Posted on ${dateTimeArray[0]} at ${dateTimeArray[1]}`;

    postElement.appendChild(titleElement);
    postElement.appendChild(imageElement);
    postElement.appendChild(contentElement);
    postElement.appendChild(postedDateElement);

    latestPostsCarousel.appendChild(postElement);
  }
}

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % posts.length;
  showLatestPosts(currentIndex, currentIndex + 10);
});

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + posts.length) % posts.length;
  showLatestPosts(currentIndex, currentIndex + 10);
});

fetchLatestPosts(baseUrl);
