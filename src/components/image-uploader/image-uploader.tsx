import { Component, h, Prop, Host, State, Event, EventEmitter } from '@stencil/core';
import { imageUploaderWording } from './image-uploader.wording';

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

  render() {
    return (
      <Host>
        <label>{this.label}</label>
      </Host>
    );
  }

}
