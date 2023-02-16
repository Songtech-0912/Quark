import webview

if __name__ == "__main__":
  webview.create_window("Quark", "gui/index.html", min_size=(1440, 900))
  webview.start()
