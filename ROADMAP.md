# Roadmap

This is a roadmap for the Pyrite Project

- [x] Oct 1st

* Basic proof of concept using `Eel` - distribute on Github as release 0.1.1 alpha

  * Able to open and save files

  * Able to use keyboard shortcuts via KeyboardJS

  * Use toasts (that appear at the bottom of the page) to show a notification when the document is saved/a copy is downloaded

  * Able to edit more than one file at once

* Right sidebar

  * Zoom in code

  * Zoom out code

* Basic website with Github Pages and skeletonCSS

- [ ] By Oct 8th - distribute on github as 0.1.2 alpha

* Basic user/developer documentation using PrimerCSS

* Autosaving on edit option implemented

* Fix issues with paste and opening files

  * Make sure that line breaks are preserved when opening files/pasting text

* Implement app tours

  * Update the welcome page to a more modern look 

* More keyboard shortcuts

  * Use `Tab` as keyboard shortcut to create a 3 space indent 

  * Use `Ctrl S` for saving the currently edited file and `Ctrl Shift S` for downloading a copy

* Add Read-only mode to right sidebar

* Add rudimentary tooltips

* Use the shortcut `Ctrl Tab` to switch currently opened file

* Add help assistant (launches in a separate window, like Mac's apple help system)

* Add option to edit multiple files

* Add the "Saved" sign on the menu bar, next to the title

* Add option for new file (this time it creates ACTUAL files instead of "virtual" files)

- [ ] By October 12th - distribute on github as 0.1.3 alpha

* Create (separate window) Preferences menu

  * Save settings as a `.yml`, `.yaml` or `.json` file

  * Toggle on/off native menu bar

  * Toggle on/off autosave (default on)

  * Toggle on/off Zen mode (default off)

  * Toggle on/off Auto-detect language (default on)

  * Toggle on/off tooltips (default on)

  * Change toast duration (default)

  * Auto reopen last session (default off)

  * Show guided tours (button)

  * Always enable line wrapping (default on)

  * Text Encoding (default UTF-8)

  * Indentation style (default setto 'tabs')

  * Choose editor theme

    * Default Dark theme (default theme)

    * Default Light theme

    * Material Dark theme (based on [this](https://material-theme.site/))

    * Material Light theme (based on [this](https://material-theme.site/))

    * Midnight theme

    * Github theme

  * Change keyboard bindings

    * Default

    * Custom

    * Vim

    * Atom

    * VS Code

    * Spacemacs

- [ ] By October 14th - distribute on github as 0.1.4 alpha

* Split screen

* Right-click context menu

  * Add new comment

  * Comment selection

  * Uncomment selection

  * Duplicate selection...

    * to new line

    * to cursor position

  * Cut 

  * Copy

  * Paste

  * Move selected lines...

    * Up

    * Down


- [ ] By October 16th - distribute on github as 0.1.5 alpha

* Work on backend

  * Syntax Highlight

  * Find and Replace

* Prompt save before quiting

* Create the welcome.md file

  * Write about Pyrite's backgound

  * Ask user to (optionally) show tours after finishing reading the file 

* Rename file

- [ ] By October 18th - - distribute on github as 0.1.6 alpha

* Tooltips

* Saved/unsaved sign on the menu bar

* Keyboard bindings with Mousetrap JS

  * Run a function (with fuzzy search) using spacebar key

- [ ]  By October 22th - distribute on github as 0.1.7 alpha

* Auto adds closing brackets

* Brace matching (if you click on one brace, it will highlight the other and draw a horizontal ruler to it)

* Auto code indentatation

- [ ]  By October 24th - distribute on github as 0.1.8 alpha

* Right click context menu with options to format code, cut, copy, paste, etc.

- [ ]  By October 26th - distribute on github as 0.1.9 alpha

* Test on very large files of over 100MB (e.g. the anaconda installer)

- [ ] By October 28th - distribute on github as 0.1 beta

* Do user testing

- [ ] By October 30th - distribute on github as release 0.1 

* Package with `pyinstaller` in a Python virtual environment

* Use only these packages:

```
  - bottle [required: Any, installed: 0.12.18]
  - bottle-websocket [required: Any, installed: 0.2.9]
    - bottle [required: Any, installed: 0.12.18]
    - gevent-websocket [required: Any, installed: 0.10.1]
      - gevent [required: Any, installed: 20.6.2]
        - greenlet [required: >=0.4.16, installed: 0.4.16]
        - setuptools [required: Any, installed: 49.2.0.post20200714]
        - zope.event [required: Any, installed: 4.5.0]
          - setuptools [required: Any, installed: 49.2.0.post20200714]
        - zope.interface [required: Any, installed: 5.1.0]
          - setuptools [required: Any, installed: 49.2.0.post20200714]
  - future [required: Any, installed: 0.18.2]
  - pyparsing [required: Any, installed: 2.4.7]
  - whichcraft [required: Any, installed: 0.6.1]

```

* Reduce executable size as much as possible

* Track memory usage and ensure that it uses no more than 50MB of RAM at one time

* (Maybe, in the next release) [intelligent code completion](https://en.wikipedia.org/wiki/Intelligent_code_completion) (forked on [atom's](https://github.com/atom/autocomplete-plus) or [Kite](https://github.com/kiteco/atom-plugin)) as a plugin

* (Maybe, in the future) markdown code preview

* (Maybe, if we have time) a linter/code error alerts system

* (Maybe) plugin for [code refactoring](https://en.wikipedia.org/wiki/Code_refactoring)

* (Maybe) emmet plugin
