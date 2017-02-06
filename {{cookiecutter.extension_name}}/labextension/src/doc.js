import { Widget } from 'phosphor/lib/ui/widget';
import { ABCWidgetFactory } from 'jupyterlab/lib/docregistry';
import { ActivityMonitor } from 'jupyterlab/lib/common/activitymonitor';
import React from 'react';
import ReactDOM from 'react-dom';
import {{cookiecutter.mime_short_name}}Component from '{{cookiecutter.extension_name}}_react';

/**
 * The class name added to this DocWidget.
 */
const CLASS_NAME = 'jp-DocWidget{{cookiecutter.mime_short_name}}';

/**
 * The timeout to wait for change activity to have ceased before rendering.
 */
const RENDER_TIMEOUT = 1000;

/**
 * A widget for rendering {{cookiecutter.extension_name}} files.
 */
export class DocWidget extends Widget {
  constructor(context) {
    super();
    this._context = context;
    this.addClass(CLASS_NAME);
    context.model.contentChanged.connect(() => {
      this.update();
    });
    context.pathChanged.connect(() => {
      this.update();
    });
    this._monitor = new ActivityMonitor({
      signal: context.model.contentChanged,
      timeout: RENDER_TIMEOUT
    });
    this._monitor.activityStopped.connect(this.update, this);
  }

  /**
   * Dispose of the resources used by the widget.
   */
  dispose() {
    if (!this.isDisposed) {
      this._context = null;
      ReactDOM.unmountComponentAtNode(this.node);
      this._monitor.dispose();
      super.dispose();
    }
  }

  /**
   * A message handler invoked on an `'update-request'` message.
   */
  onUpdateRequest(msg) {
    this.title.label = this._context.path.split('/').pop();
    if (this.isAttached) {
      let content = this._context.model.toString();
      let json = content ? JSON.parse(content) : {};
      ReactDOM.render(<{{cookiecutter.mime_short_name}}Component data={json} />, this.node);
    }
  }

  /**
   * A message handler invoked on an `'after-attach'` message.
   */
  onAfterAttach(msg) {
    this.update();
  }
}

/**
 * A widget factory for DocWidget.
 */
export class DocWidgetFactory extends ABCWidgetFactory {
  constructor(options) {
    super(options);
  }

  /**
   * Create a new widget given a context.
   */
  createNewWidget(context, kernel) {
    let widget = new DocWidget(context);
    this.widgetCreated.emit(widget);
    return widget;
  }
}
