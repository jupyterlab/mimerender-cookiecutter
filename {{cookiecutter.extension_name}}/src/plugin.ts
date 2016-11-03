import {
  JupyterLab,
  JupyterLabPlugin
} from 'jupyterlab/lib/application';

import {
  IRenderMime
} from 'jupyterlab/lib/rendermime';

import {
  MimeRenderer
} from './renderer';

import './index.css';

/**
 * Activate the table widget extension.
 */
function activateJSONPlugin(app: JupyterLab, rendermime: IRenderMime): void {

  /**
   * Add the MIME type based renderer(s) at the beginning of the renderers.
   */
  rendermime.addRenderer('{{ cookiecutter.mime_type }}', new MimeRenderer(), 0);

}

/**
 * Initialization data for the {{ cookiecutter.extension_name }} extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: '{{ cookiecutter.extension_name }}',
  requires: [IRenderMime],
  activate: activateJSONPlugin,
  autoStart: true
};

export default extension;
