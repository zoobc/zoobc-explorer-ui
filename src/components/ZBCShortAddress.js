import React from 'react'
import { shortenHash } from '../utils/shorten'
import { Icon, Modal } from 'antd'
import { Link } from 'react-router-dom'
import CopyToClipboard from './CopyToClipboard'
import { useTranslation } from 'react-i18next'

const ZBCShortAddress = ({ address, href, title, style = {}, small = false }) => {
  const { t } = useTranslation()
  if (!address) return null


  const onClick = () => {
    Modal.info({
      title: t(title),
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
          <CopyToClipboard text={address} keyID={`address-${address}`} showText={false}/>
        </small>
      ) : (
        <>
          {addressElm}
          &nbsp;
          <Icon type="search" onClick={onClick} />
          <CopyToClipboard text={address} keyID={`address-${address}`} showText={false}/>
        </>
      )}
    </span>
  )
}

export default ZBCShortAddress
