import React, { useRef, useEffect } from 'react'
import { Row, Col, Card } from 'antd'
import { useTranslation } from 'react-i18next'
import * as d3 from 'd3'
// import { select, scaleBand, scaleLinear, max } from 'd3'

import useResizeObserver from '../hooks/useResizeObserver'
import { shortenHash } from '../utils/shorten'
// import svgCar from '../assets/images/car.svg'

// const cars = [
//   require('../assets/images/cars/car-1.png'),
//   require('../assets/images/cars/car-2.png'),
//   require('../assets/images/cars/car-3.png'),
//   require('../assets/images/cars/car-4.png'),
//   require('../assets/images/cars/car-5.png'),
//   require('../assets/images/cars/car-6.png'),
//   require('../assets/images/cars/car-7.png'),
//   require('../assets/images/cars/car-8.png'),
//   require('../assets/images/cars/car-9.png'),
//   require('../assets/images/cars/car-10.png'),
// ]

export default function({ loading, data }) {
  const { t } = useTranslation()
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    if (!data || !dimensions) return

    // sorting the data
    data.sort((a, b) => b.value - a.value)

    const svg = d3.select(svgRef.current)

    const yScale = d3
      .scaleBand()
      .paddingInner(0.1)
      .domain(data.map((value, index) => index))
      .range([0, dimensions.height])

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, entry => entry.value)])
      .range([0, dimensions.width])

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([0, dimensions.width])

    // let y = d3
    //   .scaleLinear()
    //   .domain(data.map((value, index) => index))
    //   .range([0, dimensions.height])

    /** bars */
    svg
      .selectAll('.bar')
      .data(data, (entry, index) => entry.name)
      .join(enter => enter.append('rect').attr('y', (entry, index) => yScale(index)))
      .attr('fill', entry => entry.color)
      // .attr('fill', 'transparent')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('height', yScale.bandwidth())
      .transition()
      .attr('width', entry => xScale(entry.value))
      .attr('y', (entry, index) => yScale(index))

    /** icons */
    /** noted: bug for image not clean when new data comming */
    // svg
    //   .selectAll('.icon')
    //   .data(data, (entry, index) => entry.name)
    //   .join(enter =>
    //      enter
    //       .append('svg:image')
    //       .attr('x', (entry, index) => x(entry.value) - 25)
    //       .attr('y', (entry, index) => yScale(index))
    //       .attr(
    //         'xlink:href',
    //         (entry, index) => cars[index]
    //       )
    //   )
    //   .attr('height', '32')
    //   .attr('width', '32')
    //   .attr('class', 'dot')

    /** labels */
    svg
      .selectAll('.label')
      .data(data, (entry, index) => entry.name)
      .join(enter =>
        enter.append('text').attr('y', (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5)
      )
      // .text(entry => `${entry.name} (${entry.value} point)`)
      .attr('class', 'label')
      .attr('x', (entry, index) => x(entry.value) - 25)
      .attr('y', (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5)
      .style('text-anchor', 'end')
      .style('font-size', '10px')
      .html(d => shortenHash(d.name))

    /** values */
    svg
      .selectAll('.valueLabel')
      .data(data, (entry, index) => entry.value)
      .join(enter =>
        enter.append('text').attr('y', (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5)
      )
      .text(entry => `${entry.value} point`)
      .attr('class', 'valueLabel')
      .attr('x', d => x(d.value) + 5)
      .attr('y', (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5)
  }, [data, dimensions])

  return (
    <Card className="home-node" bordered={false}>
      <div className="home-node-title">
        <i className="bcz-calendar" />
        <strong>{t('Race Car')}</strong>
      </div>
      <Row>
        <Col span={24}>
          <div ref={wrapperRef}>
            <svg ref={svgRef} className="svg"></svg>
          </div>
        </Col>
      </Row>
    </Card>
  )
}
