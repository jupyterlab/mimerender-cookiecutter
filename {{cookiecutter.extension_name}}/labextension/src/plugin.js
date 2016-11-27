import { IRenderMime } from 'jupyterlab/lib/rendermime';
import { IDocumentRegistry } from 'jupyterlab/lib/docregistry';
import { OutputRenderer } from './output';
import { DocWidgetFactory } from './doc';
import './index.css';

/**
 * Activate the table widget extension.
 */
function activatePlugin(app, rendermime, registry) {

  /**
   * Add the MIME type  renderer to the top of the renderers.
   */
  rendermime.addRenderer('{{cookiecutter.mime_type}}', new OutputRenderer(), 0);
  
  if ('{{cookiecutter.file_extension}}') {
    /**
     * The list of file extensions for json.
     */
    const EXTENSIONS = ['.{{cookiecutter.file_extension}}'];
    const DEFAULT_EXTENSIONS = ['.{{cookiecutter.file_extension}}'];

    /**
     * Add file handler for {{cookiecutter.file_extension}} files.
     */
    let options = {
      fileExtensions: EXTENSIONS,
      defaultFor: DEFAULT_EXTENSIONS,
      name: '{{cookiecutter.mime_short_name}}',
      displayName: '{{cookiecutter.mime_short_name}}',
      modelName: 'text',
      preferKernel: false,
      canStartKernel: false
    };

    registry.addWidgetFactory(new DocWidgetFactory(options));
  }

}

const Plugin = {
  id: 'jupyter.extensions.{{cookiecutter.mime_short_name}}',
  requires: '{{cookiecutter.file_extension}}' ? [IRenderMime, IDocumentRegistry] : [IRenderMime],
  activate: activatePlugin,
  autoStart: true
};

export default Plugin;
