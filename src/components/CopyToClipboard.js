import React, { useState } from 'react'
import Clipboard from 'react-copy-to-clipboard'
import { Tooltip } from 'reactstrap'
import { useTranslation } from 'react-i18next'

const CopyToClipboard = ({ text = '', component, keyID, showText = true }) => {
  const { t } = useTranslation()
  const [copyTooltip, setCopyTooltip] = useState(false)
  const [tooltipMessage, setTooltipMessage] = useState(t('Click to copy'))
  return (
    <>
      {!!showText && !component && text}
      {!!component && component}
      <Clipboard text={text}>
        <i
          className="bcz-copy clipboard-copy"
          id={`${keyID}`}
          onClick={() => {
            setTooltipMessage(t('Copied to clipboard'))
            setTimeout(() => {
              setTooltipMessage(t('Click to copy'))
            }, 500)
          }}
        />
      </Clipboard>
      <Tooltip
        delay={{ hide: 300 }}
        placement="top-start"
        isOpen={copyTooltip}
        target={`${keyID}`}
        toggle={() => setCopyTooltip(!copyTooltip)}
      >
        {tooltipMessage}
      </Tooltip>
    </>
  )
}

export default CopyToClipboard
