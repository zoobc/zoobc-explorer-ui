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

import React, { useEffect, useRef } from 'react'
import * as Chart from 'chart.js'
import { Card } from 'antd'
import useInterval from '../hooks/useInterval'
import { useTranslation } from 'react-i18next'

let game

const cars = [
  require('../assets/images/cars/car-1.png'),
  require('../assets/images/cars/car-2.png'),
  require('../assets/images/cars/car-3.png'),
  require('../assets/images/cars/car-4.png'),
  require('../assets/images/cars/car-5.png'),
  require('../assets/images/cars/car-6.png'),
  require('../assets/images/cars/car-7.png'),
  require('../assets/images/cars/car-8.png'),
  require('../assets/images/cars/car-9.png'),
  require('../assets/images/cars/car-10.png'),
]

function randomNumber() {
  return Math.random() * (10 - 0) + 0
}

function randomCarPosition() {
  return Array(10)
    .fill()
    .map(() => randomNumber())
}

const RaceGame = () => {
  const gameRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    createChart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      game = null
      gameRef.current.remove()
      gameRef.current = null
    }
  }, [])

  const createChart = () => {
    const canvas = gameRef.current.getContext('2d')
    Chart.pluginService.register({
      afterUpdate: chart => {
        const data = chart.config.data.datasets[0]._meta[chart.id].data
        data.map((d, key) => {
          const car = new Image()
          car.src = cars[key]
          d._model.pointStyle = car
          return null
        })
      },
    })
    var data = {
      labels: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'],
      datasets: [
        {
          label: 'ZBC',
          fill: false,
          borderColor: 'rgba(0, 0, 0, 0)',
          pointBackgroundColor: '#fff',
          pointRadius: 5,
          data: randomCarPosition(),
        },
      ],
    }

    game = new Chart(canvas, {
      type: 'line',
      data: data,
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                display: false,
              },
              gridLines: {
                display: false,
                color: 'rgba(0, 0, 0, 0)',
                drawBorder: false,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                display: true,
              },
              gridLines: {
                display: false,
                color: 'rgba(0, 0, 0, 0)',
                drawBorder: false,
              },
            },
          ],
        },
        tooltips: {
          mode: 'label',
        },
        legend: {
          display: false,
        },
      },
    })
  }

  useInterval(async () => {
    game.data.datasets[0].data = await randomCarPosition()
    game.update()
  }, 1000)

  // const onUpdateRace = values => {
  //   const labels = values.label.map(label => shortenHash(label, 15))
  //   game.data.labels = labels
  //   game.data.datasets[0].data = values
  //   game.update()
  // }

  return (
    <Card
      className="home-card"
      bordered={false}
      style={{
        marginBottom: 20,
      }}
    >
      <div className="home-card-title">
        <i className="bcz-calendar" />
        <strong>{t('Race Game')}</strong>
      </div>
      <canvas id="game" height="150" ref={gameRef} />
    </Card>
  )
}

export default RaceGame
