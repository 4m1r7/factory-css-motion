const trigger = document.getElementById("stream");
const canvas = document.getElementById("scene");
const context = canvas.getContext("2d");

const frameCount = 354;
const currentFrame = (index) => `assets/image-sequence-${index}.jpg`;

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(1);
canvas.width = 1440;
canvas.height = 900;
img.onload = function () {
  context.drawImage(img, 0, 0);
};

const updateImage = (index) => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
};

window.addEventListener("scroll", () => {
  const triggerDepth = window.pageYOffset - trigger.offsetTop;
  const scrollStep = triggerDepth > 0 ? triggerDepth : 1;
  const maxScroll = trigger.scrollHeight - window.innerHeight;
  const scrollFraction = scrollStep / maxScroll;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex + 1));
  console.log(frameIndex);
});

preloadImages();
