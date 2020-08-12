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
