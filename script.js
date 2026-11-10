/* =================================
   ORFEAS DAKTYLAS
   PROJECTS & SLIDESHOW
================================= */


/* PROJECT DATA */

const projects = [

  {
    title: "MEMORY LOST",
    cover: "/photos/MEMORY LOST_05.jpg",

    photos: [
      "/photos/MEMORY LOST_01.jpg",
      "/photos/MEMORY LOST_02.jpg",
      "/photos/MEMORY LOST_03.jpg",
      "/photos/MEMORY LOST_04.jpg",
      "/photos/MEMORY LOST_05.jpg",
      "/photos/MEMORY LOST_06.jpg",
      "/photos/MEMORY LOST_07.jpg",
      "/photos/MEMORY LOST_08.jpg",
      "/photos/MEMORY LOST_09.jpg",
      "/photos/MEMORY LOST_10.jpg",
      "/photos/MEMORY LOST_11.jpg",
      "/photos/MEMORY LOST_12.jpg",
      "/photos/MEMORY LOST_13.jpg",
      "/photos/MEMORY LOST_14.jpg",
      "/photos/MEMORY LOST_15.jpg",
      "/photos/MEMORY LOST_16.jpg",
      "/photos/MEMORY LOST_17.jpg",
      "/photos/MEMORY LOST_18.jpg",
      "/photos/MEMORY LOST_19.jpg",
      "/photos/MEMORY LOST_20.jpg",
      "/photos/MEMORY LOST_21.jpg",
      "/photos/MEMORY LOST_22.jpg",
      "/photos/MEMORY LOST_23.jpg",
      "/photos/MEMORY LOST_24.jpg",
      "/photos/MEMORY LOST_25.jpg",
      "/photos/MEMORY LOST_26.jpg",
      "/photos/MEMORY LOST_27.jpg",
      "/photos/MEMORY LOST_28.jpg",
      "/photos/MEMORY LOST_29.jpg",
      
    ]
  }


,{
  title: "XX",
  cover: "/photos/XX_15.jpg",

  photos: [
    "/photos/XX_01.jpg",
    "/photos/XX_02.jpg",
    "/photos/XX_03.jpg",
    "/photos/XX_04.jpg",
    "/photos/XX_05.jpg",
    "/photos/XX_06.jpg",
    "/photos/XX_07.jpg",
    "/photos/XX_08.jpg",
    "/photos/XX_09.jpg",
    "/photos/XX_10.jpg",
    "/photos/XX_11.jpg",
    "/photos/XX_12.jpg",
    "/photos/XX_13.jpg",
    "/photos/XX_14.jpg",
    "/photos/XX_15.jpg",
    "/photos/XX_16.jpg",
    "/photos/XX_17.jpg",

  ]
}
,{
  title: "HELLO...GOODBYE",
  cover: "/photos/HELLO...GOODBYE_08.jpg",

  photos: [
    "photos/HELLO...GOODBYE_01.jpg",
    "photos/HELLO...GOODBYE_02.jpg",
    "photos/HELLO...GOODBYE_03.jpg",
    "photos/HELLO...GOODBYE_04.jpg",
    "photos/HELLO...GOODBYE_05.jpg",
    "photos/HELLO...GOODBYE_06.jpg",
    "photos/HELLO...GOODBYE_07.jpg",
    "photos/HELLO...GOODBYE_08.jpg",
    "photos/HELLO...GOODBYE_09.jpg",
    "photos/HELLO...GOODBYE_10.jpg",
    "photos/HELLO...GOODBYE_11.jpg",
    "photos/HELLO...GOODBYE_12.jpg",
    "photos/HELLO...GOODBYE_13.jpg",
    "photos/HELLO...GOODBYE_14.jpg",
    "photos/HELLO...GOODBYE_15.jpg",
    "photos/HELLO...GOODBYE_16.jpg",
  ]
}
,{
  title: "Untitled",
  cover: "photos/UNTITLED_06.jpg",

  photos: [
    "photos/UNTITLED_01.jpg",
    "photos/UNTITLED_02.jpg",
    "photos/UNTITLED_03.jpg",
    "photos/UNTITLED_04.jpg",
    "photos/UNTITLED_05.jpg",
    "photos/UNTITLED_06.jpg",
    "photos/UNTITLED_07.jpg",
    "photos/UNTITLED_08.jpg",
    "photos/UNTITLED_09.jpg",
    "photos/UNTITLED_10.jpg",
    "photos/UNTITLED_11.jpg",
    "photos/UNTITLED_12.jpg",
    "photos/UNTITLED_13.jpg"
  ]
}
]


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