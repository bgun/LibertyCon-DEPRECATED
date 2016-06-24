'use strict';

let _borderColor = '#DDDDDD';

export default {
  COLORS: {
    border: '#DDD',
    headerBg: '#9A8',
    highlight: '#537',
    highlightDark: '#325',
    menuBg: '#243',
    sectionHeader: '#958'
  },
  floatingList: {
    backgroundColor: '#FFFFFF',
    borderColor: _borderColor,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    marginTop: 10
  },
  floatingListItem: {
    borderColor: _borderColor,
    borderTopWidth: 1
  },
  newsButton: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    marginTop: 18,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 50
  },
  newsDot: {
    backgroundColor: 'red',
    borderRadius: 10,
    height: 10,
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10
  }
}