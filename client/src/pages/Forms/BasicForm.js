import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi/locale';
import __ from './translate';
import { Form, Input, DatePicker, Select, Button, Card, Radio } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends PureComponent {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    //
    return (
      <div>
        <PageHeaderWrapper content={__('student.form.PageHeaderWrapper.content')}>
          <Card bordered={false}>
            <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
              <FormItem {...formItemLayout} label={<FormattedMessage id="student.form.cne" />}>
                {getFieldDecorator('cne', {
                  rules: [
                    {
                      required: true,
                      // message: 'veuillez entrer un cne valide',
                      message: <FormattedMessage id="student.form.cne.message" />,
                    },
                  ],
                })(<Input placeholder={__('student.form.cne.placeholder')} />)}
              </FormItem>
              <FormItem {...formItemLayout} label={<FormattedMessage id="student.form.fullName" />}>
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: <FormattedMessage id="student.form.fullName.message" />,
                    },
                  ],
                })(<Input placeholder={__('student.form.fullName.placeholder')} />)}
              </FormItem>
              <FormItem {...formItemLayout} label={<FormattedMessage id="student.form.birthDay" />}>
                {getFieldDecorator('Bdate', {
                  rules: [
                    {
                      required: true,
                      message: <FormattedMessage id="student.form.birthDay.message" />,
                    },
                  ],
                })(
                  <DatePicker
                    style={{ width: '100%' }}
                    placeholder={[__('student.form.birthDay.placeholder')]}
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<FormattedMessage id="student.form.birthPlace" />}
              >
                {getFieldDecorator('Bplace', {
                  rules: [
                    {
                      required: true,
                      message: <FormattedMessage id="student.form.birthPlace.message" />,
                    },
                  ],
                })(<Input placeholder={__('student.form.birthPlace.placeholder')} />)}
              </FormItem>
              <FormItem {...formItemLayout} label={<FormattedMessage id="student.form.comment" />}>
                {getFieldDecorator('goal', {
                  rules: [
                    {
                      required: false,
                      message: '',
                    },
                  ],
                })(
                  <TextArea
                    style={{ minHeight: 32 }}
                    placeholder={__('student.form.comment.placeholder')}
                    rows={4}
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<FormattedMessage id="student.form.studyLevel" />}
              >
                <div>
                  {getFieldDecorator('public', {
                    initialValue: '1',
                  })(
                    <Radio.Group>
                      <Radio value="1">{__('student.form.studyLevel.middleSchool')}</Radio>
                      <Radio value="2">{__('student.form.studyLevel.highSchool')}</Radio>
                    </Radio.Group>
                  )}
                  <FormItem style={{ marginBottom: 0 }}>
                    {getFieldDecorator('publicUsers')(
                      <Select
                        mode="multiple"
                        placeholder={__('student.form.studyLevel.middleSchool.placeholder')}
                        style={{
                          margin: '8px 0',
                          display: getFieldValue('public') === '1' ? 'block' : 'none',
                        }}
                      >
                        <Option value="1">
                          {__('student.form.studyLevel.middleSchool.level1')}{' '}
                        </Option>
                        <Option value="2">
                          {__('student.form.studyLevel.middleSchool.level2')}{' '}
                        </Option>
                        <Option value="3">
                          {__('student.form.studyLevel.middleSchool.level3')}{' '}
                        </Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem style={{ marginBottom: 0 }}>
                    {getFieldDecorator('publicUsers')(
                      <Select
                        mode="multiple"
                        placeholder={__('student.form.studyLevel.highSchool.placeholder')}
                        style={{
                          margin: '8px 0',
                          display: getFieldValue('public') === '2' ? 'block' : 'none',
                        }}
                      >
                        <Option value="1">{__('student.form.studyLevel.highSchool.level1')}</Option>
                        <Option value="2">{__('student.form.studyLevel.highSchool.level2')}</Option>
                        <Option value="3">{__('student.form.studyLevel.highSchool.level3')}</Option>
                      </Select>
                    )}
                  </FormItem>
                </div>
              </FormItem>
              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  {<FormattedMessage id="student.form.submitBtn" />}
                </Button>
              </FormItem>
            </Form>
          </Card>
        </PageHeaderWrapper>
      </div>
    );
  }
}

export default BasicForms;
