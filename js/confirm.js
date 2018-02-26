$(function () {
  var httpUrl = 'http://pp.iqianba.cn';
  /**
   * [返回]
   */
  historyBack = function() {
    window.history.back();
  };

  // v4.判断手机平台 
  function judgePlatform() {
    var platform = navigator.platform;
    if (platform == "iPhone") {
      $('#confirm_iframe').attr("scrolling","no");
    }
  };
  judgePlatform();
});
