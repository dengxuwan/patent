template.defaults.imports.dateFormat = function(date) {
	return getTimeStr(date);
};

var centerObject = {};
var curWallet;

function getWallectInfo() {

	window.postMessage({
		"target": "contentscript",
		"data": {},
		"method": "getAccount",
	}, "*");
	window.addEventListener('message', function(e) {
		if (e.data && e.data.data && e.data.data.account) {
			if (e.data.data.account) {
				curWallet = e.data.data.account;
				queryCenterInfo();
			}
		}
	});
}

function queryCenterInfo() {
	//获取个人信息列表;
	query(curWallet, config.personal, "", function(resp) {
		console.log(resp, "获取个人信息返回数据");
		centerObject = JSON.parse(resp.result);
		console.log(centerObject, "获取个人信息返回数据");
		var respData = {}
		respData.patents = centerObject.patentInfos;
		var html = template('patentScript', respData);
		document.getElementById('patentBody').innerHTML = html;

		respData.commentList = centerObject.comments;
		html = template('commentScript', respData);
		document.getElementById('commentBody').innerHTML = html;

		respData.goods = centerObject.goods;
		html = template('goodsScript', respData);
		document.getElementById('goodsBody').innerHTML = html;

		$(".loading").hide();
	});
}

function toSearch() {
	var keyword = $("#keyword").val();
	window.location.href = "list.html?keyword=" + keyword;
}