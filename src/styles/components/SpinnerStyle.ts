import { StyleSheet } from 'react-native';
import { width, height } from '../../utils/device';

const SpinnerStyle = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  spinnerContainer: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
});

export default SpinnerStyle;
