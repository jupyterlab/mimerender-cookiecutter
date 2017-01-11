import React from 'react';
import './index.css';

export default class {{cookiecutter.mime_short_name}} extends React.Component {

  render() {
      return (
        <div className="{{cookiecutter.mime_short_name}}">
          {JSON.stringify(this.props.data)}
        </div>
      );
  }

}
