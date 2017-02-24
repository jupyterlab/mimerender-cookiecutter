import { Widget } from '@phosphor/widgets';
import { ABCWidgetFactory } from 'jupyterlab/lib/docregistry';
import { ActivityMonitor } from 'jupyterlab/lib/common/activitymonitor';
import React from 'react';
import ReactDOM from 'react-dom';
import {{cookiecutter.mime_short_name}}Component from '{{cookiecutter.extension_name}}_react';

/**
 * The class name added to a DocWidget.
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
      const content = this._context.model.toString();
      try {
        const json = JSON.parse(content);
        const text = document.createTextNode(JSON.stringify(json, null, 2));
        this.node.appendChild(text);
      } catch (error) {
        let container = document.createElement('div');
        container.setAttribute('class', 'jp-RenderedText jp-mod-error');
        container.style.cssText = `width: 100%; text-align: center; padding: 10px; box-sizing: border-box;`
        let titleContainer = document.createElement('span');
        titleContainer.style.cssText = `font-size: 18px; font-weight: 500; padding-bottom: 10px;`
        const titleText = document.createTextNode('Invalid JSON');
        titleContainer.appendChild(titleText);
        container.appendChild(titleContainer);
        let contentContainer = document.createElement('pre');
        contentContainer.style.cssText = `text-align: left; padding: 10px; overflow: hidden;`
        const contentText = document.createTextNode(content);
        contentContainer.appendChild(contentText);
        container.appendChild(contentContainer);
        this.node.innerHTML = '';
        this.node.appendChild(container);
      }
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
    const widget = new DocWidget(context);
    this.widgetCreated.emit(widget);
    return widget;
  }
}
