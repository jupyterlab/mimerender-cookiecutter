from IPython.display import display, JSON
import json


# Running `npm run build` will create static resources in the static
# directory of this Python package (and create that directory if necessary).


def _jupyter_labextension_paths():
    return [{
        'name': '{{cookiecutter.extension_name}}',
        'src': 'static',
    }]

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': '{{cookiecutter.extension_name}}',
        'require': '{{cookiecutter.extension_name}}/extension'
    }]


# A display class that can be used within a notebook. E.g.:
#   from {{cookiecutter.extension_name}} import {{cookiecutter.mime_short_name}}
#   {{cookiecutter.mime_short_name}}(data)
    
class {{cookiecutter.mime_short_name}}(JSON):

    @property
    def data(self):
        return self._data
    
    @data.setter
    def data(self, data):
        if isinstance(data, str):
            data = json.loads(data)
        self._data = data

    def _ipython_display_(self):
        bundle = {
            '{{cookiecutter.mime_type}}': self.data,
            'text/plain': '<{{cookiecutter.extension_name}}.{{cookiecutter.mime_short_name}} object>'
        }
        display(bundle, raw=True)
