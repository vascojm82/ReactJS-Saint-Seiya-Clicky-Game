let React = require('react');
let VideoBackground = require('./VideoBackground.jsx');
let Card = require('./Card.jsx');
let Json = require('circular-json');

let CardBox = React.createClass({
  getInitialState: function(){
    return { cardList: [], currentCard: null, prevCards: [] };
  },
  getRandomArray: function(min,max){
    var A= [];
    while(max>= min) A.push(max--)
    A.sort(function(){return .5- Math.random()});
    return A;
  },
  search: function(arr, target){
    let result = arr.indexOf(target);
    console.log("serach arr: ", arr);
    console.log("serach result: ", result);

    if(result > -1)
      return true;
    else
      return false;
  },
  getCardState: function(selectedCard){
    let previousCardSet = this.state.prevCards;

    if(this.search(this.state.prevCards, selectedCard)){    //If the card was already selected
      this.props.playMusic('wrongSound', this.props.soundCollection);
      this.props.computeScore(true);    //hasBeenSelected = true, here
      this.generateCardList()
        .then(function(list){
          this.setState({
            cardList: list,
            prevCards: []
          });
        }.bind(this));
    }else{   //If the card has NOT been selected
      this.props.playMusic('selectSound', this.props.soundCollection);
      this.props.computeScore(false);   //hasBeenSelected = false, here

      previousCardSet.push(selectedCard);

      this.generateCardList()
        .then(function(list){
          this.setState({
            cardList: list,
            currentCard: selectedCard,
            prevCards: previousCardSet
          });
        }.bind(this));
    }
  },
  generateCardList: function(){
    return new Promise((resolve, reject) => {
      let imgOrderArray = this.getRandomArray(1, 48);
      let list = [];
                             //Had to make it an arrow func. instead of a regular one, as reference to 'this' had been
      imgOrderArray.forEach((cardNum, index) => {   //lost inside. It was pointing to 'cardNum' instead of the component itself so this.props was showing up as 'undefined'
        list.push(<Card getCardState={this.getCardState} cardNum={cardNum} selected={false} playSound={this.props.playMusic} soundCollection={this.props.soundCollection} />);
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
