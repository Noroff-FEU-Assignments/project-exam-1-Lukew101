const baseUrl =
  "https://cors.noroff.dev/https://www.trailblaze-jackets.no/wp-json/wp/v2/posts";

let pageCount = 1;

const blogList = document.querySelector(".blog-list");

function getUrlWithPageCount(page = pageCount) {
  return `${baseUrl}?&page=${page}`;
}

const moreBlogsButton = document.createElement("button");
moreBlogsButton.textContent = "Show more blogs";
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
    const postElement = document.createElement("a");
    postElement.href = `./specificBlog/blog.html?id=${post.id}`;
    postElement.classList.add("blog-post");

    const titleElement = document.createElement("h2");
    titleElement.textContent = post.title.rendered;

    const imageElement = document.createElement("img");
    imageElement.alt = post.title.rendered;
    imageElement.classList.add("blog-image");
    imageElement.src = post.jetpack_featured_media_url;

    const contentElement = document.createElement("p");
    contentElement.innerHTML = post.content.rendered;

    postElement.appendChild(titleElement);
    postElement.appendChild(imageElement);
    postElement.appendChild(contentElement);

    blogList.appendChild(postElement);
  }
}

fetchBlogPosts(getUrlWithPageCount());
