import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Checkbox, Alert, Button } from 'antd';
import Login from '@/components/Login';
import { FormattedMessage, setLocale, getLocale } from 'umi/locale';
import __ from '../Forms/translate';
import styles from './Login.less';

const { UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  changLang = () => {
    const locale = getLocale();
    if (!locale || locale === 'fr-FR') {
      setLocale('en-US');
    } else {
      setLocale('fr-FR');
    }
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting, theme } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <div>
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage(__('login.messageError'))}
            <UserName name="userName" placeholder={__('login.username.placeholder')} />
            <Password
              name="password"
              placeholder={__('login.admin.password')}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </div>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              {__('login.autoLogin')}
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              {__('login.forgetLogin')}
            </a>
          </div>
          <Submit loading={submitting}>{__('login.logIN')}</Submit>
          <div className={styles.other}>
            <Link className={styles.register} to="/User/Register">
              {__('login.registerAccount')}
            </Link>
            <Button
              className={styles.lang}
              size="small"
              ghost={theme === 'dark'}
              style={{
                margin: '0 8px',
              }}
              onClick={() => {
                this.changLang();
              }}
            >
              <FormattedMessage id="navbar.lang.login" />
            </Button>
          </div>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
