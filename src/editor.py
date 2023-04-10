import webview
import sys
from pathlib import Path

class Api():
  def open_file(self):
    result = webview.windows[0].create_file_dialog(webview.OPEN_DIALOG)
    if result == "":
      raise Exception("Choosing file was unsuccessful")
    file = result[0]
    contents = Path(file).open().read()
    response = {
      "file": [file, contents]
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
    print(result)
    file = "".join(result)
    fp = open(file, "w")
    fp.close()
    response = {
      "file": file
    }
    return response

if __name__ == "__main__":
  api = Api()
  window = webview.create_window("Quark", "gui/index.html", width=1000, height=600, js_api=api)
  webview.start(debug=True)
