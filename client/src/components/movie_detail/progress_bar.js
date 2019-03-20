import React, { Component } from 'react';

class ProgressRing extends Component {
  constructor(props) {
    super(props);
    
    const { radius, stroke } = this.props;
    
    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  getStrokeColor() {
    const red = '#ff0000';
    const yellow = '#f1f446';
    const green = '#7bbc12';
    const darkGreen = '#298e23';

    if(this.props.progress >= 85) {
      return darkGreen;
    } if(this.props.progress >= 75) {
      return green;
    } if (this.props.progress >= 50) {
      return yellow;
    } if (this.props.progress <= 50) {
      return red;
    }
  }


  
  render() {
    const { radius, stroke, progress } = this.props;

    const strokeDashoffset = this.circumference - progress / 100 * this.circumference;
  
    return (
      <div>
        <svg
          height={radius * 2}
          width={radius * 2}
        >
          <circle
            stroke={this.getStrokeColor()}
            fill="transparent"
            strokeWidth={ stroke }
            strokeDasharray={ this.circumference + ' ' + this.circumference }
            style={ { strokeDashoffset } }
            r={ this.normalizedRadius }
            cx={ radius }
            cy={ radius }
          />
        </svg>
      </div>

    );
  }
}

export default ProgressRing;
