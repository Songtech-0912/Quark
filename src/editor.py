import webview
import sys
from pathlib import Path
from fuzzyfinder import fuzzyfinder

languages_map = {
    "": "plain_text",
    ".js": "javascript",
    ".py": "python",
    ".html": "html",
    ".css": "css",
    ".scss": "sass",
    ".svg": "svg",
    ".less": "less",
    ".rs": "rust",
    ".ruby": "ruby",
    ".md": "markdown",
    ".xml": "xml",
    ".c": "c",
    ".cpp": "cpp",
    ".txt": "plain_text",
    ".java": "java",
    ".yml": "yaml",
    ".json": "json",
    ".lua": "lua",
    ".adoc": "asciidoc",
    ".cs": "csharp",
    ".dart": "dart",
    ".f90": "fortran",
    ".glsl": "glsl",
    ".julia": "julia",
    ".latex": "latex",
    ".m": "matlab",
    ".sh": "sh"
}

def create_file(path):
    with open(path, "w") as f:
        f.write("")

def folder_contents(path_str):
    parent_folder = Path("/".join(path_str.split("/")[:-1])).expanduser()
    return [str(p) for p in parent_folder.iterdir()]

class Api():
  def __init__(self, file):
    self.startup_file = file

  def get_startup_file(self):
    response = {
      "file": str(self.startup_file)
    }
    return response

  def open_file(self):
    result = webview.windows[0].create_file_dialog(webview.OPEN_DIALOG)
    if result == "":
      raise Exception("Choosing file was unsuccessful")
    # filepath
    file = result[0]
    # file contents as string
    contents = Path(file).open().read()
    # filename with extension
    filename = result[0].split("/")[-1]
    # language
    extension = Path(file).suffix
    try:
        language = languages_map[extension]
    except KeyError:
        language = "plain_text"
    response = {
      "file": [file, contents, filename, language]
    }
    return response

  def open_file_path(self, path):
    contents = Path(path).open().read()
    filename = path.split("/")[-1]
    extension = Path(path).suffix
    try:
        language = languages_map[extension]
    except KeyError:
        language = "plain_text"
    response = {
      "file": [path, contents, filename, language]
    }
    return response

  def quit(self):
    print("Quark is quitting")
    webview.windows[0].destroy()

  def save_file(self, path, contents):
    with open(path, "w") as f:
      f.write(contents)

  def save_new_file(self):
    result = webview.windows[0].create_file_dialog(webview.SAVE_DIALOG, save_filename="Untitled.file")
    if result == "":
      raise Exception("Saving new file was unsuccessful")
    file = "".join(result)
    # If file doesn't exist create it
    if not Path(file).is_file():
        create_file(file)
    print(file)
    filename = file.split("/")[-1]
    extension = Path(file).suffix
    try:
        language = languages_map[extension]
    except KeyError:
        language = "plain_text"
    fp = open(file, "w")
    fp.close()
    response = {
      "file": [file, filename, language]
    }
    return response
  
  def file_suggestions(self, filename):
    files = folder_contents(filename)
    name = filename.split("/")[-1]
    suggestions = fuzzyfinder(name, files)
    return list(suggestions)

def startup(window):
    window.evaluate_js("startup()")

def main(args):
  debug = args.debug
  if args.file:
    file = Path(args.file).absolute()
  else:
    file = None
  api = Api(file)
  window = webview.create_window("Quark", "gui/index.html", width=1080, height=760, js_api=api, frameless=True, resizable=True, easy_drag=False)
  webview.start(startup, window, debug=debug)
