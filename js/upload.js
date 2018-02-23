$(function () {
  var httpUrl = 'http://pp.iqianba.cn';
  /**
   * [删除已经上传的图片]
   * @return {[type]} [description]
   */
  deleteImage = function() {
    console.log('delete image...');
  };
  /**
   * [按钮模拟图片上传input]
   * @return {[type]} [description]
   */
  fileSelect = function() {
    $('#fileToUpload').click();
  };
  /**
   * [选择上传的图片信息]
   * @param  {[type]} e [上传的图片信息]
   * @return {[type]}   [description]
   */
  fileSelected = function(e) {
    console.log(e);
  };
  /**
   * [提交]
   * @return {[type]} [description]
   */
  sumbit = function() {
    console.log('sumbit..');
  };
  /**
   * [返回订单查询页]
   * @return {[type]} [description]
   */
  historyBack = function() {
    window.history.back();
  };
});
