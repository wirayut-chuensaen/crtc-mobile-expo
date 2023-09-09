import { Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;

export default {
  urlApi: 'https://app-v2.crtc-service.com/api', // https://app-v2.crtc-service.com, https://dev.crtc-service.com/api
  // urlApi: 'https://dev.crtc-service.com/api', // https://app-v2.crtc-service.com, https://dev.crtc-service.com/api
  marginStatusBar: (53 / 1333) * deviceHeight, // 45
  color: {
    transparent: 'transparent',

    white: '#FFFFFF',
    skyles: '#6495ED',
    skyle: '#00A8FF',
    violet: '#7d00ff',
    violetlight: '#ba8beb',
    darkPurple: '#7d00ff',
    lightPurple: '#4600bf',
    blueDark: '#0622aa',
    green: '#00942c',
    dark: '#333333',
    gray: '#e1e1e1',
    cream: '#d7c3cc',
    red: '#c03427',

    black: '#000000',
    whitesmoke: '#f9f9f9',
    lightGray: '#9e9e9e',
    darktGray: '#444444',
    darkOrange: '#ff9900',
    darkOrangeGray: '#ff7621',
    darkBlue: '#038bc6',
    shadow: {
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
  },

  gridView: {
    bgColor: '#f9f9f9', // 249 249 249
  },

  statusbar: {
    backgroundColor: '#8c1515',
    color: '#000000',
    bar: '#af7621',
    yenllo: '#ff9900',
  },
};
