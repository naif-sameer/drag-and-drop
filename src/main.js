import { el, els, getRandomID, toArray, toStr } from './utils';
import { addDragAndDropEvents } from './drag-drop';
import './main.css';

// storage
const useStorage = (storageName) => {
  const getItem = (key) => localStorage.getItem(key);
  const setItem = (key, value) => localStorage.setItem(key, value);

  const getValue = () => {
    let item = getItem(storageName);

    // check if item exists in the local storage
    return item ? toArray(item) : [];
  };

  const setValue = (projects) => {
    setItem(storageName, toStr(projects));
  };

  return [getValue, setValue];
};

const INPUT = el('#project-input');

const BTN = el('#project-btn');

const [getProjects, setProject] = useStorage('projects');

// get
const getProject = (id) => {
  return getProjects().find((item) => item.id === id);
};

// add
const addProject = (title) => {
  const getSortNumber = () => {
    let sortNumber = getProjects().at(-1)?.sort || 0;
    return sortNumber + 1;
  };

  let project = { id: getRandomID(), title, sort: getSortNumber() };

  setProject([...getProjects(), project]);

  superRender();
};

// edit
const editProject = (id, title) => {
  console.log(getProjects());
  let projects = getProjects().map((project) => {
    return project.id === id ? { ...project, title } : project;
  });

  setProject(projects);

  console.log(getProjects());

  superRender();
};

// delete
const deleteProject = (id) => {
  let projects = getProjects().filter((project) => {
    return project.id !== id;
  });

  setProject(projects);
  superRender();
};

/** render all element inside localStorage
 */
export const superRender = () => {
  let projects = getProjects().reduce((previousValue, currentValue) => {
    return (previousValue += renderListItem({ ...currentValue }));
  }, '');

  // render the html to dom
  el('#project-list').innerHTML = projects;

  // add drag and drop event
  els('.draggable').forEach((element) => {
    addDragAndDropEvents(element);
  });

  // run edit btn
  runEditProjectBtn();

  // run delete btn
  runDeleteProjectBtn();
};

export const renderListItem = ({ id, title }) => {
  return `
    <li
      data-draggable-id="${id}"
      draggable="true"
      class="draggable draggable-id-${id} text-sm font-medium truncate dark:text-white flex space-x-4"
    >
      <div
        class="project-title justify-between flex w-full p-2 rounded rounded-r-none bg-transparent border border-r-0 border-transparent outline-none focus:border-gray-300"
      >
        ${title}
      </div>

      <div class="text-white flex space-x-4">
        <button 
          data-draggable-id="${id}"         
          class="project-edit-btn w-6">
            <img src="src/assets/edit.svg" alt="edit icon" />
        </button>

        <button
          data-draggable-id="${id}" 
          class="w-6 project-delete-btn">
            <img src="src/assets/delete.svg" alt="delete icon" />
        </button>
      </div>
    </li>
`;
};

// add new project on submit
el('#project-form')?.addEventListener('submit', (e) => {
  e.preventDefault();

  // add the value if input not empty
  const isValue = INPUT.value !== '';
  if (isValue) {
    // check btn type
    const btnAction = BTN.getAttribute('data-btn-type');

    if (btnAction === 'edit') {
      const projectID = BTN.getAttribute('data-project-id');

      editProject(Number(projectID), INPUT.value);

      BTN.setAttribute('data-btn-type', 'add');
      BTN.innerHTML = 'add';
    } else {
      addProject(INPUT.value);
    }

    // reset input value
    INPUT.value = '';
  } else {
    alert('please add a value ');
  }
});

// edit project
const runEditProjectBtn = () => {
  els('.project-edit-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const projectID = btn.getAttribute('data-draggable-id');

      const project = getProject(Number(projectID));

      if (project) {
        INPUT.value = project.title;

        BTN.setAttribute('data-btn-type', 'edit');

        BTN.setAttribute('data-project-id', `${project.id}`);

        BTN.innerHTML = 'edit';
      }

      console.log('edited', btn, projectID);
    });
  });
};

const runDeleteProjectBtn = () => {
  els('.project-delete-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const projectID = btn.getAttribute('data-draggable-id');
      deleteProject(Number(projectID));
    });
  });
};

// render all element on localStorage
superRender();
