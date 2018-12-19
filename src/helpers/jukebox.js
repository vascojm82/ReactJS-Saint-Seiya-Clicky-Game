let initializeJukebox = function(){
  return new Promise((resolve, reject) => {
    $( document ).ready(function() {
      let backgroundMusicObject = soundManager.createSound({
        url: "assets/pegasus_fantasy.mp3",
        autoLoad: true,
        autoPlay: true,
        loops: 100,
        onload: function() {
          //alert('The sound '+this.id+' loaded!');
        },
      });

      backgroundMusicObject.stop();
      backgroundMusicObject.setVolume(30);

      let hoverSoundObject = soundManager.createSound({
        url: "assets/hover.wav",
        autoLoad: true,
        autoPlay: true,
        onload: function() {
          //alert('The sound '+this.id+' loaded!');
        },
      });

      hoverSoundObject.stop();

      let selectSoundObject = soundManager.createSound({
        url: "assets/correct.wav",
        autoLoad: true,
        autoPlay: true,
        onload: function() {
          //alert('The sound '+this.id+' loaded!');
        },
      });

      selectSoundObject.stop();

      let wrongSoundObject = soundManager.createSound({
        url: "assets/wrong.mp3",
        autoLoad: true,
        autoPlay: true,
        onload: function() {
          //alert('The sound '+this.id+' loaded!');
        },
      });

      wrongSoundObject.stop();

      let play = function(choice, soundCollection){
        if(choice === 'backgroundMusic')
          soundCollection.backgroundMusicObject.play();
        else if(choice === 'hoverSound')
          soundCollection.hoverSoundObject.play();
        else if(choice === 'selectSound')
          soundCollection.selectSoundObject.play();
        else
          soundCollection.wrongSoundObject.play();
      }

      resolve({
        collection: {
          backgroundMusicObject,
          hoverSoundObject,
          selectSoundObject,
          wrongSoundObject
        },
        musicPlayer: play
      });
    });
  });
}

module.exports = {
  initializeJukebox
}
