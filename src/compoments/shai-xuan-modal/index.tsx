/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 筛选
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Picker, Text, View} from "@tarojs/components";
import {
  getHalfYearStartDate,
  getMonthEndDate,
  getMonthStartDate,
  getToday,
  getWeekEndDate,
  getWeekStartDate,
  styleAssign
} from "../../utils/datatool";
import {
  absR,
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  iphoneX,
  mb,
  ml,
  mr,
  mt,
  op,
  padding, pb,
  pl,
  pr, pt,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import TouchableButton from "../touchable-button/index";
import CustomSafeAreaView from "../safe-area-view/index";
import NavigationBar from "../navigation_bar/index";
import {Orientation} from "../../const/global";
import SanJiao from "../sanjiao/index";


interface Props {
  cancelCallback: any;
  collectCallback: any;
  myVisitorCallback: any;
  shaiXuanTimesCallback: any;
  startAndEndTimeCallback: any;
  modeCallback: any;
  shaiXuanMode: string;
  totalPerson: number;
}

interface State {
  startTime: string;
  endTime: string;
  visitTime: string;
  shaiXuanTimes: string;
}

export default class ShaiXuanModal extends PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      startTime: '2020-01-01',
      endTime: getToday(),
      visitTime: '全部',
      shaiXuanTimes: '全部',
    }
  }

  render() {

    let {
      cancelCallback, collectCallback, myVisitorCallback, modeCallback, shaiXuanMode, totalPerson,
      shaiXuanTimesCallback, startAndEndTimeCallback
    } = this.props;
    let {startTime, endTime, visitTime, shaiXuanTimes} = this.state;
    let visitorSubCurrentIndex = 0, currentIndex = 0;

    return (
      <CustomSafeAreaView
        customStyle={styleAssign([{
          position: 'fixed',
          zIndex: Infinity
        }, absT(0), absR(0), wRatio(100), hRatio(100), bgColor(commonStyles.transparent)])}>
        <TouchableButton
          customStyle={styleAssign([wRatio(100), hRatio(100), styles.upa, absT(0), absR(0),])}>
          <View style={styleAssign([wRatio(100), h(60), bgColor(commonStyles.whiteColor)])}/>
          <View style={styleAssign([styles.uf1, bgColor(commonStyles.blackColor), op(0.5)])}/>
        </TouchableButton>
        <NavigationBar style={styleAssign([bgColor(commonStyles.whiteColor)])}>
          <View
            style={styleAssign([wRatio(100), h(iphoneX() ? 47 : 44), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor)])}>
            <Image style={styleAssign([w(22), h(22), ml(20)])}
                   src={require('../../assets/ico_back.png')}
                   onClick={() => {
                     Taro.navigateBack();
                   }}/>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <View style={styleAssign([styles.uac])}>
                  <Text style={styleAssign([fSize(18), color(currentIndex === 0 ? '#E2BB7B' : '#0C0C0C')])}>访客</Text>
                  <View
                    style={styleAssign([w(36), h(2), bgColor(currentIndex === 0 ? '#E2BB7B' : commonStyles.whiteColor), mt(10)])}/>
                </View>
              </View>
              <View style={styleAssign([styles.uac, styles.udr, ml(24)])}
                    onClick={collectCallback}>
                <View style={styleAssign([styles.uac])}>
                  <Text style={styleAssign([fSize(18), color(currentIndex === 1 ? '#E2BB7B' : '#0C0C0C')])}>收藏</Text>
                  <View
                    style={styleAssign([w(36), h(2), bgColor(currentIndex === 1 ? '#E2BB7B' : commonStyles.whiteColor), mt(10)])}/>
                </View>
              </View>
            </View>
            <View style={styleAssign([w(22), h(22), mr(20)])}/>
          </View>
        </NavigationBar>
        <View style={styleAssign([styles.uf1])}>
          <View
            style={styleAssign([wRatio(100), styles.uac, styles.ujc, styles.udr, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
            <View style={styleAssign([styles.uac, styles.udr, pt(10), pb(10)])}>
              <View
                style={styleAssign([styles.uac, styles.ujc, bgColor(visitorSubCurrentIndex === 0 ? '#E2BB7B' : commonStyles.pageDefaultBackgroundColor), radiusA(2)])}>
                <Text
                  style={styleAssign([mt(2), mb(2), ml(8), mr(8), color(visitorSubCurrentIndex === 0 ? commonStyles.whiteColor : '#343434')])}>谁访问了我</Text>
              </View>
              <View
                style={styleAssign([styles.uac, styles.ujc, bgColor(visitorSubCurrentIndex === 1 ? '#E2BB7B' : commonStyles.pageDefaultBackgroundColor), radiusA(2), ml(63)])}
                onClick={myVisitorCallback}>
                <Text
                  style={styleAssign([mt(2), mb(2), ml(8), mr(8), color(visitorSubCurrentIndex === 1 ? commonStyles.whiteColor : '#343434')])}>我访问了谁</Text>
              </View>
            </View>
          </View>
          {/*条件筛选*/}
          <View
            style={styleAssign([wRatio(100), h(36), bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb,
              pl(20), pr(20)])}>
            <Text style={styleAssign([color('#727272'), fSize(14)])}>{`共${totalPerson}位访客`}</Text>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <View style={styleAssign([styles.uac, styles.udr])}
                    onClick={modeCallback}>
                <Text style={styleAssign([color('#727272'), fSize(14)])}>{shaiXuanMode}</Text>
                <SanJiao orientation={Orientation.down} style={styleAssign([ml(3)])}/>
              </View>
              <View style={styleAssign([styles.uac, styles.udr, ml(24)])}>
                <Text style={styleAssign([color('#E2BB7B'), fSize(14)])}>筛选</Text>
                <Image style={styleAssign([w(14), h(14), ml(3)])}
                       src={require('../../assets/ico_shaixuan_orange.png')}/>
              </View>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          {/*筛选内容*/}
          {
            shaiXuanMode === '最后访问时间' ?
              <View style={styleAssign([wRatio(100), h(214), bgColor(commonStyles.whiteColor)])}>
                <Text style={styleAssign([color('#0C0C0C'), fSize(14), ml(20), mt(16)])}>访问时间</Text>
                <View style={styleAssign([styles.uac, styles.udr, pl(20), mt(12)])}>
                  {
                    ['全部', '今日', '本周', '本月'].map((value, index) => {
                      return <View key={index} style={styleAssign([padding([3, 5, 3, 5]), radiusA(2),
                        styles.uac, styles.ujc, ml(index !== 0 ? 20 : 0), bgColor(visitTime === value ? '#E4E4E4' : commonStyles.transparent)])}
                                   onClick={() => {
                                     switch (value) {
                                       case '全部':
                                         this.setState({visitTime: value, startTime: '', endTime: ''});
                                         break;
                                       case '今日':
                                         this.setState({visitTime: value, startTime: getToday(), endTime: getToday()});
                                         break;
                                       case '本周':
                                         this.setState({
                                           visitTime: value,
                                           startTime: getWeekStartDate(),
                                           endTime: getWeekEndDate()
                                         });
                                         break;
                                       case '本月':
                                         this.setState({
                                           visitTime: value,
                                           startTime: getMonthStartDate(),
                                           endTime: getMonthEndDate()
                                         });
                                         break;
                                       case '近半年':
                                         this.setState({
                                           visitTime: value,
                                           startTime: getHalfYearStartDate(),
                                           endTime: getToday()
                                         });
                                         break;
                                       default:
                                         this.setState({visitTime: value, startTime: '', endTime: ''});
                                         break;
                                     }
                                     this.setState({visitTime: value});
                                   }}>
                        <Text style={styleAssign([color('#0C0C0C'), fSize(14)])}>{value}</Text>
                      </View>;
                    })
                  }
                </View>
                <Text style={styleAssign([color('#0C0C0C'), fSize(14), ml(20), mt(16)])}>自定义时间</Text>
                <View style={styleAssign([styles.uac, styles.udr, wRatio(100), pl(20), mt(14)])}>
                  <Picker mode='date' onChange={(e) => {
                    this.setState({startTime: e.detail.value});
                  }} value={startTime}>
                    <View style={styleAssign([styles.uac, styles.udr])}>
                      <Text style={styleAssign([color('#979797'), fSize(14)])}>{startTime}</Text>
                      <Image style={styleAssign([w(8), h(5), ml(3)])}
                             src={require('../../assets/ico_sanjiao_down.png')}/>
                    </View>
                  </Picker>
                  <Text style={styleAssign([color('#0C0C0C'), fSize(14), ml(20), mr(20)])}>至</Text>
                  <Picker mode='date' onChange={(e) => {
                    this.setState({endTime: e.detail.value});
                  }} value={endTime}>
                    <View style={styleAssign([styles.uac, styles.udr])}>
                      <Text style={styleAssign([color('#979797'), fSize(14)])}>{endTime}</Text>
                      <Image style={styleAssign([w(8), h(5), ml(3)])}
                             src={require('../../assets/ico_sanjiao_down.png')}/>
                    </View>
                  </Picker>
                </View>
                <View
                  style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), mt(10)])}/>
                <View style={styleAssign([styles.uf1, styles.uac, styles.uje])}>
                  <View style={styleAssign([styles.uac, styles.udr, mb(15)])}>
                    <View style={styleAssign([w(52), h(27), radiusA(4), styles.uac, styles.ujc])}
                          onClick={() => {
                            this.setState({visitTime: '全部', startTime: '2020-01-01', endTime: getToday()});
                          }}>
                      <Text style={styleAssign([color(commonStyles.colorTheme), fSize(16)])}>重置</Text>
                    </View>
                    <View style={styleAssign([w(52), h(27), radiusA(4), styles.uac, styles.ujc,
                      bgColor(commonStyles.colorTheme), ml(130)])}
                          onClick={() => {
                            startAndEndTimeCallback(startTime, endTime);
                          }}>
                      <Text style={styleAssign([color(commonStyles.whiteColor), fSize(16)])}>确定</Text>
                    </View>
                  </View>
                </View>
              </View> :
              <View style={styleAssign([wRatio(100), h(156), bgColor(commonStyles.whiteColor)])}>
                <Text style={styleAssign([color('#0C0C0C'), fSize(14), ml(20), mt(16)])}>访问次数</Text>
                <View style={styleAssign([styles.uac, styles.udr, pl(20), mt(12)])}>
                  {
                    ['全部', '10次内', '30次内', '大于30次'].map((value, index) => {
                      return <View key={index} style={styleAssign([padding([3, 5, 3, 5]), radiusA(2),
                        styles.uac, styles.ujc, ml(index !== 0 ? 20 : 0), bgColor(shaiXuanTimes === value ? '#E4E4E4' : commonStyles.transparent)])}
                                   onClick={() => {
                                     this.setState({shaiXuanTimes: value});
                                   }}>
                        <Text style={styleAssign([color('#0C0C0C'), fSize(14)])}>{value}</Text>
                      </View>;
                    })
                  }
                </View>
                <View
                  style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), mt(10)])}/>
                <View style={styleAssign([styles.uf1, styles.uac, styles.uje])}>
                  <View style={styleAssign([styles.uac, styles.udr, mb(15)])}>
                    <View style={styleAssign([w(52), h(27), radiusA(4), styles.uac, styles.ujc])}
                          onClick={() => {
                            this.setState({shaiXuanTimes: '全部'});
                          }}>
                      <Text style={styleAssign([color(commonStyles.colorTheme), fSize(16)])}>重置</Text>
                    </View>
                    <View style={styleAssign([w(52), h(27), radiusA(4), styles.uac, styles.ujc,
                      bgColor(commonStyles.colorTheme), ml(130)])}
                          onClick={() => {
                            switch (shaiXuanTimes) {
                              case '全部':
                                shaiXuanTimesCallback(0);
                                break;
                              case '10次内':
                                shaiXuanTimesCallback(1);
                                break;
                              case '30次内':
                                shaiXuanTimesCallback(2);
                                break;
                              case '大于30次':
                                shaiXuanTimesCallback(3);
                                break;
                              default:
                                shaiXuanTimesCallback(0);
                                break;
                            }
                          }}>
                      <Text style={styleAssign([color(commonStyles.whiteColor), fSize(16)])}>确定</Text>
                    </View>
                  </View>
                </View>
              </View>
          }
          <View style={styleAssign([styles.uf1])}
                onClick={() => {
                  cancelCallback();
                  console.log('点击')
                }}/>
        </View>
      </CustomSafeAreaView>
    );
  }
}
