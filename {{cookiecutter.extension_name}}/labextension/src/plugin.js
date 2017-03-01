import { IRenderMime } from 'jupyterlab/lib/rendermime';
import { IDocumentRegistry } from 'jupyterlab/lib/docregistry';
import { toArray, ArrayExt } from '@phosphor/algorithm';
import { OutputRenderer } from './output';
import { DocWidgetFactory } from './doc';
import './index.css';

/**
 * Activate the extension.
 */
function activatePlugin(app, rendermime, registry) {
  /**
   * Calculate the index of the renderer in the array renderers (e.g. Insert 
   * this renderer after any renderers with mime type that matches "+json") 
   * or simply pass an integer such as 0.
   */
  // const index = ArrayExt.findLastIndex(
  //   toArray(rendermime.mimeTypes()),
  //   mime => mime.endsWith('+json')
  // ) + 1;
  const index = 0;

  /**
   * Add the renderer to the registry of renderers.
   */
  rendermime.addRenderer(
    {
      mimeType: '{{cookiecutter.mime_type}}',
      renderer: new OutputRenderer()
    },
    index
  );

  if ('{{cookiecutter.file_extension}}') {
    /**
     * Set the extensions associated with {{cookiecutter.mime_short_name}}.
     */
    const EXTENSIONS = [ '.{{cookiecutter.file_extension}}' ];
    const DEFAULT_EXTENSIONS = [ '.{{cookiecutter.file_extension}}' ];

    /**
     * Add file handler for {{cookiecutter.file_extension}} files.
     */
    const options = {
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
  requires: '{{cookiecutter.file_extension}}'
    ? [ IRenderMime, IDocumentRegistry ]
    : [ IRenderMime ],
  activate: activatePlugin,
  autoStart: true
};

export default Plugin;
