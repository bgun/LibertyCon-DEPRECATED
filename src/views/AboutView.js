'use strict';

import React, {
  Alert,
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import config from '../../con_nexus_config.json';

import HtmlView from 'react-native-htmlview';

import { H1, H2, H3, H4 } from '../components/Headings';

import globalStyles from '../globalStyles';


let aboutText = `
`;

export default class AboutView extends Component {

  render() {
    return (
      <ScrollView style={ styles.view }>
        <H1>About { config.name }</H1>
        <HtmlView value={ aboutText } />

        <View style={{ borderTopColor: globalStyles.COLORS.border, borderTopWidth: 1, paddingTop: 30 }} />

        <H3>About This App</H3>

        <HtmlView value={ appText } />
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FAFAFA',
    padding: 20
  }
});