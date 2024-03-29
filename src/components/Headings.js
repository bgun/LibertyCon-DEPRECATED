'use strict';

import React from 'react-native';

let { Text, StyleSheet } = React;


let Heading1 = (props) => (
  <Text style={[ props.style, styles.h1 ]}>{ props.children }</Text>
);
let Heading2 = (props) => (
  <Text style={[ props.style, styles.h2 ]}>{ props.children }</Text>
);
let Heading3 = (props) => (
  <Text style={[ props.style, styles.h3 ]}>{ props.children }</Text>
);
let Heading4 = (props) => (
  <Text style={[ props.style, styles.h4 ]}>{ props.children }</Text>
);

let styles = StyleSheet.create({
  h1: {
    color: '#444444',
    fontSize: 28,
    marginBottom: 10,
    marginTop: 20
  },
  h2: {
    color: '#444444',
    fontSize: 22,
    marginBottom: 10,
    marginTop: 20
  },
  h3: {
    color: '#666666',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20
  },
  h4: {
    color: '#888888',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20
  }
});

module.exports = {
  H1: Heading1,
  H2: Heading2,
  H3: Heading3,
  H4: Heading4
}
