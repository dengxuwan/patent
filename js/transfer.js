$(function() {
    getWallectInfo();
    $(".loading").show();
});

function getAll(address) {
    if (address || address === '') {
        address = config.myAddress;
    }
    //获取专利列表
    query(address, config.getTransferList, "", function(resp) {
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



var curWallet;
//获取钱包地址
function getWallectInfo() {
    window.postMessage({
        "target": "contentscript",
        "data": {},
        "method": "getAccount",
    }, "*");
    window.addEventListener('message', function(e) {
        if (e.data && e.data.data) {
            if (e.data.data.account) {
                curWallet = e.data.data.account;
                getAll(curWallet);
            }
        }
    });
}

function toSearch() {
    var keyword = $("#keyword").val();
    window.location.href = "index.html?keyword=" + keyword;
}


template.defaults.imports.dateFormat = function(date) {
    return getTimeStr(date);
};

function toDetail(patentId){
    window.open("./detail.html?patentId="+patentId); 
}