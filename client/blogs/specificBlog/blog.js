const baseUrl =
  "https://cors.noroff.dev/https://www.trailblaze-jackets.no/wp-json/wp/v2/posts";

const locationString = document.location.search;
const params = new URLSearchParams(locationString);
const idCall = params.get("id");

const urlWithId = `${baseUrl}/${idCall}`;

const blogPostSection = document.querySelector(".blog-section");

async function fetchPost(url) {
  try {
    const response = await fetch(url);
    const post = await response.json();
    showBlogPost(post);
    console.log(post);
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

function showBlogPost(blogPost) {
  blogPostSection.innerHTML = "";

  blogPostSection.innerHTML += `
    <div class="blog-post">
      <h2>${blogPost.title.rendered}</h2>
      <img class='blog-image' src="${blogPost.jetpack_featured_media_url}" alt="${blogPost.title.rendered}">
      <p>${blogPost.content.rendered}</p>
    </div>
    <div id="myModal" class="modal">
      <img class="modal-content" id="modalImage" />
    </div>`;

  const blogImg = document.querySelector(".blog-image");
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("modalImage");

  blogImg.addEventListener("click", function () {
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modalImg.src = this.src;
  });

  modal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  modalImg.addEventListener("click", function (event) {
    event.stopPropagation();
  });
}

fetchPost(urlWithId);
