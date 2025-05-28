import Colors from './Colors';
import  {GlobalTypes} from'../types/globalTypes';

const globalStyles:GlobalTypes = {
  absolute: { position: 'absolute' },
  spaceBetween: {
    flex: 1,
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  aICenter: {
    alignItems: 'center',
  },
  aITop: {
    alignItems: 'flex-start',
  },
  aIStart: {
    alignItems: 'flex-start',
  },
  aIEnd: {
    alignItems: 'flex-end',
  },
  aIRight: {
    alignItems: 'flex-end',
  },
  aSCenter: {
    alignSelf: 'center',
  },
  aSTop: {
    alignSelf: 'flex-start',
  },
  aSStart: {
    alignSelf: 'flex-start',
  },
  aSEnd: {
    alignSelf: 'flex-end',
  },
  aSStretch: {
    alignSelf: 'stretch',
  },
  centeredRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jCCenter: {
    justifyContent: 'center',
  },
  jCEnd: {
    justifyContent: 'flex-end',
  },
  jCStart: {
    justifyContent: 'flex-start',
  },
  jCSpaceBetween: {
    justifyContent: 'space-between',
  },
  jCSpaceEvenly: {
    justifyContent: 'space-evenly',
  },
  oFHidden: {
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  textCenter: {
    textAlign: 'center',
  },
  m0: {
    margin: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  m5: {
    margin: 5,
  },
  m10: {
    margin: 10,
  },
  m15: {
    margin: 15,
  },
  m20: {
    margin: 20,
  },
  m30: {
    margin: 30,
  },
  mV0: {
    marginVertical: 0,
  },
  mV5: {
    marginVertical: 5,
  },
  mV10: {
    marginVertical: 10,
  },
  mV15: {
    marginVertical: 15,
  },
  mV20: {
    marginVertical: 20,
  },
  mV25: {
    marginVertical: 25,
  },
  mV30: {
    marginVertical: 30,
  },
  mV40: {
    marginVertical: 40,
  },
  mV50: {
    marginVertical: 50,
  },
  mH5: {
    marginHorizontal: 5,
  },
  mH10: {
    marginHorizontal: 10,
  },
  mH15: {
    marginHorizontal: 15,
  },
  mH20: {
    marginHorizontal: 20,
  },
  mH25: {
    marginHorizontal: 25,
  },
  mH30: {
    marginHorizontal: 30,
  },
  mH35: {
    marginHorizontal: 35,
  },
  mH40: {
    marginHorizontal: 40,
  },
  mH45: {
    marginHorizontal: 45,
  },
  mH50: {
    marginHorizontal: 50,
  },
  mB0: {
    marginBottom: 0,
  },
  mB5: {
    marginBottom: 5,
  },
  mB10: {
    marginBottom: 10,
  },
  mB15: {
    marginBottom: 15,
  },
  mB20: {
    marginBottom: 20,
  },
  mB25: {
    marginBottom: 25,
  },
  mB30: {
    marginBottom: 30,
  },
  mB35: {
    marginBottom: 35,
  },
  mB40: {
    marginBottom: 40,
  },
  mB50: {
    marginBottom: 50,
  },
  mT0: {
    marginTop: 0,
  },
  mT5: {
    marginTop: 5,
  },
  mT10: {
    marginTop: 10,
  },
  mT15: {
    marginTop: 15,
  },
  mT20: {
    marginTop: 20,
  },
  mT25: {
    marginTop: 25,
  },
  mT30: {
    marginTop: 30,
  },
  mT35: {
    marginTop: 35,
  },
  mT40: {
    marginTop: 40,
  },
  mT45: {
    marginTop: 45,
  },
  mT50: {
    marginTop: 50,
  },
  mL0: {
    marginLeft: 0,
  },
  mL5: {
    marginLeft: 5,
  },
  mL10: {
    marginLeft: 10,
  },
  mL15: {
    marginLeft: 15,
  },
  mL20: {
    marginLeft: 20,
  },
  mL25: {
    marginLeft: 25,
  },
  mL30: {
    marginLeft: 30,
  },
  mL40: {
    marginLeft: 40,
  },
  mL50: {
    marginLeft: 50,
  },
  mR0: {
    marginRight: 0,
  },
  mR5: {
    marginRight: 5,
  },
  mR10: {
    marginRight: 10,
  },
  mR15: {
    marginRight: 15,
  },
  mR20: {
    marginRight: 20,
  },
  mR25: {
    marginRight: 20,
  },
  mR30: {
    marginRight: 30,
  },
  pT0: {
    paddingTop: 0,
  },
  pT5: {
    paddingTop: 5,
  },
  pT10: {
    paddingTop: 10,
  },
  pT15: {
    paddingTop: 15,
  },
  pT20: {
    paddingTop: 20,
  },
  pT25: {
    paddingTop: 25,
  },
  pT30: {
    paddingTop: 30,
  },
  pB0: {
    paddingBottom: 0,
  },
  pB10: {
    paddingBottom: 10,
  },
  pB15: {
    paddingBottom: 15,
  },
  pB20: {
    paddingBottom: 20,
  },
  pB25: {
    paddingBottom: 25,
  },
  pB30: {
    paddingBottom: 30,
  },
  pB40: {
    paddingBottom: 40,
  },
  pB50: {
    paddingBottom: 50,
  },
  pB100: {
    paddingBottom: 100,
  },
  pL0: {
    paddingLeft: 0,
  },
  pL5: {
    paddingLeft: 5,
  },
  pL10: {
    paddingLeft: 10,
  },
  pL15: {
    paddingLeft: 15,
  },
  pL20: {
    paddingLeft: 20,
  },
  pL30: {
    paddingLeft: 30,
  },
  pR0: {
    paddingRight: 0,
  },
  pR5: {
    paddingRight: 5,
  },
  pR10: {
    paddingRight: 10,
  },
  pR15: {
    paddingRight: 15,
  },
  pR20: {
    paddingRight: 20,
  },
  pR30: {
    paddingRight: 30,
  },
  pR35: {
    paddingRight: 35,
  },
  p0: {
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  p5: {
    padding: 5,
  },
  p10: {
    padding: 10,
  },
  p20: {
    padding: 20,
  },
  p30: {
    padding: 30,
  },
  pH0: {
    paddingHorizontal: 0,
  },
  pH5: {
    paddingHorizontal: 5,
  },
  pH10: {
    paddingHorizontal: 10,
  },
  pH15: {
    paddingHorizontal: 15,
  },
  pH20: {
    paddingHorizontal: 20,
  },
  pH25: {
    paddingHorizontal: 25,
  },
  pH30: {
    paddingHorizontal: 30,
  },
  pH40: {
    paddingHorizontal: 40,
  },
  pV10: {
    paddingVertical: 10,
  },
  pV15: {
    paddingVertical: 15,
  },
  pV20: {
    paddingVertical: 20,
  },
  pV30: {
    paddingVertical: 30,
  },
  width50p: {
    width: '50%',
  },
  width60p: {
    width: '60%',
  },
  width70p: {
    width: '70%',
  },
  w80p: {
    width: '80%',
  },
  w90p: {
    width: '90%',
  },
  w100p: {
    width: '100%',
  },
  w10: {
    width: 10,
  },
  w20: {
    width: 20,
  },
  w25: {
    width: 25,
  },
  w30: {
    width: 30,
  },
  w40: {
    width: 40,
  },
  w50: {
    width: 50,
  },
  w60: {
    width: 60,
  },
  w70: {
    width: 70,
  },
  w80: {
    width: 80,
  },
  w90: {
    width: 90,
  },
  w100: {
    width: 100,
  },
  w150: {
    width: 150,
  },
  hNull: {
    height: null,
  },
  h10: {
    height: 10,
  },
  h20: {
    height: 20,
  },
  h25: {
    height: 25,
  },
  h30: {
    height: 30,
  },
  h40: {
    height: 40,
  },
  h50: {
    height: 50,
  },
  h60: {
    height: 60,
  },
  border: {
    borderWidth: 1,
  },
  border2: {
    borderWidth: 2,
  },
  noBorder: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  borderRight: {
    borderRightWidth: 1,
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  borderLRB: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  borderTransp: {
    borderColor: 'transparent',
  },
  flex: {
    flex: 1,
  },
  flex03: {
    flex: 0.3,
  },
  flex05: {
    flex: 0.5,
  },
  flex08: {
    flex: 0.8,
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexGrowNull: {
    flexGrow: null,
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  ffRegular: {
    fontWeight: '400',
  },
  ffSemiBold: {
    fontWeight: '500',
  },
  ffBold: {
    fontWeight: 'bold',
  },
  fS8: {
    fontSize: 8,
  },
  fS9: {
    fontSize: 9,
  },
  fS10: {
    fontSize: 10,
  },
  fS11: {
    fontSize: 11,
  },
  fS12: {
    fontSize: 12,
  },
  fS13: {
    fontSize: 13,
  },
  fS14: {
    fontSize: 14,
  },
  fS15: {
    fontSize: 15,
  },
  fS16: {
    fontSize: 16,
  },
  fS17: {
    fontSize: 17,
  },
  fS18: {
    fontSize: 18,
  },
  fS20: {
    fontSize: 20,
  },
  fS21: {
    fontSize: 21,
  },
  fS22: {
    fontSize: 22,
  },
  fS23: {
    fontSize: 23,
  },
  fS24: {
    fontSize: 24,
  },
  fS25: {
    fontSize: 25,
  },
  fS26: {
    fontSize: 26,
  },
  fS27: {
    fontSize: 27,
  },
  fS28: {
    fontSize: 28,
  },
  fS29: {
    fontSize: 29,
  },
  fS30: {
    fontSize: 30,
  },
  fS32: {
    fontSize: 32,
  },
  fS35: {
    fontSize: 35,
    lineHeight: 35,
  },
  lH12: {
    lineHeight: 12,
  },
  lH13: {
    lineHeight: 13,
  },
  lH14: {
    lineHeight: 14,
  },
  lH15: {
    lineHeight: 15,
  },
  lH16: {
    lineHeight: 16,
  },
  lH17: {
    lineHeight: 17,
  },
  lH18: {
    lineHeight: 18,
  },
  lH19: {
    lineHeight: 19,
  },
  lH20: {
    lineHeight: 20,
  },
  lH21: {
    lineHeight: 21,
  },
  lH22: {
    lineHeight: 22,
  },
  lH32: {
    lineHeight: 32,
  },
  resizeModeContain: {
    resizeMode: 'contain',
  },
  resizeModeCover: {
    resizeMode: 'cover',
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
  textTransformNone: {
    textTransform: 'none',
  },
  textUpperCase: {
    textTransform: 'uppercase',
  },
  absoluteFillObject: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  l0: { left: 0 },
  l10: { left: 10 },
  l20: { left: 20 },
  l30: { left: 30 },
  l40: { left: 40 },
  l50: { left: 50 },
  r0: { right: 0 },
  r10: { right: 10 },
  r20: { right: 20 },
  r30: { right: 30 },
  r40: { right: 40 },
  r50: { right: 50 },
  bgBlack: { backgroundColor: Colors.neutrals[600] },
  bgWhite: { backgroundColor: Colors.neutrals.white },
};

export default globalStyles;
