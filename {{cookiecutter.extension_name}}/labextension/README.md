# {{cookiecutter.extension_name}} Jupyter Lab extension

A Jupyter Lab extension for rendering {{cookiecutter.mime_short_name}} output and {{cookiecutter.mime_short_name}} files

## Prerequisites

* JupyterLab >= 0.11

## Usage

To render [JSON-able dict or list](https://ipython.org/ipython-doc/3/api/generated/IPython.display.html#IPython.display.JSON) in IPython as a tree:

![output renderer](http://g.recordit.co/QAsC7YULcY.gif)

```python
from IPython.display import JSON
JSON({
    'string': 'string',
    'array': [1, 2, 3],
    'bool': True,
    'object': {
        'foo': 'bar'
    }
})
```

To render a {{cookiecutter.mime_short_name}} file as a tree, simply open it:

![file renderer](http://g.recordit.co/cbf0xnQHKn.gif)

## Development

Install dependencies and build Javascript:

```bash
npm install
```

Re-build Javascript:

```bash
npm run build
```

Watch `/src` directory and re-build on changes:

```bash
npm run watch
```
