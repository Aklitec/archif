import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Trend from '@/components/Trend';
import NumberInfo from '@/components/NumberInfo';
import numeral from 'numeral';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import Yuan from '@/utils/Yuan';
import { getTimeDistance } from '@/utils/utils';

class Certificat extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <h2>Certificats history</h2>
        <br />
        <p>this a blank page for the history of printed cerfificats</p>
        <p>this a blank page for the history of printed cerfificats</p>
        <p>this a blank page for the history of printed cerfificats</p>
        <p>this a blank page for the history of printed cerfificats</p>
        <p>this a blank page for the history of printed cerfificats</p>
      </div>
    );
  }
}

export default Certificat;
