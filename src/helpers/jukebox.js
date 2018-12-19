let initializeJukebox = function(){
  return new Promise((resolve, reject) => {
    $( document ).ready(function() {
      let backgroundMusicObject = soundManager.createSound({
        url: "assets/pegasus_fantasy.mp3",
        autoLoad: true,
        autoPlay: true,
        loops: 100,
        onload: function() {
          alert('The sound '+this.id+' loaded!');
        },
      });

      backgroundMusicObject.stop();
      backgroundMusicObject.setVolume(20);

      let hoverSoundObject = soundManager.createSound({
        url: "assets/hover.wav",
        autoLoad: true,
        autoPlay: true,
        onload: function() {
          alert('The sound '+this.id+' loaded!');
        },
      });

      hoverSoundObject.stop();

      let selectSoundObject = soundManager.createSound({
        url: "assets/correct.wav",
        autoLoad: true,
        autoPlay: true,
        onload: function() {
          alert('The sound '+this.id+' loaded!');
        },
      });

      selectSoundObject.stop();

      let play = function(choice, soundCollection){
        if(choice === 'backgroundMusic')
          soundCollection.backgroundMusicObject.play();
        else if(choice === 'hoverSound')
          soundCollection.hoverSoundObject.play();
        else if(choice === 'selectSound')
          soundCollection.selectSoundObject.play();
      }

      resolve({
        collection: {
          backgroundMusicObject: backgroundMusicObject,
          hoverSoundObject: hoverSoundObject,
          selectSoundObject: selectSoundObject
        },
        musicPlayer: play
      });
    });
  });
}

module.exports = {
  initializeJukebox
}
