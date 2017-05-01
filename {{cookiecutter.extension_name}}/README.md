# {{cookiecutter.extension_name}}

A JupyterLab and Jupyter Notebook extension for rendering {{cookiecutter.mime_short_name}}

![output renderer](http://g.recordit.co/QAsC7YULcY.gif)

## Prerequisites

* JupyterLab ^0.20.0 and/or Notebook >=4.3.0

## Usage

To render {{cookiecutter.mime_short_name}} output in IPython:

```python
from {{cookiecutter.extension_name}} import {{cookiecutter.mime_short_name}}

{{cookiecutter.mime_short_name}}({
    "string": "string",
    "array": [1, 2, 3],
    "bool": True,
    "object": {
        "foo": "bar"
    }
})
```

To render a `.{{cookiecutter.file_extension}}` file as a tree, simply open it:

![file renderer](http://g.recordit.co/cbf0xnQHKn.gif)

## Install

```bash
# For JupyterLab
jupyter labextension install {{cookiecutter.extension_name}}
# For Notebook
pip install {{cookiecutter.extension_name}}
jupyter nbextension install --py --sys-prefix {{cookiecutter.extension_name}}
jupyter nbextension enable --py --sys-prefix {{cookiecutter.extension_name}}
```

## Development

```bash
pip install -e .
# For JupyterLab
cd labextension
jupyter labextension link .
# For Notebook
jupyter nbextension install --symlink --py --sys-prefix {{cookiecutter.extension_name}}
jupyter nbextension enable --py --sys-prefix {{cookiecutter.extension_name}}
```
