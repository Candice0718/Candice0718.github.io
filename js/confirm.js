$(function () {
  var httpUrl = 'http://pp.iqianba.cn';
  var noticeList = [];
  /**
   * [返回]
   */
  historyBack = function() {
    window.history.back();
  };
  /**
   * [获取notice列表]
   * @return {[type]} [description]
   */
  getNoticeList = function() {
    noticeList = [
      '1.请按照一下地址收货，未收到货的将不予回款。请修改收款地址 上海市徐汇区肇嘉浜路169号飞雕大厦9楼',
      '2.请按照一下地址收货，未收到货的将不予回款。请修改收款地址 上海市徐汇区肇嘉浜路169号飞雕大厦9楼',
      '3.请按照一下地址收货，未收到货的将不予回款。请修改收款地址 上海市徐汇区肇嘉浜路169号飞雕大厦9楼',
      '4.请按照一下地址收货，未收到货的将不予回款。请修改收款地址 上海市徐汇区肇嘉浜路169号飞雕大厦9楼'
    ];
    var str = '';
    for (var i = 0; i < noticeList.length; i++) {
      str += '<div class="o2o_notice" id="o2o_notice_'+i+'">';
      str += '<div class="o2o_notice_title">'+noticeList[i]+'</div>';
      str += '<div class="o2o_notice_btn"><button class="btn btn-success" id="'+i+'_o2o_notice_btn">我知道了</button></div>';
      str += '<div class="gap_border"></div>';
      str += '</div>';
    }
    $('.o2o_notice_list').html(str);
  };
  getNoticeList();
  /**
   * [一步一步的我知道了]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  $('.o2o_notice_btn > button').click(function(e) {
    var idx = e.currentTarget.id.split('_')[0];
    var next = Number(idx) + 1;
    if (next >= noticeList.length) {
      $('.confirm_btn > button').css('backgroundColor', '#ff4b59');
      $('.confirm_btn > button').attr('disabled', false);
    } else {
      $("#o2o_notice_" + next).slideDown("slow");
    }
  });

  order = function() {
    alert('前往购物');
  };
});
