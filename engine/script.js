function applyNewInputStyle() {
	$('.type-here.opened').append(
		'<span style="color: '
		+ $('.options .text-color .hash').val()
		+ '; background: '
		+ $('.options .background-color .hash').val()
		+ ';" contenteditable="true"></span>'
	);
	/*
	$("#cursor-here").removeAttr("id");
	$('.type-here span:last-child').attr("id", "cursor-here");
	$("#cursor-here").focus();
	*/
	$(".type-here.opened").focus();
}
function applyNewGlobalStyle() {
	let fontSize = $('.options .font-size input').val();
	$('body').css('font-family', $('.options .font select option:selected').text()).css('font-size', fontSize + 'pt');
	$('.options .font-size .label').html('Font size: ' + fontSize);
}
function updateExample() {
	$('.options .example').css('color', $('.options .text-color .hash').val()).css('background-color', $('.options .background-color .hash').val());
	$('.options .text-color .hash').css('background-color', $('.options .text-color .hash').val());
	$('.options .background-color .hash').css('background-color', $('.options .background-color .hash').val());
}
function switchTab(number) {
	let index;
	if (number == 'last') {
		index = $('.tabs .list .tab').last().index();
	} else {
		index = number;
		}
	let tabSelector = $('.tabs .list .tab').eq(index);
	if (!tabSelector.hasClass('opened')) {
		$('.tabs .list .tab.opened .label').removeAttr('contenteditable').removeAttr('title');
		$('.tabs .list .tab.opened, .windows .type-here.opened').removeClass('opened');
		tabSelector.addClass('opened');
		$('.tabs .list .tab.opened .label').attr('contenteditable', '').attr('title', 'Hey, you can rename this tab!\nJust click on this name of active tab.');
		$('.windows .type-here').eq(index).addClass('opened').focus();
	}
}
function closeTab() {
	let index = $('.tabs .list .tab.opened').index();
	$('.tabs .list .tab.opened, .windows .type-here.opened').remove();
	if ($('.tabs .list .tab').eq(index).length == 0) {
		index--;
	}
	switchTab(index);
	if ($('.tabs .list .tab').length == 0) {
		$('body').addClass('no-tabs-opened');
	}
}
function newTab(title, content) {
	if (title == undefined) {
		title = '';
	}
	if (content == undefined) {
		content = '';
	}
	$('.tabs .list').append('<div class="tab"><span class="label" contenteditable>' + title + '</span><span class="close" title="Close this tab">[X]</span></div>\n');
	$('.windows').append('<div class="type-here" header="' + title + '" contenteditable>' + content + '</div>');
	switchTab('last');
	$('.tabs .list .tab.opened').click(function(){
		switchTab($(this).index());
	});
	$('.tabs .list .tab.opened .close').click(closeTab);
	$(".tabs .list .tab.opened .label").on('input', function(){
		$('.windows .type-here.opened').attr('header', $(this).html());
	});
	$('body.no-tabs-opened').removeClass('no-tabs-opened');
}
function loadWorkspace(data) {
	let activeTab;
	$('.windows, .tabs .list').html('');
	$('.windows').before('<div id="import-temp"></div>');
	$('#import-temp').html(data);
	for (i = 0; i < $('#import-temp .type-here').length; i++) {
		newTab($('#import-temp .type-here').eq(i).attr('header'), $('#import-temp .type-here').eq(i).html());
	}
	activeTab = $('#import-temp .type-here.opened').index();
	$('#import-temp').remove();
	switchTab(activeTab);
	if ($('.tabs .list .tab').length == 0) {
		$('.windows, .tabs .list').html('');
		$('body').addClass('no-tabs-opened');
	}
}


for (let i = 0; i < $(".options .font select option").length; i++) {
	let fontFamily = $(".options .font select option").eq(i).text();
	$(".options .font select option").eq(i).css("font-family", fontFamily);
}
for (let i = 0; i < $(".options .font-size select option").length; i++) {
	let fontSize = $(".options .font-size select option").eq(i).text();
	$(".options .font-size select option").eq(i).css("font-size", fontSize);
}


$('.tabs .plus').click(function(){
	newTab();
});
$(".options .font select").change(applyNewGlobalStyle);
$(".options .font-size input").on('input', applyNewGlobalStyle);


$('.options .background-color .hash, .options .text-color .hash').change(updateExample);
$('.options .apply').click(applyNewInputStyle);
$('.tabs .collection').click(function(){
	$('body').toggleClass('collection-opened');
});
$('.tabs .toleft').click(function(){
	$('body').toggleClass('tabs-to-left');
});


$('#load-file').change(function(){
	$('body').append('<div id="temp"></div>');
	loadFile(this.files, '#temp', 'html', extraFunction);
	function extraFunction() {
		loadWorkspace($('#temp').html());
		$('#temp').remove();
		$('#load-file').val('');
	}
});


$('.options .save-file').click(function(){
	saveFile($('.windows').html(), 'save.txt', 'text/plain');
});


$('.type-here.opened').focus();
updateExample();
newTab('Tab 1', 'Tab 1');
newTab('Tab 2', 'Tab 2');
newTab('Tab 3', 'Tab 3');
newTab('Tab 4', 'Tab 4');
switchTab(0);