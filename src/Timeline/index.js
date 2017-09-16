import React from 'react';
import { StickyContainer } from 'react-sticky';
import Timeline from './Timeline';

const MARGINS = {
  top: 40,
  left: 50,
  right: 50,
  bottom: 0
};

export default function TimelineWrapper() {
  return (
    <div>
      <div
        style={{
          width: '80%',
          marginTop: '200px',
          marginLeft: '150px',
          position: 'relative',
          border: '1px solid red'
        }}
      >
        <StickyContainer>
          <Timeline max={50000} height={500} margins={MARGINS} />

          <div
            style={{
              paddingTop: MARGINS.top,
              paddingLeft: MARGINS.left,
              paddingRight: MARGINS.right
            }}
          >
            <div style={getStyles('0%', 'red')} />
            <div style={getStyles('10%', 'blue')} />
            <div style={getStyles('20%', 'yellow')} />
            <div style={getStyles('30%', 'gray')} />
            <div style={getStyles('40%', 'violet')} />
            <div style={getStyles('50%', 'green')} />
            <div style={getStyles('60%', 'pink')} />
            <div style={getStyles('70%', 'purple')} />
            <div style={getStyles('80%', 'cyan')} />
            <div style={getStyles('90%', 'brown')} />
          </div>
        </StickyContainer>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

function getStyles(left, color) {
  return {
    position: 'relative',
    left,
    backgroundColor: color,
    height: '50px',
    width: '10%'
  };
}
