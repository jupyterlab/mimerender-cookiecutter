# mimerender-cookiecutter

A [cookiecutter](https://github.com/audreyr/cookiecutter) template for creating
a JupyterLab and Jupyter Notebook extension for rendering specific mime types and file extensions.

## Examples

* [jupyterlab_json](https://github.com/jupyterlab/jupyterlab_json)
* [jupyterlab_geojson](https://github.com/jupyterlab/jupyterlab_geojson)
* [jupyterlab_plotly](https://github.com/gnestor/jupyterlab_plotly)
* [jupyterlab_table](https://github.com/gnestor/jupyterlab_table)

## Branches

* [React](https://github.com/jupyterlab/mimerender-cookiecutter/tree/react)

## Usage

Install cookiecutter:

```
pip install cookiecutter
```

Use cookiecutter to generate a package:

```
cookiecutter https://github.com/jupyterlab/mimerender-cookiecutter
```

## Prompts

The cookiecutter will prompt you with the following questions and generate a project according to your responses:
  
* `author_name`: Your full name. This will be used in the generated Python and npm packages.
* `author_email`: Your email address. This will be used in the generated Python and npm packages.
* `mime_type`: A valid mime type (e.g. `application/json`, `application/geo+json`). This will be used to render output data of this mime type with your extension.
* `mime_short_name`: A display name (no spaces) for your mime type (e.g. `JSON`, `GeoJSON`). This will be used in the generated Python and npm packages, README, and class names.
* `file_extension`: **_OPTIONAL_** A valid file extension (e.g. `json`, `geojson`). This will be used to open files of this type with your extension.
* `extension_name`: Your JupyterLab and Jupyter Notebook extension name (e.g. `jupyerlab_json`, `jupyerlab_geojson`).

## Project structure

The project is divided into 2 top-level directories, one for each extension (lab and notebook). 

In most cases, you will only need to edit the `OutputWidget._render` method in `labextension/src/output.js` (for rendering output data of a specific mime type) and the `DocWidget.onUpdateRequest` method in `labextension/src/doc.js` (if your extension should render files of a specific type). 

* `extension_name`
  * `extension_name`: The Python package
    * `static`: Compiled Javascript for both extensions
    * `__init__.py`: Exports paths and metadata of lab and notebook extensions and exports an optional `display` method that can be imported into a notebook and used to easily display data using this renderer
  * `labextension`: The JupyterLab extension
    * `src`
      * `doc.js`: Widget/widget factory used for opening files with an extension of `file_extension` defined in prompts
      * `index.css`: CSS styles for extension
      * `plugin.js`: Entry point for the JupyterLab extension
      * `output.js`: Widget/widget factory for rendering outputs of `mime_type` defined in prompts
  * `nbextension`: The Jupyter Notebook extension
    * `src`
      * `embed.js`: Entry point for embedded widget
      * `extension.js`: Integration point with Jupyter Notebook
      * `index.js`: Entry point for the Jupyter Notebook extension
      * `renderer.js`: Methods for rendering output data of `mime_type` defined in prompts

## Workflow

This cookiecutter will change over time to adapt to API changes and best practices, so you should be able to rebase your extension from an updated version of the cookiecutter. The following is the recommended workflow: 

![workflow](workflow.png)

* Create a branch called `cookiecutter` that will serve as the base for another branch called `develop`. All feature branches shoud be based on `develop` and merged into `master`. 
* When a new version of mimerender-cookiecutter is available, checkout `cookiecutter` branch and re-run the cookiecutter command from the repository root's parent directory: `cookiecutter https://github.com/jupyterlab/mimerender-cookiecutter [--checkout BRANCH_NAME] --replay --overwrite-if-exists`. This will regenerate the cookiecutter using the original inputs and overwrite any existing files in the project. 
* Commit these changes to `cookiecutter` with a message like "mimerender-cookiecutter 0.16.0".
* Checkout the `develop` branch and rebase it from `cookiecutter`: `git rebase -i cookiecutter`. You will most likely encounter some merge conflicts, so resolve them and complete the rebase using `git rebase --continue`. 
* Publish a new version of your extension by following the instructions in `RELEASE.md`. Specifically, update the version numbers and commit your changes with a message like "0.16.0", then merge the `develop` branch into `master`, create a new git tag, push the `master` branch and tag to your remote, and build and upload your distribution.

## Package names  

We suggest that extension names start with `jupyterlab_` and use underscores if needed to improve readability, such as `jupyterlab_myextension`.
