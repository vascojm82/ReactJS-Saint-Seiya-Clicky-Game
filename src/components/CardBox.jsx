let React = require('react');
let VideoBackground = require('./VideoBackground.jsx');
let Card = require('./Card.jsx');
let Json = require('circular-json');

let CardBox = React.createClass({
  getInitialState: function() {
    return { cardList: [], currentCard: '' };
  },
  getRandomArray: function(min,max){
    var A= [];
    while(max>= min) A.push(max--)
    A.sort(function(){return .5- Math.random()});
    return A;
  },
  getCardState: function(selectedCard){
    if(this.state.currentCard >= 0){
      if(this.state.currentCard === selectedCard){
        console.log("this.state.currentCard: ",this.state.currentCard);
        this.generateCardList()
          .then(function(list){
            this.setState({
              cardList: list
            }, function(){
              console.log("New Card List: ",this.state.cardList);
            });
          }.bind(this));
      }else{
        this.setState({
          currentCard: selectedCard
        },function(){
          console.log("New card: ",this.state.currentCard);
        });
      }
    }else{
      this.setState({
        currentCard: selectedCard
      },function(){
        console.log("First card: ",this.state.currentCard);
      });
    }
  },
  generateCardList: function(){
    return new Promise((resolve, reject) => {
      let imgOrderArray = this.getRandomArray(1, 48);
      console.log("Img Array: ", imgOrderArray);
      let list = [];

      imgOrderArray.forEach((index, cardNum) => {   //Had to make it an arrow func. instead of a regular one, as reference to 'this' had been
                                                    //lost inside. It was pointing to 'cardNum' instead of the component itself so this.props was
        list.push(<Card getCardState={this.getCardState} playSound={this.props.playMusic} soundCollection={this.props.soundCollection} cardNum={cardNum} />);   //showing up as 'undefined'
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
