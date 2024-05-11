import { createBlogPostElement } from "../utils/createBlogPostElement.js";
const baseUrl =
  "https://cors.noroff.dev/https://www.trailblaze-jackets.no/wp-json/wp/v2/posts";

let pageCount = 1;
let allPosts = [];

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
    const pageSize = 10;
    const response = await fetch(url);
    const posts = await response.json();

    allPosts = allPosts.concat(posts);
    appendBlogPosts(posts);

    // Edge case of there being 10 posts left on the last page. But for the sake of this project and no ability to modify the backend response, I went with this rather than trying to fetch the next page and throwing an error.
    if (posts.length < pageSize) {
      moreBlogsButton.remove();
    } else {
      blogList.appendChild(moreBlogsButton);
    }
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function createFilterBar(posts) {
  const filterBar = document.createElement("input");

  filterBar.classList.add("filter-bar");
  filterBar.setAttribute("type", "text");
  filterBar.setAttribute("placeholder", "Search for a blog post...");
  searchBarWrapper.appendChild(filterBar);

  const searchInput = document.querySelector(".filter-bar");
  searchInput.addEventListener("input", function () {
    searchPosts(allPosts, searchInput);
  });
}

function searchPosts(posts, searchInput) {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredPosts = posts.filter((post) =>
    post.title.rendered.toLowerCase().includes(searchTerm)
  );
  showNewBlogPosts(filteredPosts);
}

function showNewBlogPosts(posts) {
  blogList.innerHTML = "";
  appendBlogPosts(posts);
}

function appendBlogPosts(posts) {
  for (let post of posts) {
    const postId = post.id;
    const posthref = `./specificBlog/blog.html?id=${postId}`;

    const blogPostElement = createBlogPostElement(post, posthref);

    blogList.appendChild(blogPostElement);
  }
  loader.classList.remove("loader");
}

fetchBlogPosts(getUrlWithPageCount()).then((posts) => createFilterBar(posts));
