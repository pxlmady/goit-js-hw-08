const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const galleryContainer = document.querySelector('.gallery');
let currentInstance = null;

// Функція для створення елемента галереї
function createGalleryItem({ preview, original, description }) {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery-item');

  const link = document.createElement('a');
  link.classList.add('gallery-link');
  link.href = original;

  const image = document.createElement('img');
  image.classList.add('gallery-image');
  image.src = preview;
  image.alt = description;
  image.dataset.source = original;

  link.appendChild(image);
  galleryItem.appendChild(link);

  return galleryItem;
}

// Функція для створення галереї
function createGallery(images) {
  const galleryItems = images.map(createGalleryItem);
  galleryContainer.append(...galleryItems);
}

// Обробник кліку по галереї
function onGalleryClick(event) {
  event.preventDefault();

  const target = event.target;
  if (target.nodeName !== 'IMG') {
    return;
  }

  const largeImageSource = target.dataset.source;

  // Створення модального вікна із слухачами подій
  currentInstance = basicLightbox.create(`
    <img src="${largeImageSource}" alt="Large Image">
  `, {
    onShow: () => {
      window.addEventListener('keydown', onKeyPress);
    },
    onClose: () => {
      window.removeEventListener('keydown', onKeyPress);
      currentInstance = null;
    }
  });

  // Показ модального вікна
  currentInstance.show();
}

// Обробник натискання клавіші Esc
function onKeyPress(event) {
  if (event.code === 'Escape' && currentInstance) {
    currentInstance.close();
  }
}

// Додавання слухача подій до контейнера галереї
galleryContainer.addEventListener('click', onGalleryClick);

// Створення галереї при завантаженні сторінки
createGallery(images);