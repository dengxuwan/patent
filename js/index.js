function queryindex() {
    var address = "";
    if (!curWallet || curWallet === '') {
        address = config.myAddress;
    } else {
        address = curWallet;
    }
    var args = [true];
    query(address, config.getIndexData, JSON.stringify(args), function(resp) {
        console.log(resp, "查询主页");
        var respArr = JSON.parse(resp.result)
        console.log(respArr, "查询主页");
        initIndex(respArr.data);
        initBaseData(respArr);
        $(".loading").hide()
    });
}
//初始化主页
function initIndex(obj) {
    var respData = {};
    respData.list = obj;
    var html = template('dataScript', respData);
    document.getElementById('dataUl').innerHTML = html;
}

var curWallet;

$(function() {
    // $(".loading").show();
    queryindex();
})

function toSearch() {
    var keyword = $("#keyword").val();
    window.location.href = "list.html?keyword=" + keyword;
}