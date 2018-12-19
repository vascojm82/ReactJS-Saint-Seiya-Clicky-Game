let React = require('react');

let Hero = React.createClass({
  render: function(){
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 jumbo-col">
            <div className="jumbotron">
              <div className="row">
                <div className="col-md-6 col-md-offset-3">
                  <div className="title-box-row">
                    <h1 className="text-center">{this.props.title}</h1>
                    <p className="text-center">{this.props.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Hero;
