import { superRender } from './main';
import { els, tempElement, useStorage } from './utils';

const [getProjects, setProject] = useStorage('projects');

const getSort = (id) => {
  return getProjects().find((project) => project.id == id).sort;
};

const editSort = (id, sort) => {
  let projects = getProjects().map((project) => {
    return project.id == id ? { ...project, sort } : project;
  });

  setProject(projects);
};

/**
 * @param {HTMLElement} element
 */
export const addDragAndDropEvents = (element) => {
  if (element) {
    element.addEventListener('dragstart', (e) => {
      element.style.opacity = '0.5';

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
      let temp = tempElement(e.dataTransfer.getData('text/html'));

      let oldItemID =
        element.firstElementChild.getAttribute('data-draggable-id');
      let newItemID = temp.getAttribute('data-draggable-id');

      let oldSort = getSort(oldItemID);
      let newSort = getSort(newItemID);

      // edit sort
      editSort(newItemID, oldSort);
      editSort(oldItemID, newSort);

      element.innerHTML = e.dataTransfer.getData('text/html');
    });

    element.addEventListener('dragend', () => {
      els('.draggable').forEach((item) => {
        item.classList.remove('over');
      });
      element.style.opacity = '1';

      // reRender all element for new sort
      superRender();
    });
  }
};
