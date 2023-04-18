import webview
import sys
from pathlib import Path

languages_map = {
    "": "plain_text",
    ".js": "javascript",
    ".py": "python",
    ".html": "html",
    ".css": "css",
    ".rs": "rust",
    ".md": "markdown",
    ".c": "c",
    ".cpp": "cpp",
    ".txt": "plain_text",
    ".java": "java",
    ".yml": "yaml",
    ".json": "json",
    ".lua": "lua"
}

class Api():
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
    language = languages_map[extension]
    response = {
      "file": [file, contents, filename, language]
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
    fp = open(file, "w")
    fp.close()
    response = {
      "file": file
    }
    return response

def main(debug=False):
  api = Api()
  window = webview.create_window("Quark", "gui/index.html", width=1080, height=760, js_api=api, frameless=True, resizable=True, easy_drag=False)
  webview.start(debug=debug)
