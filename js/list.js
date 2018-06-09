$(function() {
    getWallectInfo();
    $(".loading").show();
});

function getAll(address) {
    if (address || address === '') {
        address = config.myAddress;
    }
    //获取专利列表
    query(address, config.getAll, "", function(resp) {
        console.log(resp, "智能合约获取专利列表");
        var respArr = JSON.parse(resp.result)
        console.log(respArr, "智能合约获取专利列表");
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
    document.getElementById('pros').innerHTML = html;
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
                //获取搜索参数
                var keyword = getQueryString('keyword');
                if (!keyword || keyword === '') {
                    getAll(curWallet);
                } else {
                    //说明是搜索
                    $("#keyword").val(keyword);
                    toSearch();
                }
            }
        }
    });
}

function toSearch() {
    $(".loading").show();
    var keyword = $("#keyword").val();
    search(curWallet, keyword);
}

function search(address, keyword) {
    if (!address || address === '') {
        address = config.myAddress;
    }
    var args = [keyword];
    //获取专利列表
    query(address, config.search, JSON.stringify(args), function(resp) {
        console.log(resp, "查询列表");
        var respArr = JSON.parse(resp.result)
        console.log(respArr, "查询列表");
        initBaseData(respArr.base);
        initListData(respArr.list);
        $(".loading").hide()
    });
}