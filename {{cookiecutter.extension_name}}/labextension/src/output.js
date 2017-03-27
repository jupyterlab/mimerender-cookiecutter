import { Widget } from '@phosphor/widgets';

const MIME_TYPE = '{{cookiecutter.mime_type}}';
const CLASS_NAME = 'jp-OutputWidget{{cookiecutter.mime_short_name}}';

/**
 * A Phosphor widget for rendering {{cookiecutter.mime_short_name}}
 */
export class OutputWidget extends Widget {
  constructor(options) {
    super();
    this._mimeType = options.mimeType;
    this._data = options.model.data;
    this._metadata = options.model.metadata;
    this.addClass(CLASS_NAME);
  }

  /**
   * A message handler invoked on an `'after-attach'` message
   */
  onAfterAttach(msg) {
    /* Render initial data */
    this._render();
  }

  /**
   * A message handler invoked on an `'before-detach'` message
   */
  onBeforeDetach(msg) {
    /* Dispose of resources used by this widget */
    // renderLibrary.dispose(this.node);
  }

  /**
   * A message handler invoked on an `'child-added'` message
   */
  onChildAdded(msg) {
    /* e.g. Inject a static image representation into the mime bundle for
     *  endering on Github, etc. 
     */
    // renderLibrary.toPng(this.node).then(url => {
    //   const data = url.split(',')[1];
    //   this._data.set('image/png', data);
    // })
  }

  /**
   * A message handler invoked on a `'resize'` message
   */
  onResize(msg) {
    /* Update tracked widget and height values */
    this._width = msg.width;
    this._height = msg.height;
    /* Re-render on resize */
    this.update();
  }

  /**
   * Render data to DOM node
   */
  _render() {
    const data = this._data.get(this._mimeType);
    const metadata = this._metadata.get(this._mimeType);
    const text = document.createTextNode(JSON.stringify(data));
    this.node.appendChild(text);
  }
}

export class OutputRenderer {
  /**
   * The mime types that this OutputRenderer accepts
   */
  mimeTypes = [MIME_TYPE];

  /**
   * Whether the renderer can render given the render options
   */
  canRender(options) {
    return this.mimeTypes.indexOf(options.mimeType) !== -1;
  }

  /**
   * Render the transformed mime bundle
   */
  render(options) {
    return new OutputWidget(options);
  }
}
