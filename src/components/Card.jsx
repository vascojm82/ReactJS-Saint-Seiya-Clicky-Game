let React = require('react');

let Card = React.createClass({
  onMouseOver: function(e){
    this.props.playSound('hoverSound', this.props.soundCollection);
  },
  onClick: function(e){
    this.props.getCardState(this.props.cardNum);
  },
  render: function(){
    let img = `img/${this.props.cardNum}.png`;
    return(
      <div className="col-xs-8 col-xs-offset-2 col-sm-3 col-sm-offset-2 col-md-3 col-md-offset-0">
        <div id={this.props.cardNum} className="card character hvr-bounce-in" onMouseEnter={this.onMouseOver} onClick={this.onClick}>
          <img className="img-responsive img-card" src={img} />
        </div>
      </div>
    )
  }
});

module.exports = Card;
