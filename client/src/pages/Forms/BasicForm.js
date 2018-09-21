import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { FormattedMessage, setLocale, getLocale } from 'umi/locale';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
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
    return (
      <PageHeaderWrapper content="To add a new student to the list , fill all fields below with the appropraite values">
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
              })(<Input placeholder="CNE de l'étudiant" />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="student.form.fullName" />}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: <FormattedMessage id="student.form.fullName.message" />,
                  },
                ],
              })(<Input placeholder="nom et prénom de l'étudiant" />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="student.form.birthDay" />}>
              {getFieldDecorator('Bdate', {
                rules: [
                  {
                    required: true,
                    message: <FormattedMessage id="student.form.birthDay.message" />,
                  },
                ],
              })(<DatePicker style={{ width: '100%' }} placeholder={['birth-day']} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="student.form.birthPlace" />}>
              {getFieldDecorator('Bplace', {
                rules: [
                  {
                    required: true,
                    message: <FormattedMessage id="student.form.birthPlace.message" />,
                  },
                ],
              })(<Input placeholder="place de naissance de l'étudiant" />)}
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
                  placeholder="vous pouvez ecrire un commentaire sur l'etudiant"
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="student.form.studyLevel" />}>
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">Collége</Radio>
                    <Radio value="2">Lycée</Radio>
                  </Radio.Group>
                )}
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('publicUsers')(
                    <Select
                      mode="multiple"
                      placeholder="select level"
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('public') === '1' ? 'block' : 'none',
                      }}
                    >
                      <Option value="1">1er année </Option>
                      <Option value="2">2eme année</Option>
                      <Option value="3">3eme année</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('publicUsers')(
                    <Select
                      mode="multiple"
                      placeholder="select level"
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('public') === '2' ? 'block' : 'none',
                      }}
                    >
                      <Option value="1">année péparatiore</Option>
                      <Option value="2">1er bac</Option>
                      <Option value="3">2eme bac</Option>
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
    );
  }
}

export default BasicForms;
