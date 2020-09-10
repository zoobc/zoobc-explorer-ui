import React from 'react'
import { shortenHash } from '../utils/shorten'
import { Icon, Popover } from 'antd'
import { Link } from 'react-router-dom'
import CopyToClipboard from './CopyToClipboard'
import { useTranslation } from 'react-i18next'

const ZBCShortAddress = ({ address, href, title, style = {}, small = false }) => {
  const { t } = useTranslation()
  if (!address) return null

  const addressElm = href ? (
    <Link to={href} style={style}>
      {shortenHash(address)}
    </Link>
  ) : (
    <span style={style}>{shortenHash(address)}</span>
  )

  return (
    <span className="monospace-text">
      {small ? (
        <small>
          {addressElm}
          &nbsp;
          <Popover
            content={
              <>
                <small className="monospace-text">{address}</small>
                <CopyToClipboard
                  text={address}
                  keyID={`tooltip-address-${address}`}
                  showText={false}
                />
              </>
            }
            title={t(title)}
            trigger="click"
          >
            <Icon type="zoom-in" />
          </Popover>
          <CopyToClipboard text={address} keyID={`address-${address}`} showText={false} />
        </small>
      ) : (
        <>
          {addressElm}
          &nbsp;
          <Popover
            content={
              <>
                <small className="monospace-text">{address}</small>
                <CopyToClipboard
                  text={address}
                  keyID={`tooltip-address-${address}`}
                  showText={false}
                />
              </>
            }
            title={t(title)}
            trigger="click"
          >
            <Icon type="zoom-in" />
          </Popover>
          <CopyToClipboard text={address} keyID={`address-${address}`} showText={false} />
        </>
      )}
    </span>
  )
}

export default ZBCShortAddress
