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
   * A message handler invoked on an `'before-detach'` message.
   */
  onBeforeDetach(msg) {}

  /**
   * A render function given the widget's DOM node.
   */
  _render() {
    const text = document.createTextNode(JSON.stringify(this._data));
    this.node.appendChild(text);
  }
}

export class OutputRenderer {
  /**
   * The mime types this OutputRenderer accepts.
   */
  mimeTypes = [ '{{cookiecutter.mime_type}}' ];

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
