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

import './index.scss'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, gql } from '@apollo/client'
import { Row, Col, Card, Form, Input, Button, Checkbox, Icon, Typography, Alert } from 'antd'

import { store, encryption } from '../../utils'

const MUTATION_LOGIN = gql`
  mutation login($Identifier: String!, $Password: String!) {
    login(Identifier: $Identifier, Password: $Password) {
      Success
      Message
      Token
      Data {
        Identifier
        Role
      }
    }
  }
`

const Login = props => {
  const { t } = useTranslation()
  const { getFieldDecorator } = props.form
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [login, result] = useMutation(MUTATION_LOGIN, {
    onCompleted: () => {
      setLoading(false)
    },
    onError: error => {
      setError(error.graphQLErrors[0].message)
      setLoading(false)
    },
  })

  const onSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, val) => {
      if (!err) {
        setLoading(true)
        store.remove('usrindy')
        store.remove('usrpswd')

        if (val.Remember) {
          store.set('usrindy', encryption.encrypt(val.Identifier))
          store.set('usrpswd', encryption.encrypt(val.Password))
        }

        login({ variables: { Identifier: val.Identifier, Password: val.Password } })
      }
    })
  }

  useEffect(() => {
    if (result && result.data) {
      const { Success, Message, Token, Data } = result.data.login

      if (Success) {
        store.set('usrtoken', Token)
        store.set('usraccess', encryption.encrypt(Data))

        setTimeout(() => {
          window.location.href = '/panel'
        }, 1000)
      } else {
        setError(Message)
      }
    }
  }, [result.data]) // eslint-disable-line

  return (
    <div className="login">
      <Row type="flex" justify="center" align="middle">
        <Col>
          <Card
            className="login-form"
            title={
              <Typography.Title level={4} className="login-title">
                ZooBC Panel
              </Typography.Title>
            }
          >
            <Form onSubmit={onSubmit}>
              <Form.Item>
                {getFieldDecorator('Identifier', {
                  initialValue: encryption.decrypt(store.get('usrindy')) || null,
                  rules: [{ required: true, message: 'Please input Your identifier!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Identifier"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('Password', {
                  initialValue: encryption.decrypt(store.get('usrpswd')) || null,
                  rules: [{ required: true, message: 'Please input Your password!' }],
                })(
                  <Input.Password
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>

              {error && <Alert message={error} type="error" closable />}

              <Form.Item>
                {getFieldDecorator('Remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>{t('remember me')}</Checkbox>)}

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={loading}
                  className="login-form-button"
                >
                  {t('log in')}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Form.create({ name: 'form_login' })(Login)
