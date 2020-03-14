"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename my_collect.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @Description: 我的收藏
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const safe_area_view_1 = require("../../compoments/safe-area-view");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/business_card");
const visitorActions = require("../../actions/visitor");
const global_1 = require("../../const/global");
const components_1 = require("@tarojs/components");
const collect_item_1 = require("../sub_pagecomponent/collect-item");
const businesscard_remove_notice_1 = require("../sub_pagecomponent/businesscard-remove-notice");
const visitor_item_1 = require("../sub_pagecomponent/visitor-item");
const shai_xuan_modal_1 = require("../sub_pagecomponent/shai-xuan-modal");
const mode_modal_1 = require("../sub_pagecomponent/mode-modal");
const navigation_bar_1 = require("../../compoments/navigation_bar");
const sanjiao_1 = require("../../compoments/sanjiao");
const httpurl_1 = require("../../api/httpurl");
let MyCollect = class MyCollect extends taro_1.Component {
    constructor(props) {
        super(props);
        /**
         * 指定config的类型声明为: Taro.Config
         *
         * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
         * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
         * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
         */
        this.config = {
            disableScroll: true
        };
        this.refresh = () => {
            this.pageNo = 1;
            this.getVisitorList(true);
        };
        this.loadMore = () => {
            this.pageNo++;
            this.getVisitorList();
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/2/9
         * @function: 查询我的访客列表
         */
        this.getVisitorList = (refresh) => {
            let params;
            let { startTime, endTime, shaiXuanTimes } = this.state;
            params = {
                type: this.state.visitorSubCurrentIndex,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            if (startTime.length !== 0 &&
                endTime.length !== 0) {
                Object.assign(params, { startDate: startTime, endDate: endTime });
            }
            if (shaiXuanTimes !== 0) {
                Object.assign(params, { visitCount: shaiXuanTimes });
            }
            this.viewRef && this.viewRef.showLoading();
            this.props.getVisitorList(params).then((res) => {
                console.log('查询我的访客列表', res);
                this.viewRef && this.viewRef.hideLoading();
                if (refresh) {
                    this.setState({ recordList: res.records, total: res.total });
                }
                else if (res.records && res.records.length !== 0) {
                    this.setState({ recordList: this.state.recordList.concat(res.records), total: res.total });
                }
                else {
                    datatool_1.toast('没有记录了');
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/2/9
         * @function: 获取我收藏的名片列表
         */
        this.myCollectList = () => {
            this.viewRef.showLoading();
            this.props.myCollectList({ type: this.state.collectSubCurrentIndex }).then((res) => {
                this.viewRef.hideLoading();
                console.log('获取我收藏的名片列表', res);
                this.setState({ collectUserList: res.userList });
            }).catch(e => {
                this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/2/9
         * @function: 更新我收藏的名片
         */
        this.updateMyCollect = (type, collectedUserId) => {
            this.viewRef.showLoading();
            this.props.updateMyCollect({ type, collectedUserId }).then((res) => {
                this.viewRef.hideLoading();
                console.log('更新我收藏的名片', res);
                if (res !== httpurl_1.NetworkState.FAIL) {
                    this.myCollectList();
                    datatool_1.toast('删除成功');
                }
            }).catch(e => {
                this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        console.log(this.viewRef);
        this.pageNo = 1;
        this.pageSize = 10;
        this.state = {
            currentIndex: parseInt(this.$router.params.currentIndex),
            collectSubCurrentIndex: 0,
            visitorSubCurrentIndex: 0,
            showOperate: false,
            showDeleteNotice: false,
            collectUserList: [],
            recordList: [],
            total: 0,
            shaiXuanMode: '最后访问时间',
            shaiXuanValue: '全部',
            showMode: false,
            showShaiXuan: false,
            startTime: '',
            endTime: '',
            shaiXuanTimes: 0
        };
    }
    componentDidShow() {
        this.myCollectList();
        this.refresh();
    }
    render() {
        let { currentIndex, collectSubCurrentIndex, visitorSubCurrentIndex, showOperate, showDeleteNotice, collectUserList, recordList, total, shaiXuanMode, showMode, showShaiXuan } = this.state;
        console.log('shaiXuanMode', shaiXuanMode);
        let childView;
        if (currentIndex === 1) {
            childView = <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc, style_1.default.udr, style_1.mt(10), style_1.mb(20)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.bgColor(collectSubCurrentIndex === 0 ? '#E2BB7B' : style_1.commonStyles.pageDefaultBackgroundColor), style_1.radiusA(2)])} onClick={() => {
                this.setState({ collectSubCurrentIndex: 0 }, () => {
                    this.myCollectList();
                });
            }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.mt(2), style_1.mb(2), style_1.ml(8), style_1.mr(8), style_1.color(collectSubCurrentIndex === 0 ? style_1.commonStyles.whiteColor : '#343434')])}>谁收藏了我</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.bgColor(collectSubCurrentIndex === 1 ? '#E2BB7B' : style_1.commonStyles.pageDefaultBackgroundColor), style_1.radiusA(2), style_1.ml(63)])} onClick={() => {
                this.setState({ collectSubCurrentIndex: 1 }, () => {
                    this.myCollectList();
                });
            }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.mt(2), style_1.mb(2), style_1.ml(8), style_1.mr(8), style_1.color(collectSubCurrentIndex === 1 ? style_1.commonStyles.whiteColor : '#343434')])}>我收藏了谁</components_1.Text>
            </components_1.View>
          </components_1.View>
        </components_1.View>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          {collectUserList.length === 0 &&
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.mt(100)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(78), style_1.h(69)])} src={require('../../assets/ico_no_data.png')}/>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#343434'), style_1.mt(31)])}>当前暂无数据</components_1.Text>
            </components_1.View>}
          {collectUserList.map((value, index) => {
                console.log(value);
                return (<collect_item_1.default key={index} operate={(item) => {
                    this.collectItemModel = item;
                    this.setState({ showOperate: true });
                }} item={value}/>);
            })}
        </components_1.ScrollView>
      </components_1.View>;
        }
        else {
            childView = <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc, style_1.default.udr, style_1.mt(10)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.bgColor(visitorSubCurrentIndex === 0 ? '#E2BB7B' : style_1.commonStyles.pageDefaultBackgroundColor), style_1.radiusA(2)])} onClick={() => {
                this.setState({ visitorSubCurrentIndex: 0 }, () => {
                    this.refresh();
                });
            }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.mt(2), style_1.mb(2), style_1.ml(8), style_1.mr(8), style_1.color(visitorSubCurrentIndex === 0 ? style_1.commonStyles.whiteColor : '#343434')])}>谁访问了我</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.bgColor(visitorSubCurrentIndex === 1 ? '#E2BB7B' : style_1.commonStyles.pageDefaultBackgroundColor), style_1.radiusA(2), style_1.ml(63)])} onClick={() => {
                this.setState({ visitorSubCurrentIndex: 1 }, () => {
                    this.refresh();
                });
            }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.mt(2), style_1.mb(2), style_1.ml(8), style_1.mr(8), style_1.color(visitorSubCurrentIndex === 1 ? style_1.commonStyles.whiteColor : '#343434')])}>我访问了谁</components_1.Text>
            </components_1.View>
          </components_1.View>
        </components_1.View>
        
        {visitorSubCurrentIndex === 0 && <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(36), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.udr, style_1.default.uac, style_1.default.ujb,
                style_1.pl(20), style_1.pr(20), style_1.mt(10), style_1.mb(20)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#727272'), style_1.fSize(14)])}>{`共${total}位访客`}</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])} onClick={() => {
                this.setState({ showMode: true });
            }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#727272'), style_1.fSize(14)])}>{shaiXuanMode}</components_1.Text>
                <sanjiao_1.default orientation={global_1.Orientation.down} style={datatool_1.styleAssign([style_1.ml(3)])}/>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(24)])} onClick={() => {
                this.setState({ showShaiXuan: true });
            }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#727272'), style_1.fSize(14)])}>筛选</components_1.Text>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(14), style_1.h(14), style_1.ml(3)])} src={require('../../assets/ico_shaixuan.png')}/>
              </components_1.View>
            </components_1.View>
          </components_1.View>}
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY onScrollToUpper={() => {
                this.refresh();
            }} onScrollToLower={() => {
                this.loadMore();
            }}>
          {recordList.length === 0 &&
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.mt(100)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(78), style_1.h(69)])} src={require('../../assets/ico_no_data.png')}/>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#343434'), style_1.mt(31)])}>当前暂无数据</components_1.Text>
            </components_1.View>}
          {recordList.length !== 0 && recordList.map((value, index) => {
                console.log(value);
                return (<visitor_item_1.default key={index} item={value}/>);
            })}
        </components_1.ScrollView>
      </components_1.View>;
        }
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          <navigation_bar_1.default style={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.ml(20)])} src={require('../../assets/ico_back.png')} onClick={() => {
            taro_1.default.navigateBack();
        }}/>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])} onClick={() => {
            this.setState({ currentIndex: 0 }, () => {
                this.refresh();
            });
        }}>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color(currentIndex === 0 ? '#E2BB7B' : '#0C0C0C')])}>访客</components_1.Text>
                    <components_1.View style={datatool_1.styleAssign([style_1.w(36), style_1.h(2), style_1.bgColor(currentIndex === 0 ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(10)])}/>
                  </components_1.View>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(24)])} onClick={() => {
            this.setState({ currentIndex: 1 });
        }}>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color(currentIndex === 1 ? '#E2BB7B' : '#0C0C0C')])}>收藏</components_1.Text>
                    <components_1.View style={datatool_1.styleAssign([style_1.w(36), style_1.h(2), style_1.bgColor(currentIndex === 1 ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(10)])}/>
                  </components_1.View>
                </components_1.View>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.mr(20)])}/>
            </components_1.View>
          </navigation_bar_1.default>
          {childView}
        </components_1.View>
        {showOperate && <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), { position: 'fixed' }, style_1.absT(0)])} onClick={() => {
            this.setState({ showOperate: false, showDeleteNotice: true });
        }}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.op(0.3), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.bgColor(style_1.commonStyles.colorTheme)])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(120), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusTL(10), style_1.radiusTR(10),
            style_1.default.upa, style_1.absB(0)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(61), style_1.default.uac, style_1.default.ujc])} onClick={() => {
            this.setState({ showOperate: false, showDeleteNotice: true });
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#29292E'), style_1.fSize(18)])}>移除名片</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(5), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(61), style_1.default.uac, style_1.default.ujc])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#29292E'), style_1.fSize(18)])}>取消</components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>}

        {showDeleteNotice && <businesscard_remove_notice_1.default cancelCallback={() => {
            this.setState({ showDeleteNotice: false });
        }} confirmCallback={() => {
            this.setState({ showDeleteNotice: false }, () => {
                this.updateMyCollect(0, this.collectItemModel.userId);
            });
        }}/>}
        {showMode && <mode_modal_1.default totalPerson={total} shaiXuanMode={shaiXuanMode} shaiXuanCallback={() => {
            this.setState({ showMode: false, showShaiXuan: true });
        }} cancelCallback={() => {
            this.setState({ showMode: false });
        }} confirmCallback={(data) => {
            this.setState({ showMode: false, shaiXuanMode: data, });
        }} collectCallback={() => {
            this.setState({ showMode: false, currentIndex: 1 }, () => {
                this.myCollectList();
            });
        }} myVisitorCallback={() => {
            this.setState({ showMode: false, visitorSubCurrentIndex: 1 }, () => {
                this.getVisitorList();
            });
        }}/>}
        {showShaiXuan && <shai_xuan_modal_1.default totalPerson={total} shaiXuanMode={shaiXuanMode} shaiXuanTimesCallback={(times) => {
            console.log('筛选次数', times);
            this.setState({ shaiXuanTimes: times, startTime: '', endTime: '', showShaiXuan: false }, () => {
                this.refresh();
            });
        }} startAndEndTimeCallback={(startTime, endTime) => {
            this.setState({ startTime, endTime, shaiXuanTimes: 0, showShaiXuan: false }, () => {
                this.refresh();
            });
        }} modeCallback={() => {
            this.setState({ showShaiXuan: false, showMode: true });
        }} cancelCallback={() => {
            this.setState({ showShaiXuan: false });
        }} collectCallback={() => {
            this.setState({ showShaiXuan: false, currentIndex: 1 }, () => {
                this.myCollectList();
            });
        }} myVisitorCallback={() => {
            this.setState({ showShaiXuan: false, visitorSubCurrentIndex: 1 }, () => {
                this.getVisitorList();
            });
        }}/>}

      </safe_area_view_1.default>);
    }
};
MyCollect = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions, visitorActions))
], MyCollect);
exports.default = MyCollect;
//# sourceMappingURL=my_collect.jsx.map