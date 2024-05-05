import { createBlogPostElement } from "../utils/createBlogPostElement.js";
const baseUrl =
  "https://cors.noroff.dev/https://www.trailblaze-jackets.no/wp-json/wp/v2/posts";

let pageCount = 1;

const blogList = document.querySelector(".blog-list");
const loader = document.querySelector(".loader");

function getUrlWithPageCount(page = pageCount) {
  return `${baseUrl}?&page=${page}`;
}

const moreBlogsButton = document.createElement("button");
moreBlogsButton.innerHTML = "Show more...";
moreBlogsButton.classList.add("show-more-button");

moreBlogsButton.addEventListener("click", () => {
  pageCount++;
  moreBlogsButton.remove();
  fetchBlogPosts(getUrlWithPageCount());
});

async function fetchBlogPosts(url) {
  try {
    const response = await fetch(url);
    const posts = await response.json();

    showBlogPosts(posts);

    const nextPageResponse = await fetch(getUrlWithPageCount(pageCount + 1));
    if (!nextPageResponse.ok) {
      moreBlogsButton.remove();
    } else {
      blogList.appendChild(moreBlogsButton);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  } 
}

function showBlogPosts(posts) {
  for (let post of posts) {
    const postId = post.id;
    const posthref = `./specificBlog/blog.html?id=${postId}`;

    const blogPostElement = createBlogPostElement(post, posthref);

    blogList.appendChild(blogPostElement);
  }
  loader.classList.remove("loader");
}

fetchBlogPosts(getUrlWithPageCount());
