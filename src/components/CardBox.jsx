let React = require('react');
let VideoBackground = require('./VideoBackground.jsx');
let Card = require('./Card.jsx');
let helpers = require('../helpers/helpers');
let Json = require('circular-json');

let CardBox = React.createClass({
  getInitialState: function() {
    return { cardList: [], currentCard: '', prevCard: '' };
  },
  getRandomArray: function(min,max){
    var A= [];
    while(max>= min) A.push(max--)
    A.sort(function(){return .5- Math.random()});
    return A;
  },
  getCardState: function(selectedCard){
    if(this.state.currentCard === ''){
      this.props.playMusic('selectSound', this.props.soundCollection);
      console.log(`First Time EVER!!`);
      this.props.computeScore(false);
      this.setState({
        currentCard: selectedCard,
        prevCard: this.state.currentCard
      });
    }else if(this.state.currentCard >= 0){
      if(this.state.currentCard === selectedCard || this.state.prevCard === selectedCard){
        console.log("this.state.currentCard: ",this.state.currentCard);
        this.props.playMusic('wrongSound', this.props.soundCollection);
        this.props.computeScore(true);
        this.generateCardList()
          .then(function(list){
            this.setState({
              cardList: list
            });
          }.bind(this));
      }else{
        this.props.playMusic('selectSound', this.props.soundCollection);
        this.props.computeScore(false);
        this.setState({
          currentCard: selectedCard,
          prevCard: this.state.currentCard
        });
      }
    }
  },
  generateCardList: function(){
    return new Promise((resolve, reject) => {
      let imgOrderArray = this.getRandomArray(1, 48);
      console.log("Img Array: ", imgOrderArray);
      let list = [];

      imgOrderArray.forEach((cardNum, index) => {   //Had to make it an arrow func. instead of a regular one, as reference to 'this' had been
        console.log("cardNum: ",cardNum);           //lost inside. It was pointing to 'cardNum' instead of the component itself so this.props was
        list.push(<Card getCardState={this.getCardState} selected={false} playSound={this.props.playMusic} soundCollection={this.props.soundCollection} cardNum={cardNum} />);   //showing up as 'undefined'
      });

      if(list.length > 0)
        resolve(list);
      else
        reject("Error generating tile list!");
    });
  },
  componentDidMount: function(){
    this.generateCardList()
      .then(function(list){
        this.setState({
          cardList: list
        });
      }.bind(this));
  },
  render: function(){
    return(
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <VideoBackground src="assets/cosmos.mp4" type="video/mp4"/>
          <div className="row">
            {this.state.cardList}
            <div className="col-md-12 pre-footer"></div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = CardBox;
