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

import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Button, Select, Rate, Alert } from 'antd'
import doorbell from '../utils/doorbell'
import { useTranslation } from 'react-i18next'

const FormFeedback = ({ visible, onClose, form }) => {
  const { getFieldDecorator, validateFields, resetFields } = form
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alert, setAlert] = useState(null)
  const { t } = useTranslation()

  const handleSubmit = e => {
    e.preventDefault()
    validateFields((err, values) => {
      if (!err) {
        setIsSubmitting(true)
        doorbell.submit(values).then(res => {
          if (res.type === 'success') resetFields()
          setAlert(res)
          setIsSubmitting(false)
        })
      }
    })
  }

  useEffect(() => {
    if (visible) {
      doorbell.open()
    }
  }, [visible])

  return (
    <Modal
      title={t('feedback')}
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
      className="feedback-form"
      afterClose={() => setAlert(null)}
    >
      {!!alert && <Alert message={alert.message} type={alert.type} />}
      <Form layout="vertical" onSubmit={handleSubmit}>
        <Form.Item label={t('name')}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: t('please input your name!'),
                transform: value => value.trim(),
              },
            ],
          })(<Input placeholder={t('input your name')} />)}
        </Form.Item>
        <Form.Item label={t('email')}>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                type: 'email',
                message: t('please input your email!'),
                transform: value => value.trim(),
              },
            ],
          })(<Input placeholder={t('input your email address')} />)}
        </Form.Item>
        <Form.Item label={t('sentiment')}>
          {getFieldDecorator('sentiment')(
            <Select placeholder={t('please select a sentiment')}>
              <Select.Option value="positive">{t('positive')}</Select.Option>
              <Select.Option value="negative">{t('negative')}</Select.Option>
              <Select.Option value="neutral">{t('neutral')}</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label={t('rate')}>{getFieldDecorator('nps')(<Rate />)}</Form.Item>
        <Form.Item label={t('message')}>
          {getFieldDecorator('message', {
            rules: [
              {
                required: true,
                message: t('please input your message!'),
                transform: value => value.trim(),
              },
            ],
          })(<Input.TextArea rows={4} placeholder={t('input your feedback message')} />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" loading={isSubmitting} block>
            {t('submit')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create({ name: 'feedback_form' })(FormFeedback)
