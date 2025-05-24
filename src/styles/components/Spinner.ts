import { StyleSheet } from 'react-native';

import { Colors } from '../../styling';
import {width,height} from '../../utils/device';

export default StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: height,
    width: width,
    backgroundColor: Colors.opacity.black30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  spinnerContainer: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: Colors.opacity.black60,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: Colors.neutrals.white,
    fontSize: 16,
    fontWeight: '500',
  },
});
