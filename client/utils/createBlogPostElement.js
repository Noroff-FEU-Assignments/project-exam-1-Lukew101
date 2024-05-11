export const createBlogPostElement = (post, href) => {
  const postElement = document.createElement("a");
  postElement.href = `${href}`;
  postElement.classList.add("blog-post");

  const titleElement = document.createElement("h2");
  titleElement.classList.add("blog-post-title");
  titleElement.textContent = post.title.rendered;

  const imageElement = document.createElement("img");
  imageElement.alt = post.title.rendered;
  imageElement.classList.add("blog-post-image");
  imageElement.src = post.jetpack_featured_media_url;

  const contentElement = document.createElement("div");
  contentElement.innerHTML = post.excerpt.rendered;
  contentElement.classList.add("blog-post-content");

  const postedDateElement = document.createElement("p");
  postedDateElement.classList.add("blog-post-date");
  const dateTimeArray = post.date.split("T");
  postedDateElement.innerHTML = `Posted ${dateTimeArray[0]} at ${dateTimeArray[1]}`;

  postElement.appendChild(titleElement);
  postElement.appendChild(imageElement);
  postElement.appendChild(contentElement);
  postElement.appendChild(postedDateElement);

  return postElement;
};
