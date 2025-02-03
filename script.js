const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

// Array of image URLs
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to create an image promise
function loadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
  });
}

// Function to load all images
function loadImages() {
  // Clear previous content
  output.innerHTML = `<div class="loading">Loading images...</div>`;

  const imagePromises = images.map(loadImage);

  Promise.all(imagePromises)
    .then((loadedImages) => {
      // Remove loading text
      output.innerHTML = "";

      // Append images to output div
      loadedImages.forEach(img => output.appendChild(img));
    })
    .catch((error) => {
      // Display error message
      output.innerHTML = `<div class="error">${error}</div>`;
    });
}

// Event listener for button click
btn.addEventListener("click", loadImages);
