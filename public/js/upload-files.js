var combinedFiles = {};
var filesNamesList = [];
var globalIndex = 0;

// shows a list of selected files names
function listOfFilesNames(filesNames) {
  let ul = document.getElementById("files-name");
  let li;
  let index;

  for (index = 0; index < filesNames.length; index++) {
    li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(filesNames[index].name));
    filesNamesList.push(filesNames[index].name);
    ul.appendChild(li);
  }
  console.log(filesNamesList);
}

function handleFileSelect(evt) {
  let files = evt.target.files; // FileList object

  listOfFilesNames(files);

  // use the 1st file from the list
  for (index = 0; index < files.length; index++) {
    let f = files[index];

    let reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function (theFile) {
      return function (e) {
        console.log("onload", theFile);
        $("#ms_word_filtered_html").val(e.target.result);
      };
    })(f);

    // Read in the image file as a data URL.
    reader.onprogress = function (data) {
      console.log("onprogress", data);
    };

    reader.onloadend = function (data) {
      console.log("onloadend", data.currentTarget.result);
      combinedFiles[filesNamesList[globalIndex]] = JSON.parse(
        data.currentTarget.result
      );
      globalIndex++;
    };
    const a = reader.readAsText(f);
    console.log("redear", a);
  }
}
function init() {
  console.log(document.getElementById("upload"));
  document
    .getElementById("upload")
    .addEventListener("change", handleFileSelect, false);
}

function downloadCombinedFiles() {
  globalIndex = 0;
  let exportName = "result";
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(combinedFiles));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();

  console.log(combinedFiles);
}
