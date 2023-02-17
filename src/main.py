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
    print(f"Saving to {path}")
    with open(path, "w") as f:
      f.write(contents)


if __name__ == "__main__":
  api = Api()
  window = webview.create_window("Quark", "gui/index.html", width=1000, height=600, confirm_close=True, js_api=api)
  webview.start(debug=True)
