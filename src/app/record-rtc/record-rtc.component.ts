import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
let RecordRTC = require('recordrtc/RecordRTC.min');

@Component({
  selector: 'record-rtc',
  templateUrl: './record-rtc.component.html',
  styleUrls: ['./record-rtc.component.scss']
})
export class RecordRTCComponent implements AfterViewInit{

  private stream: MediaStream;
  private recordRTC: any;

  @ViewChild('video') video;

  constructor() {
    // Do stuff
  }

  ngAfterViewInit() {
    // set the initial state of the video
    let video:HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }

  toggleControls() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  successCallback(stream: MediaStream) {

    var options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video.nativeElement;
    video.src = window.URL.createObjectURL(stream);
    this.toggleControls();
  }

  errorCallback() {
    //handle error here
  }

  processVideo(audioVideoWebMURL) {
    let video: HTMLVideoElement = this.video.nativeElement;
    let recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    this.toggleControls();
    var recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(function (dataURL) { });
  }

  startRecording() {
    let mediaConstraints = {
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720
        }
      }, audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));


  }

  stopRecording() {
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }

  download() {
    this.recordRTC.save('video.webm');
  }
}
