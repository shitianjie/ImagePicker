import React from 'react';

import './ImagePicker.scss';

function noop() {};

export default class ImagePicker extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showPopupMsg: ''
    }
    this.addImage =  this.addImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.loadFile = this.loadFile.bind(this);
  }

  addImage(imgItem) {
    const {files, onChange, name} = this.props;
    const newImgs = files.concat(imgItem);
    onChange(name, newImgs, 'add');
  }

  removeImage(index) {
    const {files, onChange, name} = this.props;
    let newImgs = [];
    files.forEach((item, i) => {
      if(index !== i) newImgs.push(item);
    });
    onChange(name, newImgs, 'remove');
  }

  loadFile() {
    const {name} = this.props;
    const fileInputEl = this.fileInput;
    const selectedFile = fileInputEl.files[0];
    if(fileInputEl.files && fileInputEl.files.length && selectedFile) {
      const reader = new FileReader();
      reader.onerror = () => {
        this.setState({
          showPopupMsg: '图片获取失败'
        })
      }
      reader.onload = () => {
        const dataUrl = reader.result;
        if(!dataUrl) {
          this.setState({
            showPopupMsg: '图片获取失败'
          })
        }
        this.addImage({
          url: dataUrl,
          file: selectedFile,
          name
        })
      }
      reader.readAsDataURL(selectedFile);
    }
  }

  render() {
    const {
      files,
      onChange,
      selectable,
      preCls
    } = this.props;

    const selectEl = (
      <div className={`${preCls}-upload-btn`} role="button" aria-label="Choose and add an image">
        <input
          type="file"
          accept="image/*"
          onChange={this.loadFile}
          ref={(input) => {this.fileInput = input}}
        />
      </div>
    );

    const imgNodes = !!files.length && files.map((item, index) => {
      const imgStyle = {
        backgroundImage: `url(${item.url})`
      }

      return (
        <div className={`${preCls}-item`}>
          <div className={`${preCls}-item-remove`} role="button" aria-label="Click and remove the image" onClick={() => this.removeImage(index)}></div>
          <div className={`${preCls}-item-content`} role="button" aria-label="Image can be clicked" style={imgStyle}></div>
        </div>
      )
    })

    return (
      <section>
        {imgNodes}
        {selectable && selectEl}
      </section>
    )
  }
}

ImagePicker.propTypes = {
  files: React.PropTypes.array,
  onChange: React.PropTypes.func,
  selectable: React.PropTypes.bool,
  preCls: React.PropTypes.string,
  name: React.PropTypes.string,
}

ImagePicker.defaultProps = {
  files: [],
  onChange: noop,
  selectable: false,
  preCls: 'img-picker',
  name: ''
}
