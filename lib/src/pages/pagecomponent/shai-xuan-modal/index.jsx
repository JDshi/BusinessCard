"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @Description: 筛选
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const index_1 = require("../../../compoments/touchable-button/index");
const index_2 = require("../../../compoments/safe-area-view/index");
const index_3 = require("../../../compoments/navigation_bar/index");
const index_4 = require("../../../compoments/sanjiao/index");
const global_1 = require("../../../const/global");
class ShaiXuanModal extends taro_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            startTime: '2020-01-01',
            endTime: datatool_1.getToday(),
            visitTime: '全部',
            shaiXuanTimes: '全部',
        };
    }
    render() {
        let { cancelCallback, modeCallback, shaiXuanMode, totalPerson, startAndEndTimeCallback } = this.props;
        let { startTime, endTime, visitTime } = this.state;
        return (<index_2.default customStyle={datatool_1.styleAssign([{
                position: 'fixed',
                zIndex: Infinity
            }, style_1.absT(0), style_1.absR(0), style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.transparent)])}>
        <index_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.default.upa, style_1.absT(0), style_1.absR(0),])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(60), style_1.bgColor(style_1.commonStyles.whiteColor)])}/>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.blackColor), style_1.op(0.5)])}/>
        </index_1.default>
        <index_3.default style={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
          <components_1.View style={datatool_1.styleAssign([{ width: '65%' }, { marginLeft: '2.5%' }, style_1.h(31), style_1.op(0.7), style_1.bgColor('#F5F5F5'),
            style_1.radiusA(26), style_1.default.uac, style_1.default.udr])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(21), style_1.h(21), style_1.ml(16)])} src={require('../../../assets/ico_search.png')}/>
            <components_1.Input type='text' placeholder='搜索客户姓名' style={datatool_1.styleAssign([style_1.ml(16), style_1.fSize(14)])}/>
          </components_1.View>
        </index_3.default>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(36), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.udr, style_1.default.uac, style_1.default.ujb,
            style_1.pl(20), style_1.pr(20)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#727272'), style_1.fSize(14)])}>{`共${totalPerson}位客户`}</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])} onClick={modeCallback}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#727272'), style_1.fSize(14)])}>{shaiXuanMode}</components_1.Text>
                <index_4.default orientation={global_1.Orientation.down} style={datatool_1.styleAssign([style_1.ml(3)])}/>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(24)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#E2BB7B'), style_1.fSize(14)])}>筛选</components_1.Text>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(14), style_1.h(14), style_1.ml(3)])} src={require('../../../assets/ico_shaixuan_orange.png')}/>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(214), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#0C0C0C'), style_1.fSize(14), style_1.ml(20), style_1.mt(10)])}>时间范围</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.pl(20), style_1.mt(12)])}>
              {['全部', '今日', '本周', '本月'].map((value, index) => {
            return <components_1.View key={index} style={datatool_1.styleAssign([style_1.padding([3, 5, 3, 5]), style_1.radiusA(2),
                style_1.default.uac, style_1.default.ujc, style_1.ml(index !== 0 ? 20 : 0), style_1.bgColor(visitTime === value ? '#E4E4E4' : style_1.commonStyles.transparent)])} onClick={() => {
                switch (value) {
                    case '全部':
                        this.setState({ visitTime: value, startTime: '', endTime: '' });
                        break;
                    case '今日':
                        this.setState({ visitTime: value, startTime: datatool_1.getToday(), endTime: datatool_1.getToday() });
                        break;
                    case '本周':
                        this.setState({
                            visitTime: value,
                            startTime: datatool_1.getWeekStartDate(),
                            endTime: datatool_1.getWeekEndDate()
                        });
                        break;
                    case '本月':
                        this.setState({
                            visitTime: value,
                            startTime: datatool_1.getMonthStartDate(),
                            endTime: datatool_1.getMonthEndDate()
                        });
                        break;
                    case '近半年':
                        this.setState({
                            visitTime: value,
                            startTime: datatool_1.getHalfYearStartDate(),
                            endTime: datatool_1.getToday()
                        });
                        break;
                    default:
                        this.setState({ visitTime: value, startTime: '', endTime: '' });
                        break;
                }
                this.setState({ visitTime: value });
            }}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.color('#0C0C0C'), style_1.fSize(14)])}>{value}</components_1.Text>
                  </components_1.View>;
        })}
            </components_1.View>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#0C0C0C'), style_1.fSize(14), style_1.ml(20), style_1.mt(16)])}>自定义时间</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.wRatio(100), style_1.pl(20), style_1.mt(14)])}>
              <components_1.Picker mode='date' onChange={(e) => {
            this.setState({ startTime: e.detail.value });
        }} value={startTime}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(14)])}>{startTime}</components_1.Text>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(8), style_1.h(5), style_1.ml(3)])} src={require('../../../assets/ico_sanjiao_down.png')}/>
                </components_1.View>
              </components_1.Picker>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#0C0C0C'), style_1.fSize(14), style_1.ml(20), style_1.mr(20)])}>至</components_1.Text>
              <components_1.Picker mode='date' onChange={(e) => {
            this.setState({ endTime: e.detail.value });
        }} value={endTime}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(14)])}>{endTime}</components_1.Text>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(8), style_1.h(5), style_1.ml(3)])} src={require('../../../assets/ico_sanjiao_down.png')}/>
                </components_1.View>
              </components_1.Picker>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.mt(10)])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.uje])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mb(15)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.w(52), style_1.h(27), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc])} onClick={() => {
            this.setState({ visitTime: '全部', startTime: '2020-01-01', endTime: datatool_1.getToday() });
        }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(16)])}>重置</components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.w(52), style_1.h(27), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc,
            style_1.bgColor(style_1.commonStyles.colorTheme), style_1.ml(130)])} onClick={() => {
            startAndEndTimeCallback(startTime, endTime);
        }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.whiteColor), style_1.fSize(16)])}>确定</components_1.Text>
                </components_1.View>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])} onClick={() => {
            cancelCallback();
            console.log('点击');
        }}/>
        </components_1.View>
      </index_2.default>);
    }
}
exports.default = ShaiXuanModal;
//# sourceMappingURL=index.jsx.map