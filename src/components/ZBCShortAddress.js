import React from 'react'
import { shortenHash } from '../utils/shorten'
import { Icon, Modal } from 'antd'
import { Link } from 'react-router-dom'
import CopyToClipboard from './CopyToClipboard'

const ZBCShortAddress = ({ address, href, title, style = {}, small = false }) => {
  if (!address) return null

  const onClick = () => {
    Modal.info({
      title: title,
      content: <CopyToClipboard text={address} keyID={`address-${address}`} />,
      width: 600,
    })
  }

  const addressElm = href ? (
    <Link to={href} style={style}>
      {shortenHash(address)}
    </Link>
  ) : (
    <span style={style}>{shortenHash(address)}</span>
  )

  return (
    <span>
      {small ? (
        <small>
          {addressElm}
          &nbsp;
          <Icon type="search" onClick={onClick} />
        </small>
      ) : (
        <>
          {addressElm}
          &nbsp;
          <Icon type="search" onClick={onClick} />
        </>
      )}
    </span>
  )
}

export default ZBCShortAddress
