from setuptools import setup
from jupyter_packaging import create_cmdclass, install_npm

cmdclass = create_cmdclass(['js'])
cmdclass['js'] = install_npm()

setup_args = dict(
    name                    = '{{cookiecutter.extension_name}}',
    description             = 'Jupyter {{cookiecutter.mime_short_name}} extension',
    long_description        = """
    A JupyterLab and Jupyter Notebook extension for rendering {{cookiecutter.mime_short_name}}
    """,
    version                 = '0.17.0',
    packages                = ['{{cookiecutter.extension_name}}'],
    author                  = '{{cookiecutter.author_name}}',
    author_email            = '{{cookiecutter.author_email}}',
    url                     = 'http://jupyter.org',
    license                 = 'BSD',
    platforms               = 'Linux, Mac OS X, Windows',
    keywords                = ['jupyter', 'jupyterlab', 'labextension', 'notebook', 'nbextension'],
    classifiers             = [
        'Intended Audience :: Developers',
        'Intended Audience :: System Administrators',
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: BSD License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
    ],
    cmdclass                = cmdclass,
    install_requires        = [
        'notebook>=4.3.0',
        'jupyterlab>=0.17.0',
        'ipython>=1.0.0'
    ]
)

if __name__ == '__main__':
    setup(**setup_args)
