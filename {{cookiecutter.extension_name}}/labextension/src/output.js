import { Widget } from 'phosphor/lib/ui/widget';

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
    this._source = options.source;
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
  onBeforeDetach(msg) {
    
  }

  /**
   * A render function given the widget's DOM node.
   */
  _render() {
    let json = this._source;
    let text = document.createTextNode(JSON.stringify(json));
    this.node.appendChild(text);
  }

}


export class OutputRenderer {

  /**
   * The mime types this OutputRenderer accepts.
   */
  mimetypes = ['{{cookiecutter.mime_type}}'];

  /**
   * Whether the input can safely sanitized for a given mime type.
   */
  isSanitizable(mimetype) {
    return this.mimetypes.indexOf(mimetype) !== -1;
  }

  /**
   * Whether the input is safe without sanitization.
   */
  isSafe(mimetype) {
    return false;
  }

  /**
   * Render the transformed mime bundle.
   */
  render(options) {
    return new OutputWidget(options);
  }

}
