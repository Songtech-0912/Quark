class FileBuffer {
    constructor(files = [], current = "", currentID = "", is_saved = false) {
        this.files = files;
        this.current = current;
        this.currentID = currentID;
        this.is_saved = is_saved;
    }

    addFile(filebuffer) {
        this.files.push(filebuffer);
    }

    setCurrentFile(path) {
        this.current = path;
    }

    getCurrentFile() {
        return this.current;
    }

    getFiles() {
        let files = [];
        for (let file of this.files) {
            files.push(file.path);
        }
        return files;
    }

    getFileFromPath(path) {
        for (let file of this.files) {
            if (file.path === path) {
                return file;
            }
        }
    }

    getFileFromId(id) {
        for (let file of this.files) {
            if (file.id === id) {
                return file;
            }
        }
    }

    setSaved() {
        this.is_saved = true;
    }
}

let openedFilesPanel = document.querySelector(".editor-sidebar details");
let buffers = new FileBuffer();
const menubar = document.querySelector("#menubar");

function randHex(size) {
  let result = [];
  let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

  for (let n = 0; n < size; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return result.join('');
}

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
    filebuffer.filename = file[2];
    filebuffer.language = file[3];
    filebuffer.id = randHex(6);
    // Only add file to filebuffer if it doesn't already exist in filebuffer
    if (buffers.getFiles().includes(filebuffer.path) !== true) {
        buffers.addFile(filebuffer);
    }
    buffers.setCurrentFile(filebuffer.path);
    editor.session.setMode("ace/mode/" + filebuffer.language);
    editor.getSession().setValue(filebuffer.contents);
    buffers.setSaved();
    openedFilesPanel.innerHTML = sidebarBtnTemplate();
  });
}

function updateBuffers() {
  buffers.getFileFromId(buffers.currentID).contents = editor.getValue();
}

function saveFile() {
  let file_path = buffers.current;
  pywebview.api.save_file(file_path, editor.getValue());
  // update internal buffers as well
  updateBuffers();
}

function switchFile(filebuffer) {
    buffers.setCurrentFile(filebuffer.path);
    editor.session.setMode("ace/mode/" + filebuffer.language);
    editor.getSession().setValue(filebuffer.contents);
    buffers.setSaved();
    openedFilesPanel.innerHTML = sidebarBtnTemplate();
}

function newFile() {
  let filebuffer = {};
  filebuffer.path = "";
  filebuffer.contents = "";
  filebuffer.filename = "Untitled";
  filebuffer.language = "plain_text";
  filebuffer.id = randHex(6);
  buffers.addFile(filebuffer);
  switchFile(filebuffer);
  buffers.is_saved = false;
  buffers.currentID = filebuffer.id;
}

function createMenuContents(menu) {
  let submenus = Object.keys(menus[menu]);
  return `
    <div class="dropdown-content">
      ${submenus.map(function(submenu) {
        return `<p data-menu-id="${submenu}">${menus[menu][submenu]}</p>`
      }).join("")}
    </div>
  `;
}


function menubarTemplate(menus) {
    let menus_list = Object.keys(menus);
    return `
      ${menus_list.map(function(menu_item) {
        return `
          <div class="dropdown">
            <div class="dropdown-button hvr-radial-out">
              <p>${menu_item}</p>
            </div>
            <div class="dropdown-content">
              ${createMenuContents(menu_item)}
            </div>
          </div>
        `;
      }).join("")}
    `;
}

function sidebarBtnTemplate() {
    return `
        <div>
            ${buffers.files.map(function(file) {
                let btn_class = file.path === buffers.current ? "active" : "";
                return `<p class="${btn_class}" data-path="${file.path}">${file.filename}</p>`;
            }).join('')}
        </div>`;
}

function handleSave() {
  if (!buffers.is_saved) {
    pywebview.api.save_new_file().then(function(response) {
      let file = response.file;
      let filebuffer = {};
      filebuffer.path = file[0];
      filebuffer.contents = file[1];
      filebuffer.filename = file[2];
      filebuffer.language = file[3];
      filebuffer.id = buffers.currentID;
      console.log(filebuffer);
      // Update buffers with the new path, filename, and
      // language of the saved file
      let current_file = buffers.getFileFromId(buffers.currentID);
      current_file.path = filebuffer.path;
      current_file.contents = filebuffer.contents;
      current_file.filename = filebuffer.filename;
      current_file.language = filebuffer.language;
      // Update current buffer and set to autosave
      buffers.current = filebuffer.path;
      buffers.setSaved();
      openedFilesPanel.innerHTML = sidebarBtnTemplate();
    });
    // Create save dialog
  } else {
    log("Quark auto-saves your work :)");
  }
}

function setMode(mode) {
    editor.session.setMode("ace/mode/" + mode);
}

ace.require("ace/ext/language_tools");
let editor = ace.edit("editor");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
});
editor.setShowPrintMargin(false);
editor.setTheme("ace/theme/one_dark");
editor.setOption ("wrap", true);
// Start with default empty file
newFile();


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
addMenuElement("File", "openLastSession", "Reopen last session");
addMenuElement("File", "command", "Command bar");
addMenuElement("File", "quit", "Quit");
addMenuElement("Edit", "undo", "Undo");
addMenuElement("Edit", "redo", "Redo");
addMenuElement("Edit", "cut", "Cut");
addMenuElement("Edit", "copy", "Copy");
addMenuElement("Edit", "paste", "Paste");

menubar.innerHTML = menubarTemplate(menus);

// Event delegation for left sidebar
openedFilesPanel.addEventListener("click", function(event) {
    let target = event.target;
    if (target.dataset.path) {
        let path = target.dataset.path;
        console.log(`Editor switching to ${path}`);
        let file = buffers.getFileFromPath(path);
        switchFile(file);
    }
})

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

function saveHandler() {
  if (buffers.is_saved) {
    saveFile()
  } else {
    updateBuffers()
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