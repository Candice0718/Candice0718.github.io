$(function () {
  var httpUrl = 'http://pp.iqianba.cn';
  var selectedId = '';
  var selectedName = '';

  /**
   * [返回]
   */
  historyBack = function() {
    window.history.back();
  };

  // 获取商城列表
  function getShopList() {
    $.post(
      {
        url: httpUrl + "/O2OWap/QueryMallList",
        type: 'POST'
      }, function(res) {
        var src = "";
        for (var i = 0; i < res.length; i++) {
          src += "<div class='shop_list_item' id='"+res[i].Code+"_"+res[i].Name+"_"+res[i].Id + "_shop_list_item'>";
          if(res[i].Code === 'Tmall') {
            src += "<div class='shop_list_item_logo'> <img src='./images/tianmao.png' /></div>";
          } else if(res[i].Code === 'GM'){
            src += "<div class='shop_list_item_logo'> <img src='./images/guomei.png' /></div>";
          } else if(res[i].Code === 'HW') {
            src += "<div class='shop_list_item_logo'> <img src='./images/huawei.png' /></div>";
          } else if(res[i].Code === 'Sun') {
            src += "<div class='shop_list_item_logo'> <img src='./images/sunning.png' /></div>";
          }

          src += "<div class='shop_list_item_name'>"+res[i].Name+"</div>";
          src += "</div>";
        }

        $('#shop_list').html(src);
      });
  };
  // 获取商城列表
  getShopList();

  /**
   * [选择商店]
   * @return {[type]} [description]
   */
  selectedShop = function(shop) {
    console.log(shop);
  };


  //进入商城
  $(document).on("click",".shop_list_item",function(e){
    var code = e.currentTarget.id.split('_')[0];
    var name = e.currentTarget.id.split('_')[1];
    var id = e.currentTarget.id.split('_')[2];
    $('.o2o_modal').css("display", "flex");
    $('#header').text(name);
    selectedName = name;
    selectedId = id;
  });

  /**
   * [商城登录]
   * @return {[type]} [description]
   */
  login = function() {
    var name = $('#name').val();
    var password = $('#password').val();
    console.log('name: ' + name);
    console.log('password: ' + password);
    window.location.href = './shop.html?name=' + selectedName + '&id=' + selectedId;
  };

  /**
   * [关闭模态框]
   * @return {[type]} [description]
   */
  closeModal = function() {
    $('.o2o_modal').css("display", "none");
    $('#name').val('');
    $('#password').val('');
    selectedName = '';
    selectedId = '';
  };
});
