import { els } from './utils';

let dragSrcElement;

export const addDragAndDropEvents = (element) => {
  if (element) {
    element.addEventListener('dragstart', (e) => {
      element.style.opacity = '0.5';

      if (element) dragSrcElement = element;

      e.dataTransfer?.setData('dragSrcElement', element.innerHTML);

      e.dataTransfer.effectAllowed = 'move';

      e.dataTransfer?.setData('text/html', element.innerHTML);
    });

    element.addEventListener('dragenter', () => {
      element.classList.add('over');
    });

    element.addEventListener('dragover', (e) => {
      e.preventDefault();

      e.dataTransfer.dropEffect = 'move';
    });

    element.addEventListener('dragleave', (e) => {
      e.stopPropagation();
      element.classList.remove('over');
    });

    element.addEventListener('drop', (e) => {
      if (dragSrcElement !== element) {
        dragSrcElement.innerHTML = element.innerHTML;

        element.innerHTML = e.dataTransfer.getData('text/html');
      }
    });

    element.addEventListener('dragend', () => {
      els('.draggable').forEach((item) => {
        item.classList.remove('over');
      });
      element.style.opacity = '1';

      // reRender all element
      // superRender();
    });
  }
};
