// Switch between opened files (multi-file editing)

// run the functions onclick
document.getElementById("f1").addEventListener("click", editPage_1);
document.getElementById("f2").addEventListener("click", editPage_2);
document.getElementById("f3").addEventListener("click", editPage_3);
document.getElementById("f4").addEventListener("click", editPage_4);
document.getElementById("f5").addEventListener("click", editPage_5);

document.getElementById("bootstrap-zoom-icon").addEventListener("click", zoom_in);
document.getElementById("bootstrap-shrink-icon").addEventListener("click", zoom_out);


// Make code focused

document.getElementById("page-1").focus();


// Displays the selected file based on its ID and hides all others

function editPage_1() {
    // Make page 1 appear
    document.getElementById("page-1").style.display = "block";
    // Make all other pages disappear
    document.getElementById("page-2").style.display = "none";
    document.getElementById("page-3").style.display = "none";
    document.getElementById("page-4").style.display = "none";
    document.getElementById("page-5").style.display = "none";
    // Highlight the page 1 buttton
    document.getElementById("f1").style.backgroundColor = "#001d35";
        // Remove highlight on all other buttons
        document.getElementById("f2").style.background = "none";
    document.getElementById("f3").style.background = "none";
    document.getElementById("f4").style.background = "none";
    document.getElementById("f5").style.background = "none";
    // Make highlight on hover work again
    highlightOnHover_1();
}

function highlightOnHover_1() {
    document.getElementById("f2").addEventListener("mouseover", function() {
        document.getElementById("f2").style.backgroundColor = "#193349";
    });
    document.getElementById("f2").addEventListener("mouseout", function() {
        document.getElementById("f2").style.backgroundColor = "#00101d";
    });

    document.getElementById("f2").addEventListener("mouseover", function() {
        document.getElementById("f2").style.backgroundColor = "#193349";
    });
    document.getElementById("f2").addEventListener("mouseout", function() {
        document.getElementById("f2").style.backgroundColor = "#00101d";
    });

    document.getElementById("f3").addEventListener("mouseover", function() {
        document.getElementById("f3").style.backgroundColor = "#193349";
    });
    document.getElementById("f3").addEventListener("mouseout", function() {
        document.getElementById("f3").style.backgroundColor = "#00101d";
    });

    document.getElementById("f5").addEventListener("mouseover", function() {
        document.getElementById("f5").style.backgroundColor = "#193349";
    });
    document.getElementById("f5").addEventListener("mouseout", function() {
        document.getElementById("f5").style.backgroundColor = "#00101d";
    });
}

function editPage_2() {
    // Make page 2 appear
    document.getElementById("page-2").style.display = "block";
    // Make all other pages disappear
    document.getElementById("page-1").style.display = "none";
    document.getElementById("page-3").style.display = "none";
    document.getElementById("page-4").style.display = "none";
    document.getElementById("page-5").style.display = "none";
    // Highlight the page 2 buttton
    document.getElementById("f2").style.backgroundColor = "#001d35";
        // Remove highlight on all other buttons
        document.getElementById("f1").style.background = "none";
    document.getElementById("f3").style.background = "none";
    document.getElementById("f4").style.background = "none";
    document.getElementById("f5").style.background = "none";
    // Make highlight on hover work again
    highlightOnHover_2();
}

function highlightOnHover_2() {
    document.getElementById("f1").addEventListener("mouseover", function() {
        document.getElementById("f1").style.backgroundColor = "#193349";
    });
    document.getElementById("f1").addEventListener("mouseout", function() {
        document.getElementById("f1").style.backgroundColor = "#00101d";
    });

    document.getElementById("f4").addEventListener("mouseover", function() {
        document.getElementById("f4").style.backgroundColor = "#193349";
    });
    document.getElementById("f4").addEventListener("mouseout", function() {
        document.getElementById("f4").style.backgroundColor = "#00101d";
    });

    document.getElementById("f3").addEventListener("mouseover", function() {
        document.getElementById("f3").style.backgroundColor = "#193349";
    });
    document.getElementById("f3").addEventListener("mouseout", function() {
        document.getElementById("f3").style.backgroundColor = "#00101d";
    });

    document.getElementById("f5").addEventListener("mouseover", function() {
        document.getElementById("f5").style.backgroundColor = "#193349";
    });
    document.getElementById("f5").addEventListener("mouseout", function() {
        document.getElementById("f5").style.backgroundColor = "#00101d";
    });
}

function editPage_3() {
    // Make page 3 appear
    document.getElementById("page-3").style.display = "block";
    // Make all other pages disappear
    document.getElementById("page-1").style.display = "none";
    document.getElementById("page-2").style.display = "none";
    document.getElementById("page-4").style.display = "none";
    document.getElementById("page-5").style.display = "none";
    // Highlight the page 3 buttton
    document.getElementById("f3").style.backgroundColor = "#001d35";
        // Remove highlight on all other buttons
        document.getElementById("f1").style.background = "none";
    document.getElementById("f2").style.background = "none";
    document.getElementById("f4").style.background = "none";
    document.getElementById("f5").style.background = "none";
    // Make highlight on hover work again
    highlightOnHover_3();
}

function highlightOnHover_3() {
    document.getElementById("f1").addEventListener("mouseover", function() {
        document.getElementById("f1").style.backgroundColor = "#193349";
    });
    document.getElementById("f1").addEventListener("mouseout", function() {
        document.getElementById("f1").style.backgroundColor = "#00101d";
    });

    document.getElementById("f2").addEventListener("mouseover", function() {
        document.getElementById("f2").style.backgroundColor = "#193349";
    });
    document.getElementById("f2").addEventListener("mouseout", function() {
        document.getElementById("f2").style.backgroundColor = "#00101d";
    });

    document.getElementById("f4").addEventListener("mouseover", function() {
        document.getElementById("f4").style.backgroundColor = "#193349";
    });
    document.getElementById("f4").addEventListener("mouseout", function() {
        document.getElementById("f4").style.backgroundColor = "#00101d";
    });

    document.getElementById("f5").addEventListener("mouseover", function() {
        document.getElementById("f5").style.backgroundColor = "#193349";
    });
    document.getElementById("f5").addEventListener("mouseout", function() {
        document.getElementById("f5").style.backgroundColor = "#00101d";
    });
}

function editPage_4() {
    // Make page 4 appear
    document.getElementById("page-4").style.display = "block";
    // Make all other pages disappear
    document.getElementById("page-1").style.display = "none";
    document.getElementById("page-3").style.display = "none";
    document.getElementById("page-2").style.display = "none";
    document.getElementById("page-5").style.display = "none";
    // Highlight the page 4 buttton
    document.getElementById("f4").style.backgroundColor = "#001d35";
        // Remove highlight on all other buttons
        document.getElementById("f2").style.background = "none";
    document.getElementById("f3").style.background = "none";
    document.getElementById("f1").style.background = "none";
    document.getElementById("f5").style.background = "none";
    // Make highlight on hover work again
    highlightOnHover_4();
}

function highlightOnHover_4() {
    document.getElementById("f1").addEventListener("mouseover", function() {
        document.getElementById("f1").style.backgroundColor = "#193349";
    });
    document.getElementById("f1").addEventListener("mouseout", function() {
        document.getElementById("f1").style.backgroundColor = "#00101d";
    });

    document.getElementById("f2").addEventListener("mouseover", function() {
        document.getElementById("f2").style.backgroundColor = "#193349";
    });
    document.getElementById("f2").addEventListener("mouseout", function() {
        document.getElementById("f2").style.backgroundColor = "#00101d";
    });

    document.getElementById("f3").addEventListener("mouseover", function() {
        document.getElementById("f3").style.backgroundColor = "#193349";
    });
    document.getElementById("f3").addEventListener("mouseout", function() {
        document.getElementById("f3").style.backgroundColor = "#00101d";
    });

    document.getElementById("f5").addEventListener("mouseover", function() {
        document.getElementById("f5").style.backgroundColor = "#193349";
    });
    document.getElementById("f5").addEventListener("mouseout", function() {
        document.getElementById("f5").style.backgroundColor = "#00101d";
    });
}

function editPage_5() {
    // Make page 5 appear
    document.getElementById("page-5").style.display = "block";
    // Make all other pages disappear
    document.getElementById("page-1").style.display = "none";
    document.getElementById("page-3").style.display = "none";
    document.getElementById("page-4").style.display = "none";
    document.getElementById("page-2").style.display = "none";
    // Highlight the page 5 buttton
    document.getElementById("f5").style.backgroundColor = "#001d35";
        // Remove highlight on all other buttons
        document.getElementById("f2").style.background = "none";
    document.getElementById("f3").style.background = "none";
    document.getElementById("f4").style.background = "none";
    document.getElementById("f1").style.background = "none";
    // Make highlight on hover work again
    highlightOnHover_5();
}

function highlightOnHover_5() {
    document.getElementById("f1").addEventListener("mouseover", function() {
        document.getElementById("f1").style.backgroundColor = "#193349";
    });
    document.getElementById("f1").addEventListener("mouseout", function() {
        document.getElementById("f1").style.backgroundColor = "#00101d";
    });

    document.getElementById("f2").addEventListener("mouseover", function() {
        document.getElementById("f2").style.backgroundColor = "#193349";
    });
    document.getElementById("f2").addEventListener("mouseout", function() {
        document.getElementById("f2").style.backgroundColor = "#00101d";
    });

    document.getElementById("f3").addEventListener("mouseover", function() {
        document.getElementById("f3").style.backgroundColor = "#193349";
    });
    document.getElementById("f3").addEventListener("mouseout", function() {
        document.getElementById("f3").style.backgroundColor = "#00101d";
    });

    document.getElementById("f4").addEventListener("mouseover", function() {
        document.getElementById("f4").style.backgroundColor = "#193349";
    });
    document.getElementById("f4").addEventListener("mouseout", function() {
        document.getElementById("f4").style.backgroundColor = "#00101d";
    });

}


// The about page

function about_on() {
    document.getElementById("overlay").style.display = "block";
}

function about_off() {
    document.getElementById("overlay").style.display = "none";
}

// Basic clipboard operations

// The copy() function
function copy() {
    document.getElementById("txt-field").focus(); //make selected active
    document.execCommand("copy"); //copy selected text
    log("Copied text to clipboard");
}

// The cut() function
function cut() {
    document.getElementById("txt-field").focus(); //make selected active
    document.execCommand("cut"); //cut selected text
    log("Cut text to clipboard");
}

// The paste() function
async function paste() {
    document.getElementById("txt-field").focus(); //make selected active
    if (!navigator.clipboard) {
        // Clipboard API not available
        alert("You'll don't have clipboard permissions enabled");
    }
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById("page-1").innerText = document.getElementById("page-1").innerText + text;
        log("Text pasted.");
    } catch {
        log("Failed to read clipboard");
    }
}

// Strip any pasted text of formatting (courtesy of pimvdb from Stack Overflow)
document.getElementById("txt-field").addEventListener("paste", function(e) {
    // cancel paste
    e.preventDefault();

    // get text representation of clipboard
    var text = (e.originalEvent || e).clipboardData.getData("text/plain");

    // insert text manually
    document.execCommand("insertHTML", false, text);
});

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
    document.querySelector("code").focus(); //make selected active
    document.execCommand("undo");
}

function redo() {
    document.querySelector("code").focus(); //make selected active
    document.execCommand("redo");
}

// Opening file from disk

function readFile() {
	document.getElementById("inputfile").click();
    readFile2();
}

function readFile2() {
    
	document.getElementById("inputfile") 
        .addEventListener("change", function() { 
          
        var fr=new FileReader(); 
        fr.onload=function(){ 
            document.getElementById("page-1").textContent=fr.result; 
        } 
          
        fr.readAsText(this.files[0]); 
    }) 
}


// Saving files to disk

function save(){
  var text = document.getElementById("txt-field").innerText;
  document.getElementById('saveButton').setAttribute(
    'href',
    'data:Content-type: text/plain, ' + escape(text)
  );
  log("A copy was saved!");
}

// Saving files to localStorage
function saveEdits() {
    //get the editable element
    var editElem = document.getElementById("page-1");

    //get the edited element content
    var userVersion = editElem.innerHTML;

    //save the content to local storage
    localStorage.userEdits = userVersion;

    //write a confirmation to the user
    log("Edits saved!");
}

// Right sidebar buttons
function zoom_in() {
    code = document.getElementById("txt-field");
    code.style.fontSize = "120%" ;
}

function zoom_out() {
    code = document.getElementById("txt-field");
    code.style.fontSize = "80%" ;
}

// Keyboard shortcut bindings

// Alt S (Save)
keyboardJS.bind("alt + s", (e) => {
  saveEdits();
});

// Alt S C (Save copy)

keyboardJS.bind("alt + c", (e) => {
  document.getElementById("saveButton").click();
});

// Alt N (New file)
keyboardJS.bind("alt + n", (e) => {
  editPage_5();
});
