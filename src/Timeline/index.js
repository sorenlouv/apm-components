import React from 'react';
import { StickyContainer } from 'react-sticky';
import styled from 'styled-components';
import Timeline from './Timeline';

const MARGINS = {
  top: 40,
  left: 50,
  right: 50,
  bottom: 0
};

const TraceContainer = styled.div`
  padding: 15px 0;
`;
const TraceBar = styled.div`
  position: relative;
  height: 50px;
  background-color: red;
`;
const TraceLabel = styled.div`
  white-space: nowrap;
  position: relative;
  direction: rtl;
  text-align: left;
`;

export default function TimelineWrapper() {
  return (
    <div>
      <div
        style={{
          width: '80%',
          marginTop: '200px',
          marginLeft: '150px',
          position: 'relative',
          border: '1px solid #bbb'
        }}
      >
        <StickyContainer>
          <Timeline duration={41000} height={687} margins={MARGINS} />

          <div
            style={{
              paddingTop: MARGINS.top,
              paddingLeft: MARGINS.left,
              paddingRight: MARGINS.right
            }}
          >
            {[
              { start: 0, duration: 10 },
              { start: 10, duration: 30 },
              { start: 30, duration: 20 },
              { start: 50, duration: 30 },
              { start: 80, duration: 20 },
              { start: 85, duration: 10 },
              { start: 90, duration: 10 }
            ].map(({ start, duration }, i) => {
              return (
                <TraceContainer key={i}>
                  <TraceBar
                    style={{ left: `${start}%`, width: `${duration}%` }}
                  />
                  <TraceLabel
                    style={{ left: `${start}%`, width: `${100 - start}%` }}
                  >
                    I am a very long text, that should not be broken
                  </TraceLabel>
                </TraceContainer>
              );
            })}
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
