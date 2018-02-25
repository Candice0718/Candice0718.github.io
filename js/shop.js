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
    var res = [
      {"Id":1,"Code":"0-1999","Name":"0-1999区间","FromPrice":0,"ToPrice":1999},
      {"Id":3,"Code":"2000-4999","Name":"2000-4999区间","FromPrice":2000,"ToPrice":4999},
      {"Id":4,"Code":"5000-9999","Name":"5000-9999区间","FromPrice":5000,"ToPrice":9999},
      {"Id":5,"Code":"10000-99999","Name":"10000-99999区间","FromPrice":10000,"ToPrice":99999}
    ];
    var str = "";
    for (var i = 0; i < res.length; i++) {
      str += '<div class="price_item" id="'+res[i].Id+'_'+res[i].Code+'_price_item"> '+res[i].Code+'</div>'
    };
    $('.price_list').html(str);
    // 默认第一个价格选中
    if (res && res.length > 0) {
      $('#'+res[0].Id+ '_' + res[0].Code + '_price_item').addClass('price_active');
    }
    $('#header-title').text(res[0].Code);
    pdtList(id, res[0].Id);
    // $.post(
    //   {
    //     url: httpUrl + "/O2OWap/QueryPriceGrouplist",
    //     data: {'MallId': id},
    //     type: 'POST'
    //   }, function(res) {
    //     var str = "";
    //     for (var i = 0; i < res.length; i++) {
    //       str += '<div class="price_item" id="'+res[i].Id+'_'+res[i].Code+'_price_item"> '+res[i].Code+'</div>'
    //     };
    //     $('.price_list').html(str);
    //     // 默认第一个价格选中
    //     if (res && res.length > 0) {
    //       $('#'+res[0].Id+ '_' + res[0].Code + '_price_item').addClass('price_active');
    //     }
    //     $('#header-title').text(res[0].Code);
    //     pdtList(id, res[0].Id);
    //   });
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
    var res = [
      {"CreateDateTimeStr":null,"CreateDateTime":"\/Date(-62135596800000)\/","ModifyDateTimeStr":null,"ModifyDateTime":"\/Date(-62135596800000)\/","Id":8,"Name":"HUAWEI MateBook X 13英寸轻薄笔记本电脑","MallId":3,"RealAddress":"https://hwid1.vmall.com/CAS/mobile/standard/wapLogin.html?service=https%3A%2F%2Fm.vmall.com%2Faccount%2Fcaslogin%3Furl%3D%252Fproduct%252F21046116.html%2523648692702\u0026loginChannel=26000002\u0026reqClientType=26\u0026lang=zh-cn","ImgUrl":"https://res.vmallres.com/pimages//product/6901443211388/800_800_1513571794593mp.jpg","Amount":5988,"Qty":1,"O2ORuleId":7,"RecordStatus":0,"PriceGroupId":4,"ModifyUser":null},
      {"CreateDateTimeStr":null,"CreateDateTime":"\/Date(-62135596800000)\/","ModifyDateTimeStr":null,"ModifyDateTime":"\/Date(-62135596800000)\/","Id":9,"Name":"HUAWEI Mate 10 Pro 6GB+128GB","MallId":3,"RealAddress":"https://hwid1.vmall.com/CAS/mobile/standard/wapLogin.html?service=https%3A%2F%2Fm.vmall.com%2Faccount%2Fcaslogin%3Furl%3D%252Fproduct%252F357339492.html%2523209635140\u0026loginChannel=26000002\u0026reqClientType=26\u0026lang=zh-cn","ImgUrl":"https://res.vmallres.com/pimages//product/GB1603020018501//428_428_1497323467743mp.jpg","Amount":8999,"Qty":1,"O2ORuleId":7,"RecordStatus":0,"PriceGroupId":4,"ModifyUser":null},
      {"CreateDateTimeStr":null,"CreateDateTime":"\/Date(-62135596800000)\/","ModifyDateTimeStr":null,"ModifyDateTime":"\/Date(-62135596800000)\/","Id":10,"Name":"HUAWEI Mate 10 6GB+128GB","MallId":3,"RealAddress":"https://hwid1.vmall.com/CAS/mobile/standard/wapLogin.html?service=https%3A%2F%2Fm.vmall.com%2Faccount%2Fcaslogin%3Furl%3D%252Fproduct%252F396602535.html%2523910851458\u0026loginChannel=26000002\u0026reqClientType=26\u0026lang=zh-cn","ImgUrl":"https://res.vmallres.com/pimages//product/6901443202003/55_55_1507866825175mp.jpg","Amount":4499,"Qty":1,"O2ORuleId":7,"RecordStatus":0,"PriceGroupId":3,"ModifyUser":null},
      {"CreateDateTimeStr":null,"CreateDateTime":"\/Date(-62135596800000)\/","ModifyDateTimeStr":null,"ModifyDateTime":"\/Date(-62135596800000)\/","Id":11,"Name":"【享6期免息】Xiaomi/小米 小米手机Max2 4GB+32GB 金色 移动联通电信4G手机","MallId":4,"RealAddress":"https://passport.suning.com/ids/login?loginTheme=wap_new\u0026service=https%3A%2F%2Faq.suning.com%2Fasc%2Fauth%3FtargetUrl%3Dhttps%253A%252F%252Fshopping.suning.com%252Fwapv2%252FnowBuy%252FquickBuy.do%253Fsignkey%253D7db66e8213634dd1bac5fc90f48bb196%2526pagesrc%253Dhttps%25253A%25252F%25252Fm.suning.com%25252Fproduct%25252F0000000000%25252F626377285.html","ImgUrl":"http://image1.suning.cn/uimg/b2c/newcatentries/0000000000-000000000626377285_1_800x800.jpg?ver=2038","Amount":1399,"Qty":1,"O2ORuleId":6,"RecordStatus":0,"PriceGroupId":1,"ModifyUser":null},
      {"CreateDateTimeStr":null,"CreateDateTime":"\/Date(-62135596800000)\/","ModifyDateTimeStr":null,"ModifyDateTime":"\/Date(-62135596800000)\/","Id":12,"Name":"Apple iPhone X 256GB 深空灰 移动联通电信4G手机","MallId":4,"RealAddress":"https://passport.suning.com/ids/login?loginTheme=wap_new\u0026service=https%3A%2F%2Faq.suning.com%2Fasc%2Fauth%3FtargetUrl%3Dhttps%253A%252F%252Fshopping.suning.com%252Fwapv2%252FnowBuy%252FquickBuy.do%253Fsignkey%253Dbc5fef13289c4bd684598a8bed2418f9%2526pagesrc%253Dhttps%25253A%25252F%25252Fm.suning.com%25252Fproduct%25252F0000000000%25252F690128156.html","ImgUrl":"http://image1.suning.cn/uimg/b2c/newcatentries/0000000000-000000000690128156_1_800x800.jpg?ver=2022","Amount":9688,"Qty":1,"O2ORuleId":6,"RecordStatus":0,"PriceGroupId":4,"ModifyUser":null},
      {"CreateDateTimeStr":null,"CreateDateTime":"\/Date(-62135596800000)\/","ModifyDateTimeStr":null,"ModifyDateTime":"\/Date(-62135596800000)\/","Id":13,"Name":"testTmall","MallId":1,"RealAddress":"1","ImgUrl":"2","Amount":1000,"Qty":1,"O2ORuleId":1,"RecordStatus":0,"PriceGroupId":1,"ModifyUser":null},{"CreateDateTimeStr":null,"CreateDateTime":"\/Date(-62135596800000)\/","ModifyDateTimeStr":null,"ModifyDateTime":"\/Date(-62135596800000)\/","Id":14,"Name":"GM Test","MallId":2,"RealAddress":"1","ImgUrl":"1","Amount":20000,"Qty":1,"O2ORuleId":5,"RecordStatus":0,"PriceGroupId":5,"ModifyUser":null}];
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
        itemStr += '</div></div>';
      }
      $('.pdt_list_content').html(itemStr);
    // $.post(
    //   {
    //     url: httpUrl + "/O2OWap/QueryItemList",
    //     data: {
    //       'MallId': 0,
    //       'PGId': 0
    //     },
    //     type: 'POST'
    //   }, function(res) {
    //     pdts = res;
    //     var itemStr = '';
    //     for(var p = 0; p < res.length; p++) {
    //       itemStr += '<div id="'+p+'_content_item" class="pdt_list_content_item">';
    //       itemStr += '<img width="175" height="175" src="'+res[p].ImgUrl+'"></img>';
    //       itemStr += '<div class="pdt-price"><span class="price_symbal">￥</span><span class="price">'+res[p].Amount+'</span></div>';
    //       itemStr += ' <div class="pdt-label">'+res[p].Name+'</div>';
    //       itemStr += '<div class="pdt-tag">';
    //           // <div class="pdt-tag-label">直降</div>
    //           // <div class="pdt-tag-label">包邮</div>
    //       itemStr += '</div></div>';
    //     }
    //     $('.pdt_list_content').html(itemStr);
    //   });
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
