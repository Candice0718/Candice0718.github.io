$(function () {
  var httpUrl = 'http://pp.iqianba.cn';
  /**
   * [返回订单查询页]
   * @return {[type]} [description]
   */
  historyBack = function() {
    window.history.back();
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
});
