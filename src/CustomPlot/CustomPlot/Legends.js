import React from 'react';
import Legend from '../../Legend/Legend';
import styled from 'styled-components';
import { units, fontSizes, px, colors, truncate } from '../../variables';

const Title = styled.div`
  font-size: ${fontSizes.large};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const LegendContent = styled.span`
  white-space: nowrap;
  color: ${colors.gray3};
  display: flex;
`;

const TruncatedLabel = styled.span`
  display: inline-block;
  ${truncate(px(units.half * 10))};
`;

const SeriesValue = styled.span`
  margin-left: ${px(units.quarter)};
  color: ${colors.black};
  display: inline-block;
`;

const MoreSeriesContainer = styled.div`
  font-size: ${fontSizes.small};
  color: ${colors.gray3};
`;

function MoreSeries({ hiddenSeries }) {
  if (hiddenSeries <= 0) {
    return null;
  }

  return <MoreSeriesContainer>(+{hiddenSeries})</MoreSeriesContainer>;
}

export default function Legends({
  chartTitle,
  truncateLegends,
  series,
  hiddenSeries,
  clickLegend,
  seriesVisibility
}) {
  return (
    <div>
      <Title>{chartTitle}</Title>
      <Container>
        {series.filter(serie => !serie.isEmpty).map((serie, i) => {
          const text = (
            <LegendContent>
              {truncateLegends ? (
                <TruncatedLabel title={serie.title}>
                  {serie.title}
                </TruncatedLabel>
              ) : (
                serie.title
              )}
              {serie.legendValue && (
                <SeriesValue>{serie.legendValue}</SeriesValue>
              )}
            </LegendContent>
          );
          return (
            <Legend
              key={i}
              onClick={() => clickLegend(i)}
              disabled={seriesVisibility[i]}
              text={text}
              color={serie.color}
            />
          );
        })}
        <MoreSeries hiddenSeries={hiddenSeries} />
      </Container>
    </div>
  );
}
