

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

