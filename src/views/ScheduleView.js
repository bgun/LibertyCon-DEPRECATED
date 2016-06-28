'use strict';

import React from 'react-native';

let {
  Component,
  Dimensions,
  InteractionManager,
  ListView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} = React;

import _      from 'lodash';
import moment from 'moment';

import EventItem from '../components/EventItem';
import globalStyles from '../globalStyles';

let window = Dimensions.get('window');

let HEADER_HEIGHT = 84;

let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export default class ScheduleView extends Component {

  constructor(props) {
    super();

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged           : (r1, r2) => r1 !== r2,
      }),
      searchResults: [],
      isSearching: false
    };
  }

  componentWillMount() {
    this.refreshDataSource();
  }

  handleFilterInput(text) {
    if (text.length > 2) {
      let filteredEvents = global.con_data.events.filter(e => {
        let str = e.title+' '+e.location;
        return str.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      this.setState({
        isSearching: true,
        searchResults: filteredEvents,
        filterText: text
      });
      console.log("Displaying events", filteredEvents);
    } else {
      this.setState({
        isSearching: false,
        filterText: text
      });
    }
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={ styles.section }>
        <Text style={ styles.sectionText }>
          { sectionData.format('dddd, MMMM D').toUpperCase() }
        </Text>
      </View>
    );
  }

  renderRow(rowData) {
    return <EventItem key={ rowData.event_id } event_id={ rowData.event_id } />;
  }

  refreshDataSource() {
    let getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };

    let getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID+':'+rowID];
    };

    let dataBlob = {};
    let sectionIDs = [];
    let rowIDs     = [];
    let currentDay = null;

    let events = global.con_data.events;
    let totalEvents = events.length;
    this.hiddenEventsCount = 0;
    if (!global.showPastEvents) {
      let now = Date.now() + (1000*60*60*1.5); // add hours
      events = global.con_data.events.filter(ev => ev.datetime >= now);
      this.hiddenEventsCount = totalEvents - events.length;
    }

    _.forEach(events, (e, index) => {
      let d = moment(e.datetime).subtract(4, 'hr'); //, "YYYY-MM-DDThh:mm:ss");
      let day = days[d.day()];
      if (day !== currentDay) {
        sectionIDs.push(day);
        dataBlob[day] = d;
        rowIDs.push([]);
        currentDay = day;
      }
      let key = e.event_id+'-i'+index;
      rowIDs[rowIDs.length-1].push(key);
      dataBlob[day+':'+key] = e;
    });

    let ds = new ListView.DataSource({
      getRowData     : getRowData,
      getSectionData : getSectionData,
      rowHasChanged           : (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2
    });

    this.setState({
      dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
    });
  }

  toggleShowPastEvents() {
    global.showPastEvents = !global.showPastEvents;
    this.refreshDataSource();
  }

  render() {

    let switchText = global.showPastEvents ? 'Showing all events' : 'Hiding '+this.hiddenEventsCount+' past events';

    return (
      <View style={{ flex: 1 }}>
        { this.state.isSearching ? (
          <View>
            <View style={[styles.section, { marginTop: 40 }]}><Text style={ styles.sectionText }>SEARCH RESULTS</Text></View>
            <ScrollView style={ styles.searchResults }>
              { this.state.searchResults.map(sr => (
                <EventItem key={ sr.event_id } event_id={ sr.event_id } />
              ) ) }
            </ScrollView>
          </View>
        ) : (
          <ListView
            ref='listview'
            style={ styles.scroll }
            dataSource={ this.state.dataSource }
            renderRow={ this.renderRow }
            renderSectionHeader={ this.renderSectionHeader }
          />
        ) }

        { this.state.isSearching && this.state.searchResults.length === 0 ? (
          <Text style={ styles.noResults }>No results found</Text>
        ) : null }

        <View style={ styles.filterContainer }>
          <TextInput placeholder="Search for an event" style={ styles.filterInput } value={ this.state.filterText } onChangeText={ this.handleFilterInput.bind(this) } />
          { this.state.isSearching ? null : (
          <View style={ styles.switchContainer }>
            <Switch onTintColor='#334422' value={ global.showPastEvents } onValueChange={ this.toggleShowPastEvents.bind(this) } />
            <Text style={ styles.switchText }>{ switchText }</Text>
          </View>
          ) }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: 'white',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    height: 40,
    position: 'absolute',
      top: 0,
      left: 0,
    width: window.width
  },
  filterInput: {
    fontSize: 15,
    height: 40,
    paddingHorizontal: 10
  },
  noResults: {
    padding: 10
  },
  scroll: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginTop: HEADER_HEIGHT
  },
  searchResults: {
    backgroundColor: '#F8F8F8',
    height: window.height - HEADER_HEIGHT,
    position: 'absolute',
      left: 0,
    width: window.width
  },
  searchResultsHeader: {
    backgroundColor: globalStyles.COLORS.highlight,
    marginTop: HEADER_HEIGHT,
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  section: {
    backgroundColor: globalStyles.COLORS.sectionHeader,
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  sectionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.85
  },
  switchContainer: {
    borderColor: '#EEE',
    borderTopWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexDirection: 'row'
  },
  switchText: {
    color: '#888',
    padding: 8
  }
});