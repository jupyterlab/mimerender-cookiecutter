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
