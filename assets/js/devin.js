

document.fileMapping = {
  'maaaaaaane': 'man',
  'id-rather-see-you-out-there-shaking-that-thang': 'id-rather-see-you',
  'how-you-doin-big-guy': 'how-you-doin',
  'im-gonna-go-freshen-up': 'freshen-up'
}

function playSound(path) {
  var obj = document.createElement("audio");

  obj.src = path;
  obj.volume = 0.1;
  obj.autoPlay = false;
  obj.preLoad = true;
  obj.controls = true;
  obj.className = "hidden-audio";
  document.body.append(obj);
  obj.play();

  return obj;

}


function getSpecialMapping(cleanedText) {
  if (cleanedText in document.fileMapping) {
    return document.fileMapping[cleanedText];
  }
  return cleanedText
}

function getFilePathFromText(text) {
  var cleanedString = text.replace(/[&\/\\#,+()!$~%.'’":*?<>{}]/g, '');
  var lowerCaseString = cleanedString.toLowerCase();
  var fileString = lowerCaseString.replace(/\ /g, '-');
  var finalFileString = getSpecialMapping(fileString);
  return "/assets/audio/" + finalFileString + ".m4a";
}

function onClick(e) {
  var clickedElement = e.target;
  clickedElement.style.backgroundColor = 'rgba(76, 175, 80, 0.3)';
  var itemText = clickedElement.innerHTML;
  var filePath = getFilePathFromText(itemText);
  audioObject = playSound(filePath);

  audioObject.addEventListener("ended", function(){
    clickedElement.style.backgroundColor = 'initial';
  });
}


function addEventListeners() {
  var tds = document.querySelectorAll('td');
  for (var i = 0; i < tds.length; i++) {
    tds[i].onclick = onClick;
  }
}

function setUpSoundboard() {
  addEventListeners();
  document.body.style.backgroundImage = "url('/assets/img/devin/devin.jpg')";
  setInterval(function(){
    document.querySelectorAll('.hidden-audio').forEach(function(item){
      item.remove();
    })
  }, 10000)
}


function onLoad() {
  if (window.attachEvent) {
    window.attachEvent('onload', setUpSoundboard);
  } else {
    if(window.onload) {
      var curronload = window.onload;
      var newonload = function(evt) {
        curronload(evt);
        setUpSoundboard(evt);
      };
      window.onload = newonload;
    } else {
      window.onload = setUpSoundboard;
    }
  }
}

onLoad();

