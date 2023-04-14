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

function undo() {
    editor.session.getUndoManager().undo();
}

function redo() {
    editor.session.getUndoManager().redo();
}

function cut() {
    let copyText = editor.getCopyText();
    editor.insert("");
    navigator.clipboard.writeText(copyText).then(function(){
        log("Copied!");
    });
}

function copy() {
    let copyText = editor.getCopyText();
    navigator.clipboard.writeText(copyText).then(function(){
        log("Copied!");
    });
}

// TODO refactor this function preferably with clipboardjs
// because this code is really not pretty
function paste() {
        navigator.clipboard.read().then((data) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].types.includes("text/plain")) {
                    data[i].getType("text/plain").then((blob) => {
                        blob.text().then((text) => {
                            editor.session.insert(editor.getCursorPosition(), text);
                        });
                    });
                } else {
                    log("Error: Cannot paste non-plain text into editor");
                }
            }
        });
}

function openFile() {
  pywebview.api.open_file().then(function(response) {
    let file = response.file;
    let filebuffer = {};
    filebuffer.path = file[0];
    filebuffer.contents = file[1];
    buffers.addFile(filebuffer);
    buffers.setCurrentFile(file[0]);
    editor.getSession().setValue(filebuffer.contents);
    buffers.setSaved();
  });
}

function saveFile() {
  let file_path = buffers.getCurrentFile();
  pywebview.api.save_file(file_path, editor.getValue());
}

function switchFile() {
}

let editor = ace.edit("editor");
editor.setShowPrintMargin(false);
editor.setTheme("ace/theme/one_dark");
editor.setOption ("wrap", true);
// currently default syntax highlight is python
editor.session.setMode("ace/mode/python");
editor.container.style.lineHeight = 1.5;

let buffers = {
  files: [],
  current: "",
  is_saved: false,

  addFile(filebuffer) {
    this.files.push(filebuffer);
  },

  setCurrentFile(path) {
    this.current = path;
  },

  getCurrentFile() {
    return this.current;
  },

  setSaved() {
    this.is_saved = true;
  }
};

const menubar = document.querySelector("#menubar");
const lineNumbers = document.querySelector('.line-numbers');

let menus = {
  "File": {},
  "Edit": {},
  "View": {},
  "Settings": {},
  "Help": {}
};

function addMenuElement(menu, name, description) {
  menus[menu][name] = description;
}

addMenuElement("File", "new", "New");
addMenuElement("File", "save", "Save");
addMenuElement("File", "open", "Open file");
addMenuElement("File", "openRecent", "Open recent");
addMenuElement("File", "openLastSession", "Reopen last session");
addMenuElement("File", "command", "Command bar");
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
  return menubarElement;
}

function createMenuContents(name) {
  let menuContents = document.createElement("div");
  menuContents.classList.add("dropdown-content");
  let submenus = Object.keys(menus[name]);
  for (let submenu of submenus) {
    let description = menus[name][submenu];
    let label = document.createElement("p");
    label.innerText = description;
    label.dataset.menuId = submenu;
    menuContents.appendChild(label);
  }
  return menuContents;
}

function newFile() {
  log("Created new file");
}

function handleSave() {
  if (!buffers.is_saved) {
    pywebview.api.save_new_file().then(function(response) {
      let file = response.file;
      console.log(file);
      let filebuffer = {};
      filebuffer.path = file;
      filebuffer.contents = editor.getValue();
      buffers.addFile(filebuffer);
      buffers.setCurrentFile(file);
      buffers.setSaved();
    });
    // Create save dialog
  } else {
    log("Quark auto-saves your work :)");
  }
}

for (let menuItem of menus_list) {
  let menuElement = createMenubarElement(menuItem);
  let menuContents = document.createElement("div");
  menubar.appendChild(menuElement);
}

// Event delegation for menubar elements
menubar.addEventListener("click", function(event) {
  let target = event.target;
  switch (target.dataset.menuId) {
    case "new":
      newFile();
      break;
    case "save":
      handleSave();
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
    case "command":
      commandBarHandler();
      break;
    case "copy":
      copy();
      break;
    case "cut":
      cut();
      break;
    case "paste":
      paste();
      break
  }
});

// window.addEventListener('DOMContentLoaded', handleLineNumbers);
// For autosave on every change
document.querySelector("#editor").addEventListener('keyup', saveHandler);

// Minimize, maximise, quit
minimizeIcon = document.querySelector("#window-min");
maxmizeIcon = document.querySelector("#window-max")
closeIcon = document.querySelector("#window-close")

closeIcon.addEventListener("click", quit);

// // Autosave on every change
// textarea.addEventListener('input', textareaHandler);

function saveHandler() {
  if (!buffers.is_saved) {
    handleSave()
  } else {
    saveFile()
  }
}

function commandBarHandler() {
  let commandBarContainer = document.querySelector(".command-bar");
  let commandBar = document.querySelector(".command-bar input");
  commandBarContainer.style.display = "flex";
  commandBar.addEventListener('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        commandBarContainer.style.display = "none";
        eval(commandBar.value);
    }
    if (e.key === 'Escape' || e.keyCode === 111) {
        commandBarContainer.style.display = "none";    
    }
});
}

function quit() {
  pywebview.api.quit()
}
