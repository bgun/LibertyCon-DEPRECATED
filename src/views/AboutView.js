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


let aboutText = config.aboutMarkup;

let appText = `
<p><strong>Con-Nexus</strong> is a lightweight, open-source convention app framework created by Ben Gundersen, and currently built with React Native. You can find more information on <a href="https://github.com/bgun">GitHub</a>, or email me: <a href="mailto:ben@bengundersen.com">ben@bengundersen.com</a>.</p>
<p><em>Made with &hearts; in New York City</em></p>
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