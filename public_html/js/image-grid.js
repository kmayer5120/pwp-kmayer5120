const pathToImages = './images/gallery/gallery-images/';
const imageGrid = document.getElementById('image-grid');

let gridElements = [
  {
    filename: 'img-braided-ring-headband-1.jpg',
    name: 'Braided Ring Headband',
  },
  {
    filename: 'img-braided-ring-headband-2.jpg',
    name: 'Braided Ring Headband',
  },
  {
    filename: 'img-jeremy-cowl-1.jpg',
    name: "Jeremy's Cowl",
  },
  {
    filename: 'img-jeremy-cowl-2.jpg',
    name: "Jeremy's Cowl",
  },
  {
    filename: 'img-windowpane-beanie-2.jpg',
    name: 'Windowpane Slouchy Beanie',
  },
  {
    filename: 'img-windowpane-beanie-3.jpg',
    name: 'Windowpane Slouchy Beanie',
  },
];

imageGrid.innerHTML = gridElements
  .map((el) => {
    return `
    <div class="image-grid__card">
      <img src="#" data-src="${pathToImages + el.filename}" alt="${el.name}"/>
      <h5 class="pt-3">${el.name}</h5>
    </div>
  `;
  })
  .join('');
