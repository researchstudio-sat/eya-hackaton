/**
 * used and changed by MS on 01.03.2019
 * developing purposes
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import "../../style/main.css";

export class Clock extends React.Component<any, any> {
  public state: any;
  public props: any;
  public refs: any;
  public defaultProps: any;
  public propTypes: any;
  private radius: number;
  private drawingContext: any;
  private draw24hour: any;
  private drawRoman: any;
  private timerId: any;
  constructor(props: any) {
    super(props);
    this.props = props;
    this.state = { time: new Date() };
    this.radius = props.size / 2;
    this.drawingContext = null;
    this.draw24hour = props.timeFormat.toLowerCase().trim() === "24hour";
    this.drawRoman =
      !this.draw24hour && props.hourFormat.toLowerCase().trim() === "roman";
  }

  componentDidMount() {
    this.getDrawingContext();
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  getDrawingContext() {
    this.drawingContext = this.refs.clockCanvas.getContext("2d");
    this.drawingContext.translate(this.radius, this.radius);
    this.radius *= 0.9;
  }

  tick() {
    this.setState({ time: new Date() });
    const radius = this.radius;
    let ctx = this.drawingContext;
    this.drawFace(ctx, radius);
    this.drawNumbers(ctx, radius);
    this.drawTicks(ctx, radius);
    this.drawTime(ctx, radius);
  }

  drawFace(ctx: any, radius: number) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    const grad = ctx.createRadialGradient(
      0,
      0,
      radius * 0.95,
      0,
      0,
      radius * 1.05
    );
    grad.addColorStop(0, "#333");
    grad.addColorStop(0.5, "white");
    grad.addColorStop(1, "#333");
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
  }

  drawNumbers(ctx: any, radius: number) {
    const romans = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII"
    ];
    const fontBig = radius * 0.15 + "px Arial";
    const fontSmall = radius * 0.075 + "px Arial";
    let ang, num;

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
      ang = (num * Math.PI) / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.78);
      ctx.rotate(-ang);
      ctx.font = fontBig;
      ctx.fillStyle = "black";
      ctx.fillText(this.drawRoman ? romans[num - 1] : num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.78);
      ctx.rotate(-ang);

      // Draw inner numerals for 24 hour time format
      if (this.draw24hour) {
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.6);
        ctx.rotate(-ang);
        ctx.font = fontSmall;
        ctx.fillStyle = "red";
        ctx.fillText((num + 12).toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.6);
        ctx.rotate(-ang);
      }
    }

    // Write author text
    ctx.font = fontSmall;
    ctx.fillStyle = "#3D3B3D";
    ctx.translate(0, radius * 0.3);
    ctx.fillText("@MS Test", 0, 0);
    ctx.translate(0, -radius * 0.3);
  }

  drawTicks(ctx: any, radius: number) {
    let numTicks, tickAng, tickX, tickY;

    for (numTicks = 0; numTicks < 60; numTicks++) {
      tickAng = (numTicks * Math.PI) / 30;
      tickX = radius * Math.sin(tickAng);
      tickY = -radius * Math.cos(tickAng);

      ctx.beginPath();
      ctx.lineWidth = radius * 0.01;
      ctx.moveTo(tickX, tickY);
      if (numTicks % 5 === 0) {
        ctx.lineTo(tickX * 0.88, tickY * 0.88);
      } else {
        ctx.lineTo(tickX * 0.92, tickY * 0.92);
      }
      ctx.stroke();
    }
  }

  drawTime(ctx: any, radius: number) {
    const now = this.state.time;
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    // hour
    hour %= 12;
    hour =
      (hour * Math.PI) / 6 +
      (minute * Math.PI) / (6 * 60) +
      (second * Math.PI) / (360 * 60);
    this.drawHand(ctx, hour, radius * 0.5, radius * 0.05, "black");
    // minute
    minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
    this.drawHand(ctx, minute, radius * 0.8, radius * 0.05, "black");
    // second
    second = (second * Math.PI) / 30;
    this.drawHand(ctx, second, radius * 0.9, radius * 0.02, "red");
  }

  private drawHand(
    ctx: any,
    position: any,
    length: any,
    width: any,
    color: any
  ) {
    color = color || "black";
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(position);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-position);
  }

  render() {
    return (
      <div className="clock" style={{ width: String(this.props.size) + "px" }}>
        <canvas
          width={this.props.size}
          height={this.props.size}
          ref="clockCanvas"
        />
      </div>
    );
  }
}
