import {StyleSheet} from 'react-native';

export const ButtonDimensions = StyleSheet.create({
  S:{ paddingVertical:8, borderRadius:4,},
  M:{ paddingVertical:8, paddingHorizontal:16, borderRadius:8},
  L: { paddingVertical: 12, paddingHorizontal:24, borderRadius:8, width: '100%' },
})


const ButtonStyle = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconWrapper: {
    marginRight: 6,
  },
});

export default ButtonStyle;