const images = document.getElementsByClassName("image");
const footerCounter = document.getElementById('footer-text');

let globalIndex = 0,
    last = { x: 0, y: 0 };

const activate = (image, x, y) => {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.zIndex = globalIndex;

  image.dataset.status = "active";

  last = { x, y };
}

const distanceFromLast = (x, y) => {
  return Math.hypot(x - last.x, y - last.y);
}

const handleOnMove = e => {
  if(distanceFromLast(e.clientX, e.clientY) > (window.innerWidth / 12)) {
    footerCounter.textContent = `${(globalIndex % 24 + 1 )}/24`
    const lead = images[globalIndex % images.length],
          tail = images[(globalIndex - 5) % images.length];

    activate(lead, e.clientX, e.clientY);

    if(tail) tail.dataset.status = "inactive";
    
    globalIndex++;
  }
}

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);


window.addEventListener('load', () => {
    const inners = document.querySelectorAll('.slide-up-inner');
    inners.forEach((inner, index) => {
        setTimeout(() => {
        inner.classList.add('visible');
        }, index * 75);
    });
});