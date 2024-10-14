function saveFile(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
function loadFile(all_files, printSelector, printAction, callback) {
	function loadFileCallback(cbText, cbPrintSelector, cbPrintAction, cbCallback) {
		if (cbPrintAction == 'val') {
			$(cbPrintSelector).val(cbText);
		} else if (cbPrintAction == 'html') {
			$(cbPrintSelector).html(cbText);
		}
		cbCallback();
	}
	// first file selected by user
	var file = all_files[0];

	// files types allowed
	// we are reading text file in this example
	var allowed_types = [ 'text/plain' ];
	if(allowed_types.indexOf(file.type) == -1) {
		alert('Error : Incorrect file type');
		return;
	}

	// file validation is successful
	// we will now read the file

	var reader = new FileReader();

	// file reading finished successfully
	reader.addEventListener('load', function(e) {
		var text = e.target.result;
		loadFileCallback(text, printSelector, printAction, callback);
	});

	// read as text file
	reader.readAsText(file);
}