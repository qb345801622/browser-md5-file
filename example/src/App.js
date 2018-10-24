import React, { Component } from 'react';
import BMF from 'browser-md5-file';

import './css/App.css';

class App extends Component {
  state = {
    text: '',
    progress: 0,
  };
  componentDidMount() {
    const bmf = new BMF();
    setTimeout(() => {
      const el = document.getElementById('upload');
      el.addEventListener(
        'change',
        e => {
          const file = e.target.files[0];
          bmf.md5(
            file,
            (err, md5) => {
              console.log('err:', err);
              console.log(md5); // 97027eb624f85892c69c4bcec8ab0f11
              this.setState({ text: md5 });
            },
            progress => {
              console.log('progress:', progress);
              this.setState({ progress });
            },
          );
        },
        false,
      );
    }, 100);
  }

  render() {
    return (
      <div className="App text-center">
        <br />
        <h1>
          Browser-md5-file{' '}
          <a
            className="github"
            href="https://github.com/forsigner/browser-md5-file"
            target="_blank"
          >
            <i className="fa fa-github" />
          </a>
        </h1>
        <div className="text-center" />
        <br />
        <span id="upload" className="btn-upload btn-file">
          Upload File
          <input type="file" id="btn-guid" />
        </span>
        <br />
        <br />

        {this.state.progress > 0 && (
          <div id="text" className="text text-center">
            {this.state.progress}
          </div>
        )}

        <div id="text" className="text text-center">
          {this.state.text}
        </div>
      </div>
    );
  }
}

export default App;
