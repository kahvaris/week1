import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {}

const container = document.createElement("div");
container.setAttribute("class", "container");
container.style.maxWidth = "960px";
container.style.margin = "0 auto";
document.body.appendChild(container);

const metaElement = document.createElement("meta");
metaElement.setAttribute("name", "viewport");
metaElement.setAttribute("content", "width=device-width, initial-scale=1");
document.head.appendChild(metaElement);

createWiki("beagle", container);
createWiki("hound", container);
createWiki("malamute", container);
createWiki("borzoi", container);
createWiki("whippet", container);

function createWiki(breed, container) {
  const wiki = document.createElement("div");
  wiki.setAttribute("class", "wiki-item");
  wiki.style.marginRight = "10px";
  wiki.style.marginLeft = "10px";
  wiki.style.boxShadow = "5px 5px 20px";

  container.appendChild(wiki);

  const header = document.createElement("h1");
  header.setAttribute("class", "wiki-header");
  header.style.textAlign = "center";
  header.innerHTML = breed.charAt(0).toUpperCase() + breed.slice(1);

  const content = document.createElement("div");
  content.setAttribute("class", "wiki-content");
  content.style.padding = "3%";

  wiki.appendChild(header);
  wiki.appendChild(content);

  const p = document.createElement("p");
  p.setAttribute("class", "wiki-text");

  const image = document.createElement("div");
  image.setAttribute("class", "img-container");

  content.appendChild(image);
  content.appendChild(p);

  const img = document.createElement("img");
  img.setAttribute("class", "wiki-img");
  img.setAttribute("width", "100%");

  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then((response) => response.json())
    .then((data) => {
      const imageUrl = data.message;

      img.setAttribute("src", imageUrl);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  image.appendChild(img);

  fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`)
    .then((response) => response.json())
    .then((data) => {
      const summary = data.extract;
      p.textContent = summary;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const mediaQuery = window.matchMedia("(min-width: 600px)");

function handleMediaQueryChange(mediaQuery) {
  if (mediaQuery.matches) {
    const wikiContents = document.querySelectorAll(".wiki-content");
    const imgContainers = document.querySelectorAll(".img-container");
    const textContainers = document.querySelectorAll(".wiki-text");
    wikiContents.forEach((content) => {
      content.style.display = "flex";
      content.style.flexFlow = "row-reverse";
      content.style.padding = "3%";
    });
    imgContainers.forEach((container) => {
      container.style.minWidth = "50%";
      container.style.maxWidth = "50%";
    });
    textContainers.forEach((container) => {
      container.style.minWidth = "50%";
      container.style.maxWidth = "50%";
    });
  } else {
    const wikiContents = document.querySelectorAll(".wiki-content");
    const imgContainers = document.querySelectorAll(".img-container");
    const textContainers = document.querySelectorAll(".wiki-text");
    imgContainers.forEach((container) => {
      container.style.minWidth = "100%";
      container.style.maxWidth = "100%";
    });
    textContainers.forEach((container) => {
      container.style.minWidth = "100";
      container.style.maxWidth = "100";
    });
    wikiContents.forEach((content) => {
      content.style.flexFlow = "column";
      content.style.padding = "3%";
    });
  }
}

handleMediaQueryChange(mediaQuery);
mediaQuery.addEventListener("change", handleMediaQueryChange);
