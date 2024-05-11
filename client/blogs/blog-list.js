import { createBlogPostElement } from "../utils/createBlogPostElement.js";
const baseUrl =
  "https://cors.noroff.dev/https://www.trailblaze-jackets.no/wp-json/wp/v2/posts";

let pageCount = 1;

const blogListSection = document.querySelector(".blog-list-section");
const blogList = document.querySelector(".blog-list");
const loader = document.querySelector(".loader");
const searchBarWrapper = document.querySelector(".search-bar-wrapper");

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

    createFilterBar(posts);
    showBlogPosts(posts);

    const nextPageResponse = await fetch(getUrlWithPageCount(pageCount + 1));

    if (!nextPageResponse.ok) {
      moreBlogsButton.remove();
    } else {
      blogListSection.appendChild(moreBlogsButton);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  } 
}

function showBlogPosts(posts) {
  blogList.innerHTML = "";

  for (let post of posts) {
    const postId = post.id;
    const posthref = `./specificBlog/blog.html?id=${postId}`;

    const blogPostElement = createBlogPostElement(post, posthref);

    blogList.appendChild(blogPostElement);
  }
  loader.classList.remove("loader");
}

function searchPosts(posts, searchInput) {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredPosts = posts.filter(post => post.title.rendered.toLowerCase().includes(searchTerm));
  showBlogPosts(filteredPosts);
}

function createFilterBar(posts) {
  const filterBar = document.createElement("input");

  filterBar.classList.add("filter-bar");
  filterBar.setAttribute("type", "text");
  filterBar.setAttribute("placeholder", "Search for a blog post...");
  searchBarWrapper.appendChild(filterBar);
  
  const searchInput = document.querySelector('.filter-bar');
  searchInput.addEventListener('input', function() {
    searchPosts(posts, searchInput);
  });
}

fetchBlogPosts(getUrlWithPageCount());
