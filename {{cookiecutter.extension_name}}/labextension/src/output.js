import { Widget } from '@phosphor/widgets';

/**
 * The class name added to this OutputWidget.
 */
const CLASS_NAME = 'jp-OutputWidget{{cookiecutter.mime_short_name}}';

/**
 * A widget for rendering {{cookiecutter.mime_short_name}}.
 */
export class OutputWidget extends Widget {
  constructor(options) {
    super();
    this.addClass(CLASS_NAME);
    this._mimeType = options.mimeType
    this._data = options.model.data.get(options.mimeType);
    this._metadata = options.model.metadata.get(options.mimeType);
  }

  /**
   * A message handler invoked on an `'after-attach'` message.
   */
  onAfterAttach(msg) {
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
   * A message handler invoked on an `'before-detach'` message
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
   * A message handler invoked when the widget is resized
   */
  onResize(msg) {
    /* Update tracked widget and height values */
    this._width = msg.width;
    this._height = msg.height;
    /* Re-render on resize */
    this.update();
  }

  /**
   * A render function given the widget's DOM node.
   */
  _render() {
    const text = document.createTextNode(JSON.stringify(this._data));
    this.node.appendChild(text);
    // // Inject static HTML into mime bundle
    // this._data.set('text/html', renderStaticHTML(this._data))
  }
}

export class OutputRenderer {
  /**
   * The mime types this OutputRenderer accepts.
   */
  mimeTypes = ['{{cookiecutter.mime_type}}'];

  /**
   * Whether the renderer can render given the render options.
   */
  canRender(options) {
    return this.mimeTypes.indexOf(options.mimeType) !== -1;
  }

  /**
   * Render the transformed mime bundle.
   */
  render(options) {
    return new OutputWidget(options);
  }
}
