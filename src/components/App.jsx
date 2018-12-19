let React = require('react');
let ReactDOM = require('react-dom');
let Favicon = require('react-favicon');
let Modal = require('./Modal.jsx');
let Navbar = require('./Navbar.jsx');
let Hero = require('./Hero.jsx');
let CardBox = require('./CardBox.jsx');
let Footer = require('./Footer.jsx');
let MusicPlayer = require('../helpers/jukebox.js');
let Json = require('circular-json');

let App = React.createClass({
  getInitialState: function(){     //called only once when the component loads
    return { cardBox: '', modal:'' };
  },
  toggleModal: function(){
    $(ReactDOM.findDOMNode(this.refs.modal)).modal();
  },
  componentDidMount: function(){
    MusicPlayer.initializeJukebox()     //Promesified the 'MusicPlayer' (Jukebox) to force synchronicity.
      .then(function(jukebox){
        this.setState({
          cardBox: <CardBox playMusic={jukebox.musicPlayer} soundCollection={jukebox.collection} />,
          modal:   <Modal playMusic={jukebox.musicPlayer} soundCollection={jukebox.collection} title="Welcome to my Clicky Game App" subtitle1="Click on an image to earn points," subtitle2="but don't click on any more than once!" ref={function(ref){this.refs.modal=ref;}.bind(this)} />
        }, function(){
          this.toggleModal();
        });
      }.bind(this));
  },
  render: function(){
    return(
      <div class="container-fluid">
        <Favicon url="./../public/img/favicon.ico" />
        <Navbar title="Clicky Game" subtitle="Click an image to begin!" score="0" topScore="0" />
        <Hero title="Clicky Game!" subtitle="Click on an image to earn points, but ONLY once!" />
        {this.state.cardBox}
        {this.state.modal}
        <Footer />
      </div>
    );
  }
});

module.exports = App;
