/**
 * 定义常量
 * @param
 */
export const ERR_OK = '0';
export const arrIndex = 1; // 列表取数据index
export const userCert = localStorage.getItem('userInfo'); // 接口user信息
export const accessToken = localStorage.getItem('accessInfo'); // 接口accesstoken信息

export const apiUrl = 'http://115.28.203.39:9090/api/'; // 开发版接口地址
export const apiUpload = 'Request/Upload' //上传Excel接口
export const apiMedia = 'Media/Upload' // 上传图片接口
export const imgUrl = 'http://115.28.203.39:9091/' // 图片路径

//export const urlImg = 'http://47.94.103.215:8080/res'; // 开发环境路径
// export const urlImg = 'https://api.ukbg.cn/res'; // 发版用路径
/**
 * 正则校验
 * @param手机号
 */
export function isMobile(value) {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)
}
/**
 * 正则校验
 * @param不为空
 */
export function isNotNull(value) {
  return !(typeof(value) === 'undefined' || value === null || !value.replace(/(^\s*)|(\s*$)/g, '').length);
}
/**
 * 正则校验
 * @param密码6-18位数字字母
 * */
export function isPassword(value) {
  return /^[a-zA-Z0-9]{6,18}$/.test(value)
}
/**
 * 正则校验
 * @param序号1-9数字
 * */
export function isNumber(value) {
  return /^[1-9]\d*$/.test(value)
}
/*
* 正则校验
* 身份证
* */
export function isCertificate(value) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
}
/**
 *正则校验
 * 价格，最多两位小数
 */
export function isPrice(value) {
  return /^(([1-9]{1}\d*)|0)(\.\d{1,2})?$/.test(value);
}

/**
 * 格式化价格
 * @param price 价格
 */
export function priceFormat(price) {
  if(!price){
    return '0.00';
  }else if(Number(price)){
    return parseFloat(price).toFixed(2);
  }
}

/**
 * 字符串截取
 * @param value
 */
export function valueSubstr(value, len) {
  if (value){
    return value.substring(0,value.length-len)
  }
}

/**
 * 查询回车事件
 * @param
 */
export function keyBoardEnter(e, cb) {
  var keyCode = window.event? e.keyCode:e.which;
  if(keyCode == 13 || (e.target&&(e.target.nodeName == 'BUTTON' || e.target.nodeName == 'SPAN'))){
    cb();
  }
}
/**
 * 根据身份证计算年龄
 * @param
 */
export function getAge(identityCard) {
  var len = (identityCard + "").length;
  if (len == 0) {
    return null;
  } else {
    if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
    {
      return null;
    }
  }
  var strBirthday = "";
  if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
  {
    strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
  }
  if (len == 15) {
    strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
  }
  //时间字符串里，必须是“/”
  var birthDate = new Date(strBirthday);
  var nowDateTime = new Date();
  var age = nowDateTime.getFullYear() - birthDate.getFullYear();
  //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
  // if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
  //   age--;
  // }
  return age;
}
/**
 * 根据时间戳转时间
 * @param
 */
export function formatDateTime(inputTime) {
  var date = '';
  if (inputTime){
    date = new Date(inputTime);
  }else {
    date = new Date();
  }
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
};




