$(function () {
  var httpUrl = 'http://pp.iqianba.cn';
  var shopName = ''; //商城名称
  var shopId = ''; // 商城价格
  var pdts = [];
  var pdtIdx = 0; // 选中的商品Idx
  /**
   * [返回]
   */
  historyBack = function() {
    window.history.back();
  };

  function GetRequest(key) {
    // 获取参数
     var url = window.location.search;
     // 正则筛选地址栏
     var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
     // 匹配目标参数
     var result = url.substr(1).match(reg);
     //返回参数值
     return result ? decodeURIComponent(result[2]) : null;
  };
  // 获取价格列表
  function getPriceList(id) {
    $.post(
      {
        url: httpUrl + "/O2OWap/QueryPriceGrouplist",
        data: {'MallId': id},
        type: 'POST'
      }, function(res) {
        var str = "";
        for (var i = 0; i < res.length; i++) {
          str += '<div class="price_item" id="'+res[i].Id+'_'+res[i].Code+'_price_item"> '+res[i].Code+'</div>'
        };
        $('.price_list').html(str);
        // 默认第一个价格选中
        if (res && res.length > 0) {
          console.log(res.length);
          $('#'+res[0].Id+ '_' + res[0].Code + '_price_item').addClass('price_active');
        }
        $('#header-title').text(res[0].Code);
        pdtList(id, res[0].Id);
      });
  };

  // 获取商品列表
  /**
   * [pdtList 获取商品列表]
   * @param  {[type]} MallId [商城Id]
   * @param  {[type]} PGId   [价格Id]
   * @return {[type]}        [description]
   */
  function pdtList(MallId, PGId) {
    $('.pdt_list_content').empty();
    $.post(
      {
        url: httpUrl + "/O2OWap/QueryItemList",
        data: {
          'MallId': 0,
          'PGId': 0
        },
        type: 'POST'
      }, function(res) {
        pdts = res;
        var itemStr = '';
        for(var p = 0; p < res.length; p++) {
          itemStr += '<div id="'+p+'_content_item" class="pdt_list_content_item">';
          itemStr += '<img width="175" height="175" src="'+res[p].ImgUrl+'"></img>';
          itemStr += '<div class="pdt-price"><span class="price_symbal">￥</span><span class="price">'+res[p].Amount+'</span></div>';
          itemStr += ' <div class="pdt-label">'+res[p].Name+'</div>';
          itemStr += '<div class="pdt-tag">';
              // <div class="pdt-tag-label">直降</div>
              // <div class="pdt-tag-label">包邮</div>
          itemStr += '</div></div>'
        }
        $('.pdt_list_content').html(itemStr);
      });
  };

  // 获取商城数据
  function getShopData() {
    shopName = GetRequest('name');
    shopId = GetRequest('id');
    $('.header_title > span').text(shopName);
    // 获取价格列表
    getPriceList(shopId);
  };
  getShopData();


  //选择价格
  $(document).on("click",".price_item",function(e){
    $('.price_item').removeClass('price_active');
    var id = e.currentTarget.id.split('_')[0];
    var code = e.currentTarget.id.split('_')[1];
    $('#' + id + '_'+ code + '_price_item').addClass('price_active');
    $('#header-title').text(code);
    pdtList(id, code)
  });

  // 点击商品
  $(document).on("click", ".pdt_list_content_item", function(e) {
    var idx = e.currentTarget.id.split('_')[0];
    pdtIdx = idx;
    $('.o2o_modal').css("display", "flex");
    var modalPdt = '';
    modalPdt += '<div class="pdt_list_modal_item">';
    modalPdt += '<img width="175" height="175" src="'+pdts[idx].ImgUrl+'"></img>';
    modalPdt += '<div class="pdt-price"><span class="price_symbal">￥</span><span class="price">'+pdts[idx].Amount+'</span></div>';
    modalPdt += ' <div class="pdt-label">'+pdts[idx].Name+'</div>';
    modalPdt += '<div class="pdt-tag">';
        // <div class="pdt-tag-label">直降</div>
        // <div class="pdt-tag-label">包邮</div>
    modalPdt += '</div></div>';
    $('.o2o_modal_content_container').html(modalPdt);
  });

  confirm = function() {
    window.location.href = './confirm.html';
  }

  /**
   * [关闭模态框]
   * @return {[type]} [description]
   */
  closeModal = function() {
    $('.o2o_modal').css("display", "none");
  };

  // 阻止时间冒泡
  cancelBubble = function(e) {
    e.stopPropagation();
    e.preventDefault();
  }
});
