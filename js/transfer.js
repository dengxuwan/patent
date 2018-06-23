$(function() {
    getAll();
    $(".loading").show();
});

function getAll() {
    //获取专利列表
    query(config.myAddress, config.getTransferList, "", function(resp) {
        console.log(resp, "智能合约获取专利转让列表");
        var respArr = JSON.parse(resp.result)
        console.log(respArr, "智能合约获取转让列表");
        initBaseData(respArr.base);
        initListData(respArr.list);
        $(".loading").hide()
    });
};

//初始化列表
function initListData(list) {
    var respData = {};
    respData.list = list
    var html = template('listScript', respData);
    document.getElementById('listDiv').innerHTML = html;
}


function toSearch() {
    var keyword = $("#keyword").val();
    window.location.href = "list.html?keyword=" + keyword;
}


template.defaults.imports.dateFormat = function(date) {
    return getTimeStr(date);
};

function toDetail(patentId) {
    window.open("./detail.html?patentId=" + patentId);
}