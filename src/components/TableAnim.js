import React, { createContext } from 'react'
import { Table } from 'antd'
import { TweenOneGroup } from 'rc-tween-one'

const TableContext = createContext(false)

const onEnd = e => {
  const dom = e.target
  dom.style.height = 'auto'
}

const enterAnim = [
  {
    opacity: 0,
    x: 30,
    backgroundColor: '#fffeee',
    duration: 0,
  },
  {
    height: 0,
    duration: 200,
    type: 'from',
    delay: 250,
    ease: 'easeOutQuad',
    onComplete: onEnd,
  },
  {
    opacity: 1,
    x: 0,
    duration: 250,
    ease: 'easeOutQuad',
  },
  { delay: 1000, backgroundColor: '#fff' },
]

const pageEnterAnim = [
  {
    opacity: 0,
    duration: 0,
  },
  {
    height: 0,
    duration: 150,
    type: 'from',
    delay: 150,
    ease: 'easeOutQuad',
    onComplete: onEnd,
  },
  {
    opacity: 1,
    duration: 150,
    ease: 'easeOutQuad',
  },
]

const leaveAnim = [
  { duration: 250, opacity: 0 },
  { height: 0, duration: 200, ease: 'easeOutQuad' },
]
const pageLeaveAnim = [
  { duration: 150, opacity: 0 },
  { height: 0, duration: 150, ease: 'easeOutQuad' },
]

const AnimateBody = props => {
  return (
    <TableContext.Consumer>
      {pageTween => {
        return (
          <TweenOneGroup
            {...props}
            exclusive
            appear={false}
            component="tbody"
            enter={!pageTween ? enterAnim : pageEnterAnim}
            leave={!pageTween ? leaveAnim : pageLeaveAnim}
          />
        )
      }}
    </TableContext.Consumer>
  )
}

export default function TableAnim({ loading, columns, data = [], className }) {
  return (
    <TableContext.Provider value={false}>
      <Table
        size="small"
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={false}
        className={`table-anim ${className}`}
        components={{ body: { wrapper: AnimateBody } }}
      />
    </TableContext.Provider>
  )
}
