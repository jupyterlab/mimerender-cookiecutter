/**
 * This file contains the javascript that is run when the notebook is loaded.
 * It contains some requirejs configuration and the `load_ipython_extension` 
 * which is required for any notebook extension.
 */

/**
 * Configure requirejs.
 */
if (window.require) {
  window.require.config({
    map: {
      '*': {
        '{{cookiecutter.extension_name}}': 'nbextensions/{{cookiecutter.extension_name}}/index'
      }
    }
  });
}

/**
 * Export the required load_ipython_extention.
 */
export function load_ipython_extension() {
  define([ 'nbextensions/{{cookiecutter.extension_name}}/index', 'jquery' ], (
    Extension,
    $
  ) =>
    {
      Extension.register_renderer($);
      Extension.render_cells($);
    });
}
