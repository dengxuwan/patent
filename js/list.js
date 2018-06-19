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
    $.each(list,function(index,element){
        element['current'] = curWallet;
    })
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

//购买
function toBuy(patentId, amount) {
    if (curWallet === '') {
        alert("您必须安装星云钱包插件！");
        return;
    }
    var args = [patentId];
    defaultOptions.listener = function(data) {
        if (data.txhash) {
            $(".dialog").hide(100);
            if (confirm('购买成功,大约15秒后数据打包写入区块链，请浏览转让记录进行查看')) {
                window.location.href = "transfer.html";
            } else {
                window.location.href = "transfer.html";
            }
        } else {
            alert('购买操作已被取消');
        }

        //开启定时任务，获取交易状态
        // intervalQuery = setInterval(function() {
        //  funcIntervalQuery();
        // }, 6000);

    };
    if(confirm('提示：请先联系作者再进行支付操作！')){
        serialNumber = nebPay.call(config.contractAddr, amount + "", config.transfer, JSON.stringify(args), defaultOptions);
    }
    
}


function openDialog() {
    document.getElementById('light').style.display = 'block';
    document.getElementById('fade').style.display = 'block'
}

function closeDialog() {
    document.getElementById('light').style.display = 'none';
    document.getElementById('fade').style.display = 'none'
}