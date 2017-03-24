import { Widget } from '@phosphor/widgets';
import { ABCWidgetFactory } from '@jupyterlab/docregistry';
import { ActivityMonitor } from '@jupyterlab/coreutils';
import { runMode } from '@jupyterlab/codemirror';

const CLASS_NAME = 'jp-DocWidget{{cookiecutter.mime_short_name}}';
const RENDER_TIMEOUT = 1000;

/**
 * A widget for rendering {{cookiecutter.extension_name}} files
 */
export class DocWidget extends Widget {
  constructor(context) {
    super();
    this._context = context;
    /* Re-render when the document content changes */
    context.model.contentChanged.connect(() => {
      this.update();
    });
    /* Re-render when the document path changes */
    context.pathChanged.connect(() => {
      this.update();
    });
    /* Throttle re-renders until changes have stopped */
    this._monitor = new ActivityMonitor({
      signal: context.model.contentChanged,
      timeout: RENDER_TIMEOUT
    });
    this._monitor.activityStopped.connect(this.update, this);
    /* Track widget width and height */
    this._width = this.node.offsetWidth;
    this._height = this.node.offsetHeight;
    this.addClass(CLASS_NAME);
  }

  /**
   * Dispose of the resources used by the widget
   */
  dispose() {
    if (!this.isDisposed) {
      this._context = null;
      this._monitor.dispose();
      super.dispose();
    }
  }

  /**
   * A message handler invoked on an `'after-attach'` message
   */
  onAfterAttach(msg) {
    /* Render initial data */
    this.update();
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
   * A message handler invoked on an `'update-request'` message
   */
  onUpdateRequest(msg) {
    this.title.label = this._context.path.split('/').pop();
    if (this.isAttached) {
      const content = this._context.model.toString();
      try {
        const data = JSON.parse(content);
        const text = document.createTextNode(JSON.stringify(data));
        this.node.appendChild(text);
      } catch (error) {
        const container = document.createElement('div');
        container.setAttribute('class', 'jp-RenderedText jp-mod-error');
        container.style.cssText = `width: 100%; text-align: center; padding: 10px; box-sizing: border-box;`;
        const titleContainer = document.createElement('span');
        titleContainer.style.cssText = `font-size: 18px; font-weight: 500; padding-bottom: 10px;`;
        const titleText = document.createTextNode('Invalid JSON');
        titleContainer.appendChild(titleText);
        container.appendChild(titleContainer);
        const contentContainer = document.createElement('pre');
        contentContainer.className = 'CodeMirror cm-s-jupyter CodeMirror-wrap';
        contentContainer.style.cssText = `text-align: left; padding: 10px; overflow: hidden;`;
        runMode(content, { name: 'javscript', json: true }, contentContainer);
        container.appendChild(contentContainer);
        this.node.innerHTML = '';
        this.node.appendChild(container);
      }
    }
  }
}

/**
 * A widget factory for DocWidget
 */
export class DocWidgetFactory extends ABCWidgetFactory {
  constructor(options) {
    super(options);
  }

  /**
   * Create a new widget instance
   */
  createNewWidget(context, kernel) {
    const widget = new DocWidget(context);
    this.widgetCreated.emit(widget);
    return widget;
  }
}
