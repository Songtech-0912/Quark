import webview
import sys

class Api():

  def quit(self):
    print("Quark is quitting")
    webview.windows[0].destroy()


if __name__ == "__main__":
  api = Api()
  window = webview.create_window("Quark", "gui/index.html", width=1000, height=600, confirm_close=True, js_api=api)
  webview.start(debug=True)
