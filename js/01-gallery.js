import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery'); //Создаем константу galleryContainer, которая ссылается на элемент с классом "gallery" в документе. 
const itemsMarkup = createGalleryItemsMarkup(galleryItems);  // Вызываем функцию createGalleryItemsMarkup(galleryItems), передавая ей массив galleryItems в качестве аргумента, и сохраняем возвращаемую функцией разметку в переменную itemsMarkup.
galleryContainer.insertAdjacentHTML('beforeend', itemsMarkup); // Вставляем разметку из itemsMarkup в конец элемента galleryContainer с помощью метода insertAdjacentHTML('beforeend', itemsMarkup). Это добавляет элементы галереи внутрь контейнера галереи.
galleryContainer.addEventListener('click', onImgClick); //Добавляем слушатель событий на элемент galleryContainer, чтобы отслеживать клики внутри галереи. Когда происходит клик, будет вызвана функция onImgClick.

function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}
//Функция createGalleryItemsMarkup принимает массив объектов items и создает разметку для каждого элемента галереи. 
//Она использует метод map для преобразования массива объектов в массив строк с разметкой для каждого элемента галереи. 
//Каждый элемент галереи представлен в виде <li class="gallery__item">...</li>, содержащего ссылку на полное изображение
// и превью. Вся разметка элементов объединяется в одну строку с помощью метода join('') и возвращается как результат функции createGalleryItemsMarkup.


const instance = basicLightbox.create(                       
  `
<img width="1280" height="auto" src="">`,
  {
    onShow: (instance) => {
      window.addEventListener('keydown', onEscKeyPress);
    },
    onClose: (instance) => {
      window.removeEventListener('keydown', onEscKeyPress);
    },
  }
);

//Создается переменная instance, которая вызывает метод create из библиотеки BasicLightbox. Внутри метода передается разметка с изображением в виде строки, 
//а также объект с опциями, которые определяют функции обратного вызова для событий открытия и закрытия галереи.
// В разметке <img> отсутствует URL src, он должен быть заполнен для отображения реального изображения.
// При открытии галереи, функция onShow добавляет слушатель событий на клавиатуру для обработки нажатия клавиши Escape.
// При закрытии галереи, функция onClose удаляет слушатель событий на клавиатуру.

function onImgClick(e) {
  e.preventDefault();
  const datasetSource = e.target.dataset.source;
  if (!datasetSource) return;
  instance.element().querySelector('img').src = datasetSource;
  instance.show();
}

// Функция onImgClick вызывается при клике на изображение в галерее. Она принимает объект события e. Внутри функции:
// Вызывается метод preventDefault() для отмены стандартного действия ссылки, чтобы изображение не открывалось в новой вкладке.
// Получается значение атрибута data-source у кликнутого элемента e.target (предполагается, что data-source содержит URL полного изображения).
// Если значение datasetSource не определено, функция просто возвращает undefined и прекращает выполнение.
// В противном случае, у элемента img внутри instance изменяется атрибут src на значение datasetSource, чтобы загрузить полное изображение.
// Затем вызывается метод show() у instance для открытия галереи.

function onEscKeyPress(e) {
  if (e.code !== 'Escape') return;
  instance.close();
}

// Функция onEscKeyPress вызывается при нажатии клавиши на клавиатуре. Она принимает объект события e. Внутри функции:
// Проверяется, является ли нажатая клавиша клавишей Escape, используя свойство code объекта события.
// Если клавиша не является клавишей Escape, функция просто возвращает undefined и прекращает выполнение.
// В противном случае, вызывается метод close() у instance для закрытия галереи.
// Все вместе этот код реализует функциональность галереи, в которой при клике на изображение отображается полное изображение в модальном окне, и галерея закрывается при нажатии клавиши Escape.
