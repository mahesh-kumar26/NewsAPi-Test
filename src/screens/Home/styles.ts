import {StyleSheet} from 'react-native';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    paddingTop: isIphoneX() ? getStatusBarHeight() + 20 : 20,
  },
  list: {
    flex: 1,
    flexGrow: 1,
    paddingVertical: 8,
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
}

});
