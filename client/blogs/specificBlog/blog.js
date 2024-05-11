const baseUrl =
  "https://cors.noroff.dev/https://www.trailblaze-jackets.no/wp-json/wp/v2/posts";

const locationString = document.location.search;
const params = new URLSearchParams(locationString);
const idCall = params.get("id");

const urlWithId = `${baseUrl}/${idCall}`;

const blogPostSection = document.querySelector(".specific-blog-section");
const loader = document.querySelector(".loader");

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
  document.title = `Fitness Together | ${blogPost.title.rendered}`;
  blogPostSection.innerHTML = "";

  blogPostSection.innerHTML += `
    <h2 class="specific-blog-title">${blogPost.title.rendered}</h2>
    <div class="specific-blog-post">
        ${blogPost.content.rendered}
    </div>
    <div id="myModal" class="modal">
      <img class="modal-content" id="modalImage" />
    </div>`;

  const blogImages = document.querySelectorAll(".specific-blog-section img");
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("modalImage");

  blogImages.forEach((image) => {
    image.addEventListener("click", function () {
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modalImg.src = this.src;
    });
  });

  modal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  modalImg.addEventListener("click", function (event) {
    event.stopPropagation();
  });
  loader.classList.remove("loader");
}

fetchPost(urlWithId);
