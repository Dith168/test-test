// Fade In Animation
const elements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

elements.forEach((el) => observer.observe(el));

// Popup Functions
function openPopup() {
  document.getElementById("social-popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("social-popup").style.display = "none";
}

// Close popup when clicking outside
window.addEventListener("click", (e) => {
  const popup = document.getElementById("social-popup");

  if (e.target === popup) {
    closePopup();
  }
});

// ESC key closes popup
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePopup();
  }
});

const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "bf39d3a7-4fb2-4b0e-bebc-effbd06f660d");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Professional Lightbox Gallery

const galleryImages =
  document.querySelectorAll(
    ".project-item img"
  );

const lightbox =
  document.getElementById("lightbox");

const lightboxImg =
  document.getElementById("lightbox-img");

const prevBtn =
  document.querySelector(".prev-btn");

const nextBtn =
  document.querySelector(".next-btn");
  const zoomInBtn =
  document.getElementById("zoom-in");

const zoomOutBtn =
  document.getElementById("zoom-out");

const zoomResetBtn =
  document.getElementById("zoom-reset");

let currentIndex = 0;

// Open
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    lightbox.style.display = "flex";
  });
});

// Show image
function showImage() {
  lightboxImg.src =
  galleryImages[currentIndex].getAttribute("src");

  scale = 1;
  posX = 0;
  posY = 0;

  updateTransform();
}

// Next
nextBtn.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex >= galleryImages.length) {
    currentIndex = 0;
  }

  showImage();
});

// Previous
prevBtn.addEventListener("click", () => {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex =
      galleryImages.length - 1;
  }

  showImage();
});

// Close button
document
  .querySelector(".close-lightbox")
  .addEventListener("click", () => {
    lightbox.style.display = "none";
  });

// Click outside
lightbox.addEventListener("click", (e) => {

  if (e.target === lightbox) {
    lightbox.style.display = "none";
    return;
  }

});

// Keyboard
document.addEventListener("keydown", (e) => {

  if (lightbox.style.display !== "flex")
    return;

  if (e.key === "ArrowRight") {
    nextBtn.click();
  }

  if (e.key === "ArrowLeft") {
    prevBtn.click();
  }

  if (e.key === "Escape") {
    lightbox.style.display = "none";
  }
});



zoomInBtn.addEventListener("click", () => {
  scale += 0.2;
  updateTransform();
});

zoomOutBtn.addEventListener("click", () => {
  scale = Math.max(1, scale - 0.2);
  updateTransform();
});

zoomResetBtn.addEventListener("click", () => {
  scale = 1;
  posX = 0;
  posY = 0;
  updateTransform();
});



let scale = 1;
let posX = 0;
let posY = 0;
let isDragging = false;
let startX;
let startY;

const imageContainer = document.querySelector(".image-container");

// Apply transform
function updateTransform() {
  lightboxImg.style.transform =
    `translate(${posX}px, ${posY}px) scale(${scale})`;
}

// Mouse Wheel Zoom
imageContainer.addEventListener("wheel", (e) => {
  e.preventDefault();

  if (e.deltaY < 0) {
    scale += 0.1;
  } else {
    scale -= 0.1;
  }

  scale = Math.max(1, Math.min(scale, 5));

  updateTransform();
});

// Drag Start
lightboxImg.addEventListener("mousedown", (e) => {
  if (scale <= 1) return;

  isDragging = true;

  startX = e.clientX - posX;
  startY = e.clientY - posY;
});

// Drag Move
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  posX = e.clientX - startX;
  posY = e.clientY - startY;

  updateTransform();
});

// Drag End
document.addEventListener("mouseup", () => {
  isDragging = false;
});

lightboxImg.addEventListener("dblclick", () => {

  if (scale === 1) {
    scale = 2;
  } else {
    scale = 1;
    posX = 0;
    posY = 0;
  }

  updateTransform();
});

function closeLightbox() {
  lightbox.style.display = "none";

  scale = 1;
  posX = 0;
  posY = 0;

  updateTransform();
}

lightboxImg.addEventListener("click", () => {
  console.log("Image clicked");
});

lightboxImg.addEventListener("click", () => {

  if (scale === 1) {
    scale = 2;
  } else {
    scale = 1;
    posX = 0;
    posY = 0;
  }

  updateTransform();
});