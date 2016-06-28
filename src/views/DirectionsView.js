'use strict';

import React, {
  Alert,
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import HtmlView from 'react-native-htmlview';

import config from '../../con_nexus_config.json';

import { H1, H2, H3, H4 } from '../components/Headings';

import globalStyles from '../globalStyles';
import ExternalLink from '../components/ExternalLink';


let formatPhone = (num) => {
  if (num.length === 11) {
    // 1-800-555-1234
    return [num.slice(0,1), num.slice(1,4), num.slice(4,7), num.slice(7)].join('-');
  } else if (num.length === 10) {
    // 555-555-1234
    return [num.slice(0,3), num.slice(3,6), num.slice(6)].join('-');
  }
};



export default class AboutView extends Component {

  render() {
    return (
      <ScrollView style={ styles.view }>
        <View style={{ marginHorizontal: 10 }}>
          <H3>Convention Maps</H3>
        </View>
        <TouchableOpacity style={ styles.btn } onPress={ () => Actions.hotelMap() }>
          <Text style={ styles.btnText }>Hotel Map</Text>
        </TouchableOpacity>

        <View style={{ marginHorizontal: 10 }}>
          <H3>Hotel Info</H3>
        </View>
        <View style={ styles.btn }>
          <ExternalLink url={ config.hotelMapLink }>
            <Text style={[ styles.address, { fontWeight: 'bold' }]}>{ config.hotelName }</Text>
            <Text style={ styles.address }>{ config.hotelAddress }</Text>
          </ExternalLink>
        </View>
        <View style={ styles.btn }>
          <ExternalLink url={ "tel://"+config.hotelPhone }>
            <Text style={ styles.phone }>{ formatPhone(config.hotelPhone) }</Text>
          </ExternalLink>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FAFAFA',
    padding: 20
  },
  address: {
    color: globalStyles.COLORS.highlightDark,
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center'
  },
  btn: {
    borderColor: globalStyles.COLORS.border,
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    padding: 10
  },
  btnText: {
    color: '#548',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  phone: {
    color: globalStyles.COLORS.highlightDark,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});