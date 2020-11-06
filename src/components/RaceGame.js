import React, { useEffect, useRef } from 'react'
import * as Chart from 'chart.js'
import { Card } from 'antd'
import useInterval from '../hooks/useInterval'

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
  }, 30000)

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
      <canvas id="game" height="150" ref={gameRef} />
    </Card>
  )
}

export default RaceGame
