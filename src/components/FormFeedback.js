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
      title={t('Feedback')}
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
        <Form.Item label={t('Name')}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input your name!',
                transform: value => value.trim(),
              },
            ],
          })(<Input placeholder={t('Input your name')} />)}
        </Form.Item>
        <Form.Item label={t('Email')}>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                type: 'email',
                message: 'Please input your email!',
                transform: value => value.trim(),
              },
            ],
          })(<Input placeholder={t('Input your email address')} />)}
        </Form.Item>
        <Form.Item label={t('Sentiment')}>
          {getFieldDecorator('sentiment')(
            <Select placeholder={t('Please select a sentiment')} >
              <Select.Option value="positive">Positive</Select.Option>
              <Select.Option value="negative">Negative</Select.Option>
              <Select.Option value="neutral">Neutral</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label={t('Rate')}>{getFieldDecorator('nps')(<Rate />)}</Form.Item>
        <Form.Item label={t('Message')}>
          {getFieldDecorator('message', {
            rules: [
              {
                required: true,
                message: 'Please input your message!',
                transform: value => value.trim(),
              },
            ],
          })(<Input.TextArea rows={4} placeholder={t('Input your feedback message')} />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" loading={isSubmitting} block>
            {t('SUBMIT')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create({ name: 'feedback_form' })(FormFeedback)
