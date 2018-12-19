let React = require('react');

let VideoBackground = React.createClass({
  render: function(){
    return(
      <video autoPlay muted loop id="myVideo">
        	<source src={this.props.src} type={this.props.type} />
      </video>
    )
  }
});

module.exports = VideoBackground;
