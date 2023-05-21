import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery'); 
// Получаем ссылку на элемент на веб-странице с классом "gallery" и сохраняем его в переменной galleryContainer. 
// Этот элемент будет контейнером для галереи изображений.

const markup = galleryItems.reduce(
  (acc, { original, preview, description }) =>
    (acc += `<li>
  <a class="gallery__item" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>
</li>`),
  ''
);

// Создаем HTML-разметку для каждого изображения в галерее. Используем метод reduce для преобразования массива 
// galleryItems в строку HTML-разметки. Каждое изображение представлено в виде элемента списка <li>, 
// содержащего ссылку <a> с превью изображения и оригинальной ссылкой, а также изображение <img> 
// с альтернативным текстом. Строка HTML-разметки сохраняется в переменной markup.

galleryContainer.insertAdjacentHTML('beforeend', markup);

// Вставляем сгенерированную HTML-разметку внутрь контейнера galleryContainer. 
// В результате изображения появляются на странице внутри контейнера.

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Создаем экземпляр объекта SimpleLightbox, который добавляет функциональность просмотра изображений 
// в модальном окне. Он инициализируется селектором '.gallery a', который выбирает все ссылки <a> внутри 
// контейнера с классом "gallery". Параметры конфигурации для SimpleLightbox могут быть заданы во втором 
// аргументе в фигурных скобках. В данном случае установлен параметр captionsData в значение 'alt', 
// чтобы использовать атрибут alt изображения в качестве подписи к изображению. 
// Параметр captionDelay устанавливает задержку перед появлением подписи (в данном случае 250 миллисекунд).