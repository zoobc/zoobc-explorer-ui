import React, { useState } from 'react'
import Clipboard from 'react-copy-to-clipboard'
import { Tooltip } from 'reactstrap'
import { useTranslation } from 'react-i18next'

const CopyToClipboard = ({ text = '', keyID }) => {
  const { t } = useTranslation()
  const [copyTooltip, setCopyTooltip] = useState(false)
  const [tooltipMessage, setTooltipMessage] = useState('Click to copy')
  return (
    <>
      <Clipboard text={text}>
        <i
          className="fa fa-copy ml-2 clipboard-copy"
          id={`${keyID}`}
          onClick={() => {
            setTooltipMessage('Copied to clipboard')
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
