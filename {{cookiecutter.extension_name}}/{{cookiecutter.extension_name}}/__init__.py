from IPython.display import display


# Running `npm run build` will create static resources in the static
# directory of this Python package (and create that directory if necessary).


def _jupyter_labextension_paths():
    return [{
        'name': '{{ cookiecutter.extension_name }}',
        'src': 'static',
    }]

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': '{{ cookiecutter.extension_name }}',
        'require': '{{ cookiecutter.extension_name }}/extension'
    }]


# A display function that can be used within a notebook. E.g.:
#   from {{ cookiecutter.extension_name }} import {{ cookiecutter.mime_short_name }}
#   {{ cookiecutter.mime_short_name }}(data)

def {{ cookiecutter.mime_short_name }}(data):
    bundle = {
        '{{ cookiecutter.mime_type }}': data,
        'application/json': data,
        'text/plain': '<{{ cookiecutter.extension_name }}.{{ cookiecutter.mime_short_name }} object>'
    }
    display(bundle, raw=True)
