"use strict";
let projectId;
let zip = new JSZip();;
$('#load-btn').click(function() {
  projectId = $('#project-id').val();
  $('#load-btn').text('LOADING...');
  fetch(`https://projects.scratch.mit.edu/${projectId}`)
  .then(res=>res.json()).then(res=>{
    $('#json-editor').val(res);
    $('#json-editor').removeAttr('disabled');
    $('#load-btn').text('LOAD');
    $('#thumbnail').attr('src', `https://uploads.scratch.mit.edu/projects/thumbnails/${projectId}.png`);
  })
  .catch(()=>{
    alert('エラーが発生しました。\nThe error occurred.')
    $('#load-btn').text('LOAD');
  })
});

$('#export').click(function () {
  let folder = zip.folder("project");
  folder.file('project.json', $('#json-editor').val());
  zip.generateAsync({type:"blob"})
  .then(function(content) {
      // see FileSaver.js
      saveAs(content, "project.sb3");
  });
});