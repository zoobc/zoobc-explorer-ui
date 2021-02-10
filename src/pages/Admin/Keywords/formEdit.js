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

import './form.scss'
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import React, { useState, useEffect } from 'react'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation, gql } from '@apollo/client'
import { PageHeader, Row, Col, Form, Input, Button, DatePicker, message } from 'antd'

import Container from '../../../components/Container'

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

const formFullLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 21 },
  },
}

const QUERY_KEYWORD = gql`
  query keyword($Keyword: String!) {
    keyword(Keyword: $Keyword) {
      Success
      Message
      Data {
        Keyword
        Content
        ExpiredAt
        Seen
        CreatedAt
        CreatedBy {
          Identifier
        }
      }
    }
  }
`

const MUTATION_UPDATE = gql`
  mutation update($Keyword: String!, $Content: String!, $ExpiredAt: Date) {
    update(Keyword: $Keyword, Content: $Content, ExpiredAt: $ExpiredAt) {
      Success
      Message
      Data {
        Keyword
        Content
        ExpiredAt
      }
    }
  }
`

const FormKeyword = props => {
  const { t } = useTranslation()
  const { history, match } = props
  const [value, setValue] = useState(null)
  const { getFieldDecorator } = props.form
  const [content, setContent] = useState(null)
  const [processing, setProcessing] = useState(false)

  const { loading, data, error } = useQuery(QUERY_KEYWORD, {
    variables: { Keyword: match.params.key },
  })

  const [update] = useMutation(MUTATION_UPDATE, {
    onCompleted: data => {
      const { Success, Message } = data.update
      Success ? message.success(Message, 10) : message.error(Message, 10)
      setProcessing(false)

      setTimeout(() => {
        window.location.href = '/panel/keywords'
      }, 500)
    },
  })

  const onSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, val) => {
      if (!err) {
        setProcessing(true)
        update({
          variables: {
            Keyword: val.Keyword,
            ExpiredAt: val.ExpiredAt ? val.ExpiredAt : null,
            Content: draftToHtml(convertToRaw(content.getCurrentContent())),
          },
        })
      }
    })
  }

  useEffect(() => {
    function init() {
      if (!loading && !error && data) {
        const { Success, Data } = data.keyword
        if (Success) {
          setValue(Data)

          const contentBlock = htmlToDraft(Data.Content)
          if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            setContent(EditorState.createWithContent(contentState))
          }
        }
      }
    }

    init()
  }, [loading, error, data]) // eslint-disable-line

  return (
    <Container>
      <PageHeader
        ghost={false}
        className="block-card"
        title={<h4 className="block-card-title page-title">{t('keywords')}</h4>}
        subTitle={t('edit data')}
        extra={[
          <Button key="back" onClick={() => history.push('/panel/keywords')}>
            {t('back')}
          </Button>,
        ]}
      >
        <Row gutter={24}>
          <Form {...formItemLayout} layout="horizontal" labelAlign="left" onSubmit={onSubmit}>
            <Col span={12}>
              <Form.Item label={t('keyword')}>
                {getFieldDecorator('Keyword', {
                  initialValue: value && value.Keyword,
                  rules: [{ required: true, message: 'Please input keyword!' }],
                })(<Input placeholder="Keyword" />)}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label={t('expired at')}>
                {getFieldDecorator('ExpiredAt', {
                  initialValue: value && value.ExpiredAt,
                  rules: [{ required: false, message: 'Please input expired at!' }],
                })(<DatePicker placeholder="Expired At" style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label={t('content')} {...formFullLayout}>
                {getFieldDecorator('Content', {
                  initialValue: value && value.Content,
                  rules: [{ required: true, message: 'Please input content!' }],
                })(
                  <Editor
                    editorState={content}
                    editorClassName="content-editor"
                    wrapperClassName="content-wrapper"
                    onEditorStateChange={val => setContent(val)}
                  />
                )}
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

export default Form.create({ name: 'form_keyword' })(FormKeyword)
