import React from 'react';
export default class DevicesView extends React.Component {
  componentDidMount() {
    window.setInterval(function(){
      fadeOut("#messages-container");
      this.props.getDevicesStatus();
    }.bind(this), 4000);
  }
  handleSwitchCommand = (e) => {
    const id = Number(e.target.dataset.id);
    const device = this.props.deviceslist[id];
    var nextstatus = (device.Status == 'Off') ? 'On' : 'Off';

    if (confirm('Are you sure you want to turn : '+nextstatus+'?')) {
        // Equivalent to `dispatch(deleteTodo())`
        this.props.SendCommand(device.HardwareID,nextstatus);
        this.props.getDevicesStatus();
    } else {
        // Do nothing!
    }
    
    
  }

  render() {
    console.log("RENDERING DEVICES REACT COMPONENT .");

    return (
      <div id="devices-view">
      Liste:
        {
          this.props.deviceslist.map( (data, index) => {


          var device_config = this.props.config.devices[data.idx];
          console.log(device_config)
          var imgsrc = ''+ (typeof device_config[data.Data+'Img'] === "undefined" ?device_config['defaultimg']:device_config[data.Data+'Img']);
          var imgaction= (device_config['action'] == "yes")? this.handleSwitchCommand : null;

            return (
              <div key={index}>
                <span>{data.Name}</span>
                <img data-id={index} src={imgsrc} height='50px' onClick={imgaction} />
                - statut : {data.Data}
              </div>
            );
          })
        }
      </div>
    );
  }
}