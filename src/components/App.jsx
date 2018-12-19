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
    return { cardBox: '', modal:'', score: 0, topScore:0 };
  },
  toggleModal: function(){
    $(ReactDOM.findDOMNode(this.refs.modal)).modal();
  },
  computeScore: function(hasBeenSelected){
    if(hasBeenSelected){
      console.log("Re-start! ---App.computeScore--");
      this.setState({
        topScore: (this.state.topScore >= this.state.score)? this.state.topScore : this.state.score,
        score: 0,
      }, function(){
        console.log(`score: ${this.state.score} | topScore: ${this.state.topScore}`);
        console.log(`this.refs.nav.state: `,this.refs.nav.state);
        this.refs.nav.state.score = this.state.score;
        this.refs.nav.state.topScore = this.state.topScore;
      });
    }else{
      console.log("Kontinue! ---App.computeScore--");
      this.setState({
        score: (this.state.score + 1),
      }, function(){
        console.log(`score: ${this.state.score} | topScore: ${this.state.topScore}`);
        console.log(`this.refs.nav.state: `,this.refs.nav.state);
        this.refs.nav.state.score = this.state.score;
      });
    }
  },
  componentDidMount: function(){
    MusicPlayer.initializeJukebox()     //Promesified the 'MusicPlayer' (Jukebox) to force synchronicity.
      .then(function(jukebox){
        this.setState({
          cardBox: <CardBox computeScore={this.computeScore} playMusic={jukebox.musicPlayer} soundCollection={jukebox.collection} />,
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
        <Navbar title="Clicky Game" subtitle="Click an image to begin!" ref="nav"/>
        <Hero title="Clicky Game!" subtitle="Click on an image to earn points, but ONLY once!" />
        {this.state.cardBox}
        {this.state.modal}
        <Footer />
      </div>
    );
  }
});

module.exports = App;
