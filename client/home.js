import { createBlogPostElement } from "./utils/createBlogPostElement.js";

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

    const postId = post.id;
    const posthref = `./blogs/specificBlog/blog.html?id=${postId}`;

    const blogPostElement = createBlogPostElement(post, posthref);

    latestPostsCarousel.appendChild(blogPostElement);
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
