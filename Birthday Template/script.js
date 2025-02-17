
const numStars = 100; 
const starsContainer = document.querySelector('.stars');

for (let i = 0; i < numStars; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  
  // Random values for each star
  const tailLength = (Math.random() * (7.5 - 5) + 5).toFixed(2) + "em";
  const topOffset = Math.floor(Math.random() * 100) + "vh";
  const fallDuration = (Math.random() * (12 - 6) + 6).toFixed(1) + "s";
  const fallDelay = (Math.random() * 10).toFixed(1) + "s";

  star.style.setProperty('--star-tail-length', tailLength);
  star.style.setProperty('--top-offset', topOffset);
  star.style.setProperty('--fall-duration', fallDuration);
  star.style.setProperty('--fall-delay', fallDelay);

  starsContainer.appendChild(star);
}

const photos = document.querySelectorAll('.photo');
const videoWrapper = document.querySelector('.video-wrapper');
let draggedPhotos = 0;

photos.forEach((photo) => {
  let isDragging = false;

  const startDrag = (event) => {
    isDragging = true;

    // Get the initial position of the mouse or touch
    const initialX = event.clientX || event.touches[0].clientX;
    const initialY = event.clientY || event.touches[0].clientY;

    const photoStyle = window.getComputedStyle(photo);
    const matrix = new DOMMatrix(photoStyle.transform);
    let currentX = matrix.m41;
    let currentY = matrix.m42;

    const onDrag = (event) => {
      if (!isDragging) return;

      // Calculate the new position
      const moveX = (event.clientX || event.touches[0].clientX) - initialX;
      const moveY = (event.clientY || event.touches[0].clientY) - initialY;

      // Apply translation to the photo
      photo.style.transform = `translate(${currentX + moveX}px, ${currentY + moveY}px)`;
    };

    const stopDrag = () => {
      isDragging = false;
      draggedPhotos++;

      // Check if all photos are dragged at least once
      if (draggedPhotos === photos.length) {
        videoWrapper.style.opacity = 1; // Reveal the video
      }

      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', onDrag);
      document.removeEventListener('touchend', stopDrag);
    };

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', onDrag);
    document.addEventListener('touchend', stopDrag);
  };

  photo.addEventListener('mousedown', startDrag);
  photo.addEventListener('touchstart', startDrag);
});

