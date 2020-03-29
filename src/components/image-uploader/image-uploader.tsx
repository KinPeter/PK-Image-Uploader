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
    this.imageSrc = '';
    this.selectedFile = null;
  }

  render() {
    return (
      <Host>
        <div
          class="wrapper"
          onDrop={() => {}}
          onDragOver={() => {}}
          onDragEnter={() => {}}
          onDragLeave={() => {}}
        >
          <label>{this.label}</label>

          {this.imageSrc
            ? <div
                class="box image-box"
                style={{ backgroundImage: `url(${this.imageSrc})` }}
              >
                <button onClick={() => this.onRemove()}>{ this.wording.removeButton }</button>
              </div>

            : <div class="box drop-box">
                <PictureIcon opacity={0.6} width={40}/>
                <p>{ this.wording.boxText }</p>
              </div>
          }
        </div>
      </Host>
    );
  }

}
