# mimerender-cookiecutter

A [cookiecutter](https://github.com/audreyr/cookiecutter) template for creating
a JupyterLab and Jupyter Notebook extension for rendering specific mime types. See the [master branch](https://github.com/jupyterlab/mimerender-cookiecutter) of this repo for a non-React cookiecutter.

## Examples

* [jupyterlab_json](https://github.com/jupyterlab/jupyterlab_json)
* [jupyterlab_plotly](https://github.com/gnestor/jupyterlab_plotly)

## Usage

Install cookiecutter:

```
pip install cookiecutter
```

Use cookiecutter to generate a package:

```
cookiecutter https://github.com/jupyterlab/mimerender-cookiecutter  --checkout react
```

## Prompts

The cookiecutter will prompt you with the following questions and generate a project according to your responses:
  
* `author_name`: Your full name. This will be used in the generated Python and npm packages.
* `author_email`: Your email address. This will be used in the generated Python and npm packages.
* `mime_type`: A valid mime type (e.g. `application/json`, `application/table-schema+json`). This will be used to render output data of this mime type with your extension.
* `mime_short_name`: A display name (no spaces) for your mime type (e.g. `JSON`, `JSONTable`). This will be used in the generated Python and npm packages, README, and class names.
* `file_extension`: **_OPTIONAL_** A valid file extension (e.g. `json`, `xml`). This will be used to open files of this type with your extension.
* `extension_name`: Your JupyterLab and Jupyter Notebook extension name (e.g. `jupyerlab_json`, `jupyerlab_table`).

## Project structure

The project is divided into 3 top-level directories, one for each extension (lab and notebook) and one for the React component(s). 

In most cases, you will only need to edit the contents of the `component` directory. When building the Javascript, the `/component` directory will be copied to the `src` directory of both extensions and then the Javascript in the `src` directories will be built using webpack and output in `extension_name/static`. 

* `extension_name`
  * `extension_name`: The Python package
    * `static`: Compiled Javascript for both extensions
  * `component`: The React component(s)
    * `index.js`: Entry point for React component(s)
  * `labextension`: The Jupyter Lab extension
    * `src`
      * `doc.js`: Widget/widget factory used for opening files with an extension of `file_extension` defined in prompts
      * `index.css`: CSS styles for extension
      * `plugin.js`: Entry point for the Jupyter Lab extension
      * `output.js`: Widget/widget factory for rendering outputs of `mime_type` defined in prompts
  * `nbextension`: The Jupyter Notebook extension
    * `src`
      * `embed.js`: Entry point for embedded widget
      * `extension.js`: Integration point with Jupyter Notebook
      * `index.js`: Entry point for the Jupyter Notebook extension
      * `renderer.js`: Methods for rendering output data of `mime_type` defined in prompts

## Package names  

We suggest that extension names start with `jupyterlab_` and use underscores if needed to improve readability, such as `jupyterlab_myextension`.
