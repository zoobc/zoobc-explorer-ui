import React from 'react'
import { Modal, Button } from 'antd'
import comingsoon from '../assets/images/comingsoon.svg'

const ComingSoon = ({ visible, title, onClose }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      footer={[
        <Button type="primary" onClick={onClose}>
          Close
        </Button>
      ]}
      centered
      width="auto"
      className="coming-soon-modal"
    >
      <div className="coming-soon">
        <img src={comingsoon} alt="Coming Soon" />
        <h1 className="py-3">Coming Soon</h1>
      </div>
    </Modal>
  )
}

export default ComingSoon
