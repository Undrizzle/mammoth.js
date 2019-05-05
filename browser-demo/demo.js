(function() {
    document.getElementById("document")
        .addEventListener("change", handleFileSelect, false);
        
    function handleFileSelect(event) {
        var options = {
            styleMap: [
                "p[style-name='Title"
                "p[style-name='Image'] => div.center > img:fresh",
                "table => div.tbl > table:fresh"
            ]
        };

        readFileInputEventAsArrayBuffer(event, function(arrayBuffer) {
            mammoth.convertToHtml({arrayBuffer: arrayBuffer}, options)
                .then(displayResult)
                .done();
        });
    }
    
    function displayResult(result) {
        document.getElementById("output").innerHTML = result.value;
        
        var messageHtml = result.messages.map(function(message) {
            return '<li class="' + message.type + '">' + escapeHtml(message.message) + "</li>";
        }).join("");
        
        document.getElementById("messages").innerHTML = "<ul>" + messageHtml + "</ul>";
    }
    
    function readFileInputEventAsArrayBuffer(event, callback) {
        var file = event.target.files[0];

        var reader = new FileReader();
        
        reader.onload = function(loadEvent) {
            var arrayBuffer = loadEvent.target.result;
            callback(arrayBuffer);
        };
        
        reader.readAsArrayBuffer(file);
    }

    function escapeHtml(value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
})();
