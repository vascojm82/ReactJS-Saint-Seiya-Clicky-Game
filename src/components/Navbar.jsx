let React = require('react');

let Navbar = React.createClass({
  getInitialState: function(){     //called only once when the component loads
    return {score: 0, topScore: 0};
  },
  render: function(){
    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-3 col-sm-4 col-md-4">
              <a href="#"><h3 class="text-center">{this.props.title}</h3></a>
            </div>
            <div className="col-xs-5 col-sm-4 col-md-4">
              <h3 className="text-center">{this.props.subtitle}</h3>
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4">
              <h3 className="text-center">Score: {this.state.score} | Top Score: {this.state.topScore}</h3>
            </div>
          </div>
        </div>
      </nav>
    );
  }
});


module.exports = Navbar;
