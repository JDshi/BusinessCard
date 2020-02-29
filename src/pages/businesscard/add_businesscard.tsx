/**
 * @filename add_businesscard.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/15
 * @Description: 添加名片
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {get, parseData, styleAssign, toast} from "../../utils/datatool";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  op,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import {Image, Picker, ScrollView, Switch, Text, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton";
import TouchableButton from "../../compoments/touchable-button";
import ListItem from "../../compoments/list-item";
import {cloudBaseUrl, FileController, NetworkState} from "../../api/httpurl";
import {Enum, User} from "../../const/global";

interface Props {
  userInfo: User;
  //更新用户信息
  update: any;
}

interface State {
  signInPageDetail: any;
  listData: { title: string; subtitle: string; value: string; hasEdit?: boolean; must?: boolean; }[];
  avatar: string;
  showPhone: number;
}

@connect(state => state.login, {...actions})
class AddBusinesscard extends Component<Props, State> {

  private viewRef;


  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    disableScroll: true
  }
  private province;
  private city;
  private avatar;

  constructor(props) {
    super(props);
    let {name, avatar, company, industry, position, province, city, wechat, email, showPhone} = props.userInfo;

    this.avatar = avatar;
    this.province = province;
    this.city = city;
    this.state = {
      showPhone,
      signInPageDetail: {dateIntegrals: [], signInCount: 0},
      listData: [
        {title: '姓名', subtitle: '请输入姓名', value: name, hasEdit: true, must: true},
        {
          title: '公司',
          subtitle: '请输入公司名',
          value: company,
          hasEdit: true,
          must: true
        }, {
          title: '行业',
          subtitle: '请选择行业',
          value: industry,
          must: true
        },
        {title: '职位', subtitle: '请输入职业', value: position, hasEdit: true},
        {title: '地区', subtitle: '请选择地区', value: province + city,},
        {
          title: '微信号',
          subtitle: '请输入微信号',
          value: wechat,
          hasEdit: true
        }, {
          title: '邮箱',
          subtitle: '请输入邮箱',
          value: email,
          hasEdit: true
        }],
      avatar: avatar
    }
  }

  componentDidMount() {
    Taro.eventCenter.on('industry', (industry) => {
      console.log('参数回调', industry);
      this.state.listData[2].value = industry;

      this.setState({listData: this.state.listData});
    })
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/28
   * @function: 更新用户信息
   */
  update = () => {
    let {listData, showPhone} = this.state;

    if (!listData[0].value || listData[0].value.length === 0) {
      toast('请先填写姓名');
      return;
    }
    if (!listData[1].value || listData[1].value.length === 0) {
      toast('请先填写公司');
      return;
    }
    if (!listData[2].value || listData[2].value.length === 0) {
      toast('请先填写行业');
      return;
    }
    this.viewRef && this.viewRef.showLoading();
    this.props.update({
      avatar: this.avatar,
      name: listData[0].value,
      company: listData[1].value,
      industry: listData[2].value,
      position: listData[3].value,
      province: this.province,
      city: this.city,
      wechat: listData[5].value,
      email: listData[6].value,
      showPhone
    }).then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        Taro.eventCenter.trigger('refreshUserInfo');
        toast('名片创建成功');
      }

    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/28
   * @function: 将文件通过微信Api上传到服务端
   */
  uploadFileTpWx = (path) => {
    let that = this;
    let token = get(Enum.TOKEN);

    Taro.uploadFile({
      url: FileController.uploadPicture,
      filePath: path,
      name: 'file',
      header: {
        'token': token
      },
      success(res) {
        that.avatar = parseData(res.data).data;
        console.log('上传文件', parseData(res.data).data);
      }
    });
  }


  render() {
    console.log(this.viewRef);

    let {signInPageDetail} = this.state;

    if (typeof signInPageDetail.signInCount === 'undefined') {
      signInPageDetail.signInCount = 0
    }

    let {listData, avatar, showPhone} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} notNeedBottomPadding={true}>
        <TopHeader title={'创建名片'} backgroundColor={commonStyles.whiteColor}/>
        <ScrollView style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
                    scrollY>
          {/*名片信息头部*/}
          <TouchableButton customStyle={styleAssign([wRatio(100), h(86), styles.uac, styles.udr, styles.ujb,
            bgColor(commonStyles.whiteColor), pl(20), pr(20)])}
                           onClick={() => {
                             Taro.chooseImage({count: 1}).then((res) => {
                               console.log('图片路径', res.tempFiles[0].path)
                               this.setState({avatar: res.tempFiles[0].path})
                               this.uploadFileTpWx(res.tempFiles[0].path);
                             });
                           }}>
            <Text style={styleAssign([fSize(14), color('#727272')])}>头像</Text>
            <Image style={styleAssign([w(60), h(60), radiusA(30)])}
                   src={avatar && avatar.length !== 0 ? avatar : `${cloudBaseUrl}ico_default.png`}/>
          </TouchableButton>
          <View style={styleAssign([wRatio(100), h(10), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          {/*内容编辑*/}
          {
            listData.map((value, index) => {
              if (value.title === '地区') {
                return (<Picker mode='region' onChange={(e) => {
                  console.log(e.detail)
                  this.province = e.detail.value[0];
                  this.city = e.detail.value[1] + e.detail.value[2];
                  this.state.listData[4].value = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
                  this.setState({
                    listData: this.state.listData
                  })
                }} value={[]}>
                  <ListItem title={value.title}
                            must={value.must}
                            subTitle={value.subtitle}
                            value={value.value}
                            key={index}
                            hasEdit={value.hasEdit}/>
                </Picker>);
              }
              return (<ListItem title={value.title}
                                must={value.must}
                                subTitle={value.subtitle}
                                key={index}
                                value={value.value}
                                hasEdit={value.hasEdit}
                                onCLick={(title) => {
                                  if (title === '行业') {
                                    Taro.navigateTo({
                                      url: `/pages/mine/industry_list`
                                    });
                                  }
                                }
                                } onTextChange={(e) => {
                if (value.title === '姓名') {
                  this.state.listData[0].value = e.detail.value;
                  this.setState({listData: this.state.listData});
                } else if (value.title === '公司') {
                  this.state.listData[1].value = e.detail.value;
                  this.setState({listData: this.state.listData});
                } else if (value.title === '行业') {
                  this.state.listData[2].value = e.detail.value;
                  this.setState({listData: this.state.listData});
                } else if (value.title === '职位') {
                  this.state.listData[3].value = e.detail.value;
                  this.setState({listData: this.state.listData});
                } else if (value.title === '微信号') {
                  this.state.listData[5].value = e.detail.value;
                  this.setState({listData: this.state.listData});
                } else if (value.title === '邮箱') {
                  this.state.listData[6].value = e.detail.value;
                  this.setState({listData: this.state.listData});
                }
                console.log(e);
              }
              }/>);
            })
          }
          <View style={styleAssign([wRatio(100), h(10), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          {/*开关*/}
          <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([wRatio(100), h(50), pl(20), pr(20), styles.uac, styles.udr, styles.ujb])}>
              <Text style={styleAssign([fSize(14), color('#343434')])}>分享自己的名片给朋友时展示手机号</Text>
              <Switch color={'#E2BB7B'} checked={showPhone === 1} onChange={(e) => {
                this.setState({showPhone: e.detail.value ? 1 : 0});
              }}/>
            </View>
            <View style={styleAssign([w(336), h(0.5), bgColor('#E5E5E5'), ml(20), op(0.3)])}/>
          </View>
        </ScrollView>
        {/*创建名片*/}
        <BottomButon title={'保存'} onClick={this.update}/>
      </CustomSafeAreaView>);
  }
}

export default AddBusinesscard;
