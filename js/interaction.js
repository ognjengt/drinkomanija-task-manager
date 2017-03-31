window.onload = function() {
  /*var copyBtn = document.getElementById("copyBtn");
  var icon = "<i class='ion ion-ios-bookmarks' style='font-size:1.4em;'></i>";

  copyBtn.onmouseover = function() {
    copyBtn.innerHTML = icon;
  };

  copyBtn.onmouseout = function() {
    copyBtn.innerHTML = "Copy Code";
  };*/

  var copyBtn = document.getElementById('copyBtn');
  copyBtn.onmouseover = function() {
    $('#copyBtn').tooltip('hide');
  };
  copyBtn.onmouseclick = function() {
    $('#copyBtn').tooltip('toggle');
  };
  $('#clearBtn').on('click',function() {
    $('#inputID').val('');
    $('#inputLEVEL').val('');
    $('#inputTASK').val('');
    $('#inputKAPACITET').val('');
    $('#inputDRINKKAPACITET').val('');
    $('#inputBFIGRAM').val('');
    $('#inputBFPIJEM').val('');
  });
};
