function initBaseData(base) {
	if (!base.seeCount) {
		base.seeCount = 10;
	}
	$("#patentCount").html(base.totalCount + "次");
	$("#seeCount").html(base.seeCount + "次");
}