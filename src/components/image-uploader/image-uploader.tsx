import { Component, h, Prop, Host, State, Event, EventEmitter, Watch } from '@stencil/core';
import { imageUploaderWording } from './image-uploader.wording';
import { PictureIcon } from './picture-icon';

@Component({
  tag: 'pk-image-uploader',
  styleUrl: 'image-uploader.scss',
  shadow: true
})
export class ImageUploader {

  @Prop() image: string;
  @Prop() label: string;
  @Prop({ attribute: 'width-min' }) minImageWidth: number = 320;
  @Prop({ attribute: 'height-min' }) minImageHeight: number = 240;
  @Prop({ attribute: 'width-max' }) maxImageWidth: number = 6000;
  @Prop({ attribute: 'height-max' }) maxImageHeight: number = 4000;
  @Prop({ attribute: 'size-max' }) maxFileSize: number = 5;

  @State() imageSrc: string;
  @State() selectedFile: File | null;
  @State() isInvalid: boolean = false;
  @State() errorMessage: string = '';
  @State() isDragging: boolean = false;

  @Event() imagechange: EventEmitter;

  wording = imageUploaderWording;

  componentWillLoad() {
    this.imageSrc = this.image;
  }

  @Watch('selectedFile')
  onSelectedFileChange(newValue: File | null) {
    this.imagechange.emit(newValue);
  }

  onRemove() {
    this.imageSrc = null;
    this.selectedFile = null;
  }

  onBrowse() {

  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging = false;
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
    this.isDragging = true;
  }

  onDragEnter(e: DragEvent) {
    e.preventDefault();
    this.isDragging = true;
    this.imageSrc = null;
  }

  onDragLeave(e: DragEvent) {
    e.preventDefault();
    this.isDragging = false;
  }

  render() {
    return (
      <Host>
        <div
          class="wrapper"
          onDrop={(e) => this.onDrop(e)}
          onDragOver={(e) => this.onDragOver(e)}
          onDragEnter={(e) => this.onDragEnter(e)}
          onDragLeave={(e) => this.onDragLeave(e)}
        >
          <label>{this.label}</label>

          {this.imageSrc
            ? <div
                class="box image-box"
                style={{ backgroundImage: `url(${this.imageSrc})` }}
              >
                <button onClick={() => this.onRemove()}>{ this.wording.removeButton }</button>
              </div>

            : <div class={{
                  'box': true,
                  'drop-box': true,
                  'dragging': this.isDragging,
                  'invalid': this.isInvalid
                }}
              >
                <div class="drop-box-content">
                  <PictureIcon opacity={0.6} width={40}/>
                  <p>{ this.wording.boxText }</p>
                  <button onClick={() => this.onBrowse()}>{ this.wording.browseButton }</button>
                  <small class="hint">
                    { this.wording.hint(this.minImageWidth, this.minImageHeight, this.maxImageWidth, this.maxImageHeight, this.maxFileSize) }
                  </small>
                  {this.isInvalid && this.errorMessage
                    ? <small class="error-message">
                        { this.errorMessage }
                      </small>
                    : null
                  }
                </div>
              </div>
          }
        </div>
      </Host>
    );
  }

}
