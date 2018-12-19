let React = require('react');

let Card = React.createClass({
  onMouseOver: function(e){
    console.log("this --- Card ---",this);
    this.props.playSound('hoverSound', this.props.soundCollection);
  },
  onClick: function(e){
    this.props.getCardState(this.props.cardNum);
  },
  render: function(){
    let img = `img/${this.props.cardNum}.png`;
    return(
      <div className="col-md-3">
        <div id={this.props.cardNum} className="card character hvr-bounce-in" onMouseEnter={this.onMouseOver} onClick={this.onClick}>
          <img className="img-responsive img-card" src={img} />
        </div>
      </div>
    )
  }
});

module.exports = Card;
