import { Component, h, Prop, Host } from '@stencil/core';

@Component({
  tag: 'pk-image-uploader',
  styleUrl: 'image-uploader.scss',
  shadow: true
})
export class ImageUploader {

  @Prop() value: string;

  render() {
    return (
      <Host>
        <div>Hello {this.value}</div>
      </Host>
    );
  }

}
