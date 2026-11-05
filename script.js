/* =================================
   ORFEAS DAKTYLAS
   PROJECTS & SLIDESHOW
================================= */


/* PROJECT DATA */

const projects = [

  {
    title: "Beach",
    cover: "images/beach/cover.jpg",

    photos: [
      "images/beach/01.jpg",
      "images/beach/02.jpg",
      "images/beach/03.jpg",
      "images/beach/04.jpg",
      "images/beach/05.jpg",
      "images/beach/06.jpg",
      "images/beach/07.jpg",
      "images/beach/08.jpg",
      "images/beach/09.jpg",
      "images/beach/10.jpg",
      "images/beach/11.jpg",
      "images/beach/12.jpg"
    ]
  }

  /*
  ADD ANOTHER PROJECT LIKE THIS:

  ,{
    title: "Athens",
    cover: "images/athens/cover.jpg",

    photos: [
      "images/athens/01.jpg",
      "images/athens/02.jpg",
      "images/athens/03.jpg"
    ]
  }

  */

];


/* ELEMENTS */

const projectGrid = document.getElementById("project-grid");

const viewer = document.getElementById("photo-viewer");
const viewerImage = document.getElementById("viewer-image");
const viewerCounter = document.getElementById("viewer-counter");

const closeButton = document.getElementById("viewer-close");
const prevButton = document.getElementById("viewer-prev");
const nextButton = document.getElementById("viewer-next");


/* STATE */

let activeProject = null;
let activePhotoIndex = 0;
let previousFocus = null;


/* COPYRIGHT YEAR */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =================================
   RENDER PROJECTS
================================= */

function renderProjects() {

  if (!projectGrid) return;

  projects.forEach((project, index) => {

    if (!project.cover || !project.photos?.length) return;

    const card = document.createElement("button");

    card.className = "project-card";
    card.type = "button";

    card.setAttribute(
      "aria-label",
      `Open ${project.title} project`
    );


    // PROJECT TITLE

    const title = document.createElement("span");

    title.className = "project-title";
    title.textContent = project.title;


    // COVER IMAGE

    const coverWrap = document.createElement("span");

    coverWrap.className = "project-cover-wrap";

    const cover = document.createElement("img");

    cover.className = "project-cover";
    cover.src = project.cover;
    cover.alt = `${project.title} project cover`;
    cover.loading = "lazy";

    coverWrap.appendChild(cover);


    // ADD ELEMENTS

    card.appendChild(title);
    card.appendChild(coverWrap);

    card.addEventListener("click", () => {
      openViewer(index);
    });

    projectGrid.appendChild(card);

  });

}


/* =================================
   OPEN SLIDESHOW
================================= */

function openViewer(projectIndex) {

  const project = projects[projectIndex];

  if (!project || !project.photos?.length || !viewer) return;

  activeProject = project;
  activePhotoIndex = 0;

  previousFocus = document.activeElement;

  showPhoto();

  viewer.classList.add("is-open");

  viewer.setAttribute("aria-hidden", "false");

  document.body.classList.add("viewer-active");

  closeButton?.focus();

}


/* =================================
   DISPLAY PHOTO
================================= */

function showPhoto() {

  if (!activeProject || !viewerImage || !viewerCounter) return;

  const photos = activeProject.photos;

  viewerImage.src = photos[activePhotoIndex];

  viewerImage.alt =
    `${activeProject.title} — photo ${activePhotoIndex + 1}`;

  const current = String(activePhotoIndex + 1).padStart(2, "0");

  const total = String(photos.length).padStart(2, "0");

  viewerCounter.textContent = `${current} / ${total}`;

}


/* =================================
   NEXT / PREVIOUS PHOTO
================================= */

function nextPhoto() {

  if (!activeProject) return;

  activePhotoIndex++;

  if (activePhotoIndex >= activeProject.photos.length) {
    activePhotoIndex = 0;
  }

  showPhoto();

}


function previousPhoto() {

  if (!activeProject) return;

  activePhotoIndex--;

  if (activePhotoIndex < 0) {
    activePhotoIndex = activeProject.photos.length - 1;
  }

  showPhoto();

}


/* =================================
   CLOSE SLIDESHOW
================================= */

function closeViewer() {

  if (!viewer) return;

  viewer.classList.remove("is-open");

  viewer.setAttribute("aria-hidden", "true");

  document.body.classList.remove("viewer-active");

  viewerImage.removeAttribute("src");

  activeProject = null;

  if (previousFocus?.focus) {
    previousFocus.focus();
  }

}


/* =================================
   BUTTON EVENTS
================================= */

closeButton?.addEventListener("click", closeViewer);

nextButton?.addEventListener("click", nextPhoto);

prevButton?.addEventListener("click", previousPhoto);


/* =================================
   KEYBOARD CONTROLS
================================= */

document.addEventListener("keydown", function(event) {

  if (!viewer?.classList.contains("is-open")) return;

  if (event.key === "Escape") {
    closeViewer();
  }

  if (event.key === "ArrowRight") {
    nextPhoto();
  }

  if (event.key === "ArrowLeft") {
    previousPhoto();
  }

});


/* START */

renderProjects();