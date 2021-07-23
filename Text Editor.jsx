var panelGlobal = this;
var palette = (function () {

    var keyName = app.project.file ? app.project.file.displayName.split(".aep")[0] : null;
    var sectionName = "TextEditor"

    var dialog = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette", "Text Editor", undefined, { resizeable: true });

    var edittext = dialog.add('edittext {properties: {name: "edittext", multiline: true, scrollable: true, borderless: true}}');
    edittext.alignment = ["fill", "fill"];
    edittext.preferredSize = [300,300];
    edittext.minimumSize = [70, 25];
    edittext.text = loadText();

    edittext.onChange = function(){saveText(this.text)}

    dialog.layout.layout(true);
    dialog.layout.resize();
    dialog.onResizing = dialog.onResize = function () { this.layout.resize(); }

    if (dialog instanceof Window) dialog.show();

    dialog.addEventListener("focus", function(){edittext.text = loadText()});

    function saveText(text) {
        var keyName = app.project.file ? app.project.file.displayName.split(".aep")[0] : null;
        app.settings.saveSetting(sectionName, keyName, text);
    }

    function loadText(){
        var keyName = app.project.file ? app.project.file.displayName.split(".aep")[0] : null;
        if (app.settings.haveSetting(sectionName, keyName)) {
            var text = app.settings.getSetting(sectionName, keyName);
        } else var text = '';
        return text;
    }

    return palette;

}());