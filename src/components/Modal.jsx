let React = require('react');
let Json = require('circular-json');

let Modal = React.createClass({
  onClose: function(){
    this.props.playMusic('backgroundMusic', this.props.soundCollection);
  },
  componentDidMount: function(){
    console.log("Modal Props: " + Json.stringify(this.props));
  },
  render: function(){
    return(
      <div className="modal fade" id="openingModal" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="false">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title text-center" id="openingModalTitle">{this.props.title}</h2>
              <button type="button" onClick={this.onClose} className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h4 className="text-center">{this.props.subtitle1}</h4>
              <h4 className="text-center">{this.props.subtitle2}</h4>
              <h4 className="text-center">Give it a try !</h4>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary close-btn" data-dismiss="modal" onClick={this.onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Modal;
