import { Component } from "@stencil/core";
import * as posenet from "@tensorflow-models/posenet";
import "@tensorflow/tfjs";

@Component({
  tag: "tfjs-posenet",
  styleUrl: "posenet.css",
  shadow: true
})
export class TfjsPosenet {
  width: number = 600;
  height: number = 600;
  color: string = "#00FFFF";

  private imageScaleFactor: number = 0.5;
  private outputStride: posenet.OutputStride = 16;
  private flipHorizontal: boolean = false;

  private videoElement: HTMLVideoElement;
  private canvasElement: HTMLCanvasElement;
  private model: posenet.PoseNet;

  async componentDidLoad(): Promise<any> {
    const constraints = {
      audio: false,
      video: { width: this.width, height: this.height, facingMode: "user" }
    };
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.srcObject = stream;
      this.model = await posenet.load();
      this.detect();
    }
  }

  private async detect(): Promise<any> {
    const pose = await this.model.estimateSinglePose(
      this.videoElement,
      this.imageScaleFactor,
      this.flipHorizontal,
      this.outputStride
    );
    this.drawDetection(pose);
    requestAnimationFrame(() => this.detect());
  }

  private drawDetection(pose: posenet.Pose): void {
    const ctx = this.canvasElement.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle, (ctx.strokeStyle = this.color);
    ctx.font = "12px Arial";
    pose.keypoints.forEach(point => {
      this.drawText(ctx, point.position.x, point.position.y, point.part);
      this.drawPoint(ctx, point.position.x, point.position.y, 5, this.color);
    });
  }

  private drawPoint(ctx, x: number, y: number, r: number, color: string): void {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

  private drawText(ctx, x: number, y: number, text: string): void {
    ctx.fillText(text, x + 10, y);
  }

  public render(): JSX.Element {
    return (
      <div class="detection">
        <video
          autoPlay
          playsInline
          muted
          ref={el => (this.videoElement = el)}
          width={this.width}
          height={this.width}
          class="fixed"
        />
        <canvas
          ref={el => (this.canvasElement = el)}
          width={this.width}
          height={this.height}
          class="fixed"
        />
      </div>
    );
  }
}
