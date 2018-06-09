function queryInfo(address, patentId) {
    if (!address || address === '') {
        address = config.myAddress;
    }
    var args = [patentId];
    query(address, config.getPatentInfo, JSON.stringify(args), function(resp) {
        console.log(resp, "查询详情");
        var respArr = JSON.parse(resp.result)
        console.log(respArr, "查询详情");
        initBaseData(respArr.base);
        initInfo(respArr.patentInfo);
        initComment(respArr.patentInfo.comments);
        $(".loading").hide()
    });
}
//初始化评论
function initComment(list) {
    var respData = {};
    respData.list = list
    var html = template('commentScript', respData);
    document.getElementById('comments_ul').innerHTML = html;
}

function initInfo(info) {
    $("#no").html(info.no);
    $("#title").html(info.title);
    $("#appDate").html(info.appDate);
    $("#appName").html(info.appName);
    $("#inventName").html(info.inventName);
    $("#appAddress").html(info.appAddress);
    $("#appPhone").html(info.appPhone);
    $("#mainTypeNo").html(info.mainTypeNo);
    $("#typeNo").html(info.typeNo);
    $("#agency").html(info.agency);
    $("#status").html(info.status);
    $("#rawStatus").html(info.rawStatus);
    $("#description").html(info.description);
    $("#shuoming").html(info.shuoming);
    $("#power").html(info.power);
    $("#price").html(info.price);
    $("#pics").html(info.pic);
    $("#author").html(info.author);
    if (info.isTrans) {
        //说明正在转让
        $("#isTrans").html("转让中");
        $("#price").html(info.price + "nas");
    } else {
        $("#price").html("非转让");
    }
}

var serialNumber;
//发表评论
function sendComment() {
    if (curWallet === '') {
        alert("评论段子必须安装星云钱包插件！");
        return;
    }
    var content = $("#commentContent").val();
    if (content === '') {
        alert('必须填写评论内容！');
        return;
    }
    var args = [patentId, content];
    defaultOptions.listener = function(data) {
        $("#commentContent").val('');
        //开启定时任务，获取交易状态
        // intervalQuery = setInterval(function () {
        //           funcIntervalQuery();
        //       }, 6000);
        alert('发表评论成功！写入区块链约15秒!');
    };
    serialNumber = nebPay.call(config.contractAddr, "0", config.comment, JSON.stringify(args), defaultOptions);
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
            }
        }
        queryInfo(curWallet, patentId);
    });
}

var patentId;
(function() {
    $(".loading").show();
    patentId = getQueryString('patentId');
    if (!patentId || patentId === '') {
        alert('参数不正确!');
        return;
    }
    getWallectInfo();



    //点击切换锚点
    function change() {
        var $a = $(".nav_left li a");
        var $span = $(".detail_tittle span");
        var $content = $(".content");
        $a.each(function(index, item) {
            //console.log(index);
            $(item).click(function() {
                $(this).addClass("bg").parent().siblings().children().removeClass("bg");
            })
        });
        $span.click(function() {
            var index = $(this).index();
            $(this).addClass("hover").siblings().removeClass("hover");
            $content.eq(index).show().siblings(".content").hide();

        });
    }
    change();

    //点击返回顶部
    function backTop() {
        $(".patent_backTop").click(function() {
            var $win = $(window);
            var target = $win.scrollTop();
            var duration = 500;
            var interval = 30;
            var step = target / duration * interval;
            var timer = setInterval(function() {
                target -= step;
                if (target <= 0) {
                    clearInterval(timer)
                }
                $win.scrollTop(target);
            }, interval)
        });
    }
    backTop();

    //滚轮触发 锚点定位
    function scroll() {
        var $h2 = $(".content .TIT");
        $(window).scroll(function() {
            var $scroll = $(window).scrollTop();
            $h2.each(function(index, item) {
                var $itemTop = $(item).offset().top;
                var $a = $(".nav_left li a");
                if ($itemTop - $scroll <= 50 && $itemTop - $scroll >= 0) {
                    //alert(1)
                    $a.eq(index).addClass("bg").parent().siblings().children().removeClass("bg");
                }

            })
        })
    }
    scroll();

})();

//锚点定位
function pointFixed(data) {
    if (data.indexOf("-") != -1) {
        data = replaceAll(data, "-", "_5272");
    }
    var urlStr = window.location.href;
    var urls = urlStr.substring(0, urlStr.lastIndexOf("/"));
    window.location.href = urls + "/" + data;
}
var jiathis_config = {
    appkey: {
        /*"tsina":"1464434542",
        "weixin":"wx9d6b03a8272918b9",
        "cqq":"1106191464"*/
    }
};

function toSearch() {
    var keyword = $("#keyword").val();
    window.location.href = "list.html?keyword=" + keyword;
}