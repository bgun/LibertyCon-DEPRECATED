'use strict';

import React, {
  Alert,
  Component,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import _ from 'lodash';
import HtmlView from 'react-native-htmlview';

import globalStyles from '../globalStyles';

import EventItem from '../components/EventItem';
import { H1, H2, H3, H4 } from '../components/Headings';

let window = Dimensions.get('window');


class ExpandableText extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showMore : props.defaultOpen,
      btnText  : props.defaultOpen ? 'Show Less' : 'Show More'
    }
  }
  toggleMore() {
    let show = !this.state.showMore;
    this.setState({
      showMore : show,
      btnText  : show ? 'Show Less' : 'Show More'
    });
  }
  render() {
    return (
      <View style={[this.props.style, { flex: 1, flexDirection: 'column' }]}>
        { this.props.text && this.props.text.length >= this.props.max ? (
          <View>
            { this.state.showMore ? (
              <View><HtmlView value={ this.props.text } /></View>
            ) : (
              <HtmlView value={ this.props.text.substr(0, this.props.max)+"..." } />
            ) }
            <TouchableOpacity onPress={ this.toggleMore.bind(this) }>
              <Text style={ this.props.btnStyle }>{ this.state.btnText }</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <HtmlView value={ this.props.text } />
        ) }
      </View>
    )
  }
}
ExpandableText.defaultProps = {
  btnStyle: {
    color: globalStyles.COLORS.highlight,
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 15,
    textAlign: 'right'
  },
  defaultOpen: false,
  max: 140
};

export default class GuestDetailView extends Component {

  render() {
    let guest = _.find(global.con_data.guests, g => g.guest_id === this.props.guest_id);
    if (!guest) {
      Alert.alert("Guest "+guest.guest_id+" not found!");
      return null;
    }
    guest.event_list = global.con_data.events
      .filter(e => _.includes(e.guest_list, guest.guest_id))
      .map(e => e.event_id);

    return (
      <ScrollView style={ styles.view }>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <H1 style={{ top: -20, alignSelf: 'flex-start', alignItems: 'flex-start', width: window.width - 140 }}>{ guest.name }</H1>
          <Image style={ styles.image } source={{ uri: 'http://www.libertycon.org/images/pros/'+guest.image }} />
        </View>

        <ExpandableText style={{ marginTop: 10 }} text={ guest.bio } />

        <H4>Itinerary</H4>
        <View style={[styles.list, globalStyles.floatingList]}>
          { guest.event_list ? guest.event_list.map(e => (
            <EventItem key={ e } event_id={ e } />
          )) : null}
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FAFAFA',
    padding: 20
  },
  list: {
    marginBottom: 50
  },
  image: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#DDD',
    height: 90,
    width: 90
  }
});