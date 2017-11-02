import React from 'react';
import { mount } from 'enzyme';
import toDiffableHtml from 'diffable-html';
import { HistogramWithoutHOC } from './Histogram';
import { getFormattedBuckets } from './index';
import response from './response.json';

describe('Histogram', () => {
  let wrapper;
  const onClick = jest.fn();

  beforeEach(() => {
    const buckets = getFormattedBuckets(response.buckets, response.bucketSize);
    wrapper = mount(
      <HistogramWithoutHOC
        buckets={buckets}
        bucketSize={response.bucketSize}
        transactionId="myTransactionId"
        onClick={onClick}
        formatXValue={value => `${value} test`}
        formatYValue={value => `${value} rpm`}
        formatTooltipHeader={(hoveredX0, hoveredX) =>
          `${hoveredX0 / 1000} - ${hoveredX / 1000} ms`}
        tooltipLegendTitle="Requests"
        width={800}
      />
    );
  });

  describe('Initially', () => {
    it('should have default state', () => {
      expect(wrapper.state()).toEqual({ hoveredBucket: null });
    });

    it('should have default markup', () => {
      expect(toDiffableHtml(wrapper.html())).toMatchSnapshot();
    });

    it('should not show tooltip', () => {
      expect(wrapper.find('Tooltip').length).toBe(0);
    });
  });

  describe('when hovering over an empty bucket', () => {
    beforeEach(() => {
      wrapper
        .find('.rv-voronoi__cell')
        .at(2)
        .simulate('mouseOver');
    });

    it('should not display tooltip', () => {
      expect(wrapper.find('Tooltip').length).toBe(0);
    });
  });

  describe('when hovering over a non-empty bucket', () => {
    beforeEach(() => {
      wrapper
        .find('.rv-voronoi__cell')
        .at(7)
        .simulate('mouseOver');
    });

    it('should display tooltip', () => {
      const tooltips = wrapper.find('Tooltip');

      expect(tooltips.length).toBe(1);
      expect(tooltips.prop('header')).toBe('811.076 - 869.01 ms');
      expect(tooltips.prop('tooltipPoints')).toEqual([
        { color: 'rgb(172, 189, 216)', text: 'Requests', value: 49 }
      ]);
      expect(tooltips.prop('x')).toEqual(869010);
      expect(tooltips.prop('y')).toEqual(27.5);
    });

    it('should update state with "hoveredBucket"', () => {
      expect(wrapper.state()).toEqual({
        hoveredBucket: {
          transactionId: '99c50a5b-44b4-4289-a3d1-a2815d128192',
          x: 869010,
          x0: 811076,
          y: 49
        }
      });
    });

    it('should have correct markup for tooltip', () => {
      const tooltips = wrapper.find('Tooltip');
      expect(toDiffableHtml(tooltips.html())).toMatchSnapshot();
    });
  });

  describe('when clicking on a non-empty bucket', () => {
    beforeEach(() => {
      wrapper
        .find('.rv-voronoi__cell')
        .at(7)
        .simulate('click');
    });

    it('should call onClick with bucket', () => {
      expect(onClick).toHaveBeenCalledWith({
        transactionId: '99c50a5b-44b4-4289-a3d1-a2815d128192',
        x: 869010,
        x0: 811076,
        y: 49
      });
    });
  });
});
