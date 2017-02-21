import os, sys, pipes
from subprocess import check_call
from distutils import log
from setuptools import setup
from setuptools.command.develop import develop

repo_root = os.path.dirname(os.path.abspath(__file__))
# sym_link = '--symlink' if sys.platform != 'win32' else ''
# sys_prefix = '--sys-prefix' if os.environ.get('CONDA_DEFAULT_ENV', os.defpath) else ''

if sys.platform == 'win32':
    from subprocess import list2cmdline
else:
    def list2cmdline(cmd_list):
        return ' '.join(map(pipes.quote, cmd_list))
        
def run(cmd, *args, **kwargs):
    """Echo a command before running it"""
    log.info('> ' + list2cmdline(cmd))
    kwargs['shell'] = (sys.platform == 'win32')
    return check_call(cmd, *args, **kwargs)
    
def which(*args):
    try:
        run([*args, '--version'])
        return True
    except:
        return False

def build_labextension():
    # Check if npm is installed
    if not which('npm'):
        log.error('npm unavailable')
    # Install Node depedencies for labextension
    try:
        log.info('Installing labextension dependencies. This may take a while...')
        run(['npm', 'install'], cwd=os.path.join(repo_root, 'labextension'))
    except OSError as e:
        log.error("Failed to install Node  dependencies for labextension: %s" % e)
        raise
        
def build_nbextension():
    # Check if npm is installed
    if not which('npm'):
        log.error('npm unavailable')
    # Install Node depedencies for nbextension
    try:
        log.info('Installing nbextension dependencies. This may take a while...')
        run(['npm', 'install'], cwd=os.path.join(repo_root, 'nbextension'))
    except OSError as e:
        log.error("Failed to install Node  dependencies for nbextension: %s" % e)
        raise
        
def install_labextension():
    # Check that jupyter lab is installed
    if not which('jupyter', 'lab'):
        log.error('jupyter lab unavailable')
    # Install labextension
    try:
        run(['jupyter', 'labextension', 'install', '--py', sym_link, sys_prefix, '{{cookiecutter.extension_name}}'], cwd=repo_root)
    except OSError as e:
        log.error("Failed to install labextension: %s" % e)
        raise
    # Enable labextension
    try:
        run(['jupyter', 'labextension', 'enable', '--py', sys_prefix, '{{cookiecutter.extension_name}}'], cwd=repo_root)
    except OSError as e:
        log.error("Failed to enable labextension: %s" % e)
        raise

def install_nbextension():
    # Check that jupyter notebook is installed
    if not which('jupyter', 'notebook'):
        log.error('jupyter notebook unavailable')
    # Install nbextension
    try:
        run(['jupyter', 'nbextension', 'install', '--py', sym_link, sys_prefix, '{{cookiecutter.extension_name}}'], cwd=repo_root)
    except OSError as e:
        log.error("Failed to install nbextension: %s" % e)
        raise
    # Enable nbextension
    try:
        run(['jupyter', 'nbextension', 'enable', '--py', sys_prefix, '{{cookiecutter.extension_name}}'], cwd=repo_root)
    except OSError as e:
        log.error("Failed to enable nbextension: %s" % e)
        raise
        
class BuildCommand(develop):
    """Build Javascript extensions after Python installation"""
    def run(self):
        build_labextension()
        build_nbextension()
        develop.run(self)
        
setup_args = dict(
    name                 = '{{cookiecutter.extension_name}}',
    version              = '0.17.0',
    packages             = ['{{cookiecutter.extension_name}}'],
    author               = '{{cookiecutter.author_name}}',
    author_email         = '{{cookiecutter.author_email}}',
    keywords             = ['jupyter', 'jupyterlab', 'labextension', 'notebook', 'nbextension'],
    include_package_data = True,
    install_requires = [
        'jupyterlab>=0.17.0',
        'ipython>=1.0.0'
    ],
    cmdclass                = {
        'develop': BuildCommand
    }
)
        
if __name__ == '__main__':
    setup(**setup_args)
