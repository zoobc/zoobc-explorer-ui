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
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation, gql } from '@apollo/client'
import { PageHeader, Button, Row, Col, Form, Input, message } from 'antd'

import Container from '../../../components/Container'

const QUERY_PROFILE = gql`
  query profile {
    profile {
      Success
      Message
      Data {
        Identifier
        Role
        Active
      }
    }
  }
`

const MUTATION_UPDATE = gql`
  mutation changePassword($NewPassword: String!) {
    changePassword(NewPassword: $NewPassword) {
      Success
      Message
      Data {
        Identifier
        Role
      }
    }
  }
`

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
}

const FormChangePassword = props => {
  const { t } = useTranslation()
  const [value, setValue] = useState(null)
  const { getFieldDecorator } = props.form
  const [processing, setProcessing] = useState(false)

  const { loading, data, error } = useQuery(QUERY_PROFILE)

  const [update] = useMutation(MUTATION_UPDATE, {
    onCompleted: data => {
      const { Success, Message } = data.changePassword
      Success ? message.success(Message, 10) : message.error(Message, 10)
      setProcessing(false)

      // setTimeout(() => {
      //   window.location.href = '/panel'
      // }, 500)
    },
  })

  const onSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, val) => {
      if (!err) {
        setProcessing(true)
        update({
          variables: {
            NewPassword: val.NewPassword,
          },
        })
      }
    })
  }

  useEffect(() => {
    function init() {
      if (!loading && !error && data) {
        const { Success, Data } = data.profile
        if (Success) setValue(Data)
      }
    }

    init()
  }, [loading, error, data]) // eslint-disable-line

  return (
    <Container>
      <PageHeader
        ghost={false}
        className="block-card"
        title={<h4 className="block-card-title page-title">{t('change password')}</h4>}
      >
        <Row gutter={24}>
          <Form {...formItemLayout} layout="horizontal" labelAlign="left" onSubmit={onSubmit}>
            <Col span={12}>
              <Form.Item label={t('Identifier')}>
                {getFieldDecorator('Identifier', {
                  initialValue: value && value.Identifier,
                  rules: [{ required: true, message: 'Please input identifier!' }],
                })(<Input disabled placeholder="Identifier" />)}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label={t('New Password')}>
                {getFieldDecorator('NewPassword', {
                  initialValue: value && value.NewPassword,
                  rules: [{ required: true, message: 'Please input new password!' }],
                })(<Input.Password placeholder="New Password" />)}
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={processing}
                  disabled={processing}
                  className="login-form-button"
                >
                  {t('update')}
                </Button>
              </Form.Item>
            </Col>
          </Form>
        </Row>
      </PageHeader>
    </Container>
  )
}

export default Form.create({ name: 'form_password' })(FormChangePassword)
