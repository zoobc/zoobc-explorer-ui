/**
 * ZooBC Copyright (C) 2020 Quasisoft Limited - Hong Kong
 * This file is part of ZooBC <https://github.com/zoobc/zoobc-explorer-ui>

 * ZooBC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * ZooBC is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with ZooBC.  If not, see <http://www.gnu.org/licenses/>.

 * Additional Permission Under GNU GPL Version 3 section 7.
 * As the special exception permitted under Section 7b, c and e,
 * in respect with the Author’s copyright, please refer to this section:

 * 1. You are free to convey this Program according to GNU GPL Version 3,
 *     as long as you respect and comply with the Author’s copyright by
 *     showing in its user interface an Appropriate Notice that the derivate
 *     program and its source code are “powered by ZooBC”.
 *     This is an acknowledgement for the copyright holder, ZooBC,
 *     as the implementation of appreciation of the exclusive right of the
 *     creator and to avoid any circumvention on the rights under trademark
 *     law for use of some trade names, trademarks, or service marks.

 * 2. Complying to the GNU GPL Version 3, you may distribute
 *     the program without any permission from the Author.
 *     However a prior notification to the authors will be appreciated.

 * ZooBC is architected by Roberto Capodieci & Barton Johnston
 * contact us at roberto.capodieci[at]blockchainzoo.com
 * and barton.johnston[at]blockchainzoo.com

 * IMPORTANT: The above copyright notice and this permission notice
 * shall be included in all copies or substantial portions of the Software.
**/

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
