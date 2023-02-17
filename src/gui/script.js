// For toast notifications
function log(value) {
    clearTimeout(log.timer);
    if (toast.hidden) toast.textContent = value;
    else toast.textContent += "\n" + value;
    toast.className = String(value).match(/error/i) ? "error" : "";
    toast.hidden = false;
    log.timer = setTimeout(() => {
        toast.hidden = true;
    }, 800);
}

// Undo/Redo operations

function undo() {
    document.querySelector("textarea").focus(); //make selected active
    document.execCommand("undo");
}

function redo() {
    document.querySelector("textarea").focus(); //make selected active
    document.execCommand("redo");
}

function openFile() {
  pywebview.api.open_file().then(function(response) {
    let file = response.file;
    let filebuffer = {}
    filebuffer.path = file[0];
    filebuffer.contents = file[1]
    buffers.addFile(filebuffer);
    buffers.setCurrentFile(filebuffer);
    textarea.value = filebuffer.contents;
    handleLineNumbers();
  })
}

function saveFile() {
  let file = buffers.getCurrentFile();
  pywebview.api.save_file(file.path, textarea.value);
}

let buffers = {
  files: [],
  current: {},

  addFile(filebuffer) {
    this.files.push(filebuffer)
  },

  setCurrentFile(filebuffer) {
    this.current = filebuffer
  },

  getCurrentFile() {
    return this.current
  }
}

const menubar = document.querySelector("#menubar");
const textarea = document.querySelector("textarea");
const lineNumbers = document.querySelector('.line-numbers')

let menus = {
  "File": {},
  "Edit": {},
  "View": {},
  "Settings": {},
  "Help": {}
}

function addMenuElement(menu, name, description) {
  menus[menu][name] = description
}

addMenuElement("File", "new", "New");
addMenuElement("File", "save", "Save");
addMenuElement("File", "open", "Open file");
addMenuElement("File", "openRecent", "Open recent");
addMenuElement("File", "openLastSession", "Reopen last session");
addMenuElement("File", "quit", "Quit");
addMenuElement("Edit", "undo", "Undo");
addMenuElement("Edit", "redo", "Redo");
addMenuElement("Edit", "cut", "Cut");
addMenuElement("Edit", "copy", "Copy");
addMenuElement("Edit", "paste", "Paste");

let menus_list = Object.keys(menus);

function createMenubarElement(name) {
  let menubarElement = document.createElement("div");
  menubarElement.classList.add("dropdown");
  menubarElement.innerHTML = `
    <div class="dropdown-button hvr-radial-out">
      <p>${name}</p>
    </div>
  `;
  let menuContents = createMenuContents(name);
  menubarElement.appendChild(menuContents);
  return menubarElement
}

function createMenuContents(name) {
  let menuContents = document.createElement("div");
  menuContents.classList.add("dropdown-content");
  let submenus = Object.keys(menus[name]);
  console.log(submenus)
  for (let submenu of submenus) {
    let description = menus[name][submenu]
    let label = document.createElement("p");
    label.innerText = description;
    label.dataset.menuId = submenu;
    menuContents.appendChild(label);
    console.log(label)
  }
  return menuContents
}

function newFile() {
  log("Created new file");
}

for (let menuItem of menus_list) {
  let menuElement = createMenubarElement(menuItem);
  let menuContents = document.createElement("div");
  menubar.appendChild(menuElement);
}

// Event delegation for menubar elements
menubar.addEventListener("click", function(event) {
  let target = event.target;
  console.log(target.dataset.menuId);
  switch (target.dataset.menuId) {
    case "new":
      newFile();
      break;
    case "save":
      log("Quark auto-saves your work :)");
      break;
    case "open":
      openFile();
      break;
    case "undo":
      undo();
      break;
    case "redo":
      redo();
      break;
    case "quit":
      quit();
      break;
  }
});

window.addEventListener('DOMContentLoaded', handleLineNumbers);
textarea.addEventListener('keyup', handleLineNumbers);

// Autosave on every change
textarea.addEventListener('input', saveFile);

function handleLineNumbers() {
  const numberOfLines = textarea.value.split('\n').length

  lineNumbers.innerHTML = Array(numberOfLines)
    .fill('<span></span>')
    .join('')
}

function textareaSetContent() {
  handleLineNumbers();
  let textContent = textarea.value;
  localStorage.setItem("textContent", textContent);
}

function textareaLoadContent() {
  handleLineNumbers();
  let textContent = localStorage.getItem("textContent");
  textarea.value = textContent;
}

function quit() {
  pywebview.api.quit()
}
