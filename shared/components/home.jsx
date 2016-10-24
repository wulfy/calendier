import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect }            from 'react-redux';
import LoginContainer       from 'components/LoginContainer';

@connect(state => ({ login: state.login}))
export default class Home extends React.Component {
  
  componentWillMount= () => {
  	this.jsscripts = ["http://lesnoces.de/js/vendor/tween.js",
  						"http://lesnoces.de/js/vendor/RequestAnimationFrame.js",
  						"http://lesnoces.de/js/vendor/scrollAnimator.js",
  						"http://lesnoces.de/js/vendor/jquery.mousewheel.js",
  						"/animconfig.js"];
    this.firtload = true;
  
  }

  loadscript = (index) => {
  	if(index>=this.jsscripts.length)
  		return;
  	var jssrc = this.jsscripts[index];
  	var script = document.createElement('script');
  	var body = document.getElementsByTagName('body')[0];
    script.type = 'text/javascript';
    script.onload = (function(call,index) {
                return function() {
                    call.loadscript(index+1);
                }
            })(this,index);
    script.src = jssrc;
	body.appendChild(script);
  }
  componentDidMount= () => {
    
    this.loadscript(0);
    document.body.style.overflow = "hidden";

    }
  componentWillUnmount= () => {
    document.body.style.overflow = "auto";
  }
  componentDidUpdate = (prevProps, prevState) => {

  }
  render() 
  {
     var {login} = this.props;
    var buttons_login = <div id="connectbuttons" >
              <Link to={`/createAccount`} className="btn btn-info btn-lg">créer un compte </Link>
              <Link to={`/account`} className="btn btn-outline-inverse connect btn-lg">connecter</Link>  
            </div>;

    console.log("login : ");
    console.log(login);

    if(login.className == null || login.id)
    {
        buttons_login = <div id="connectbuttons" > <LoginContainer params={this.props.params}/></div>;
    } 

    console.log("rendering home");
    return (
      
      <div id="homecontent">
          	{buttons_login}
          	<div id="bg1" className="section-bg animated"></div>
          	<div id="bg2" className="section-bg animated"></div>
          	<img id="phone" className="animated" src="http://www.jerecuperemonex.com/wp-content/uploads/2013/09/recontacter-son-ex-erreurs-a-eviter.png" width="200px"  />
                <img id="agenda" className="animated" src="http://cdtt33.fr/wp-content/uploads/2014/05/p0310.png" width="100px"  />

                <div id="intro" className="text animated">
                    <h2> Gérez la prise de rendez-vous en ligne ! </h2>
                </div>
                <div id="first_text" className="text animated">
                				<div className="textbg"></div>
                                <p className="name">Libérez vous du téléphone</p>
                                <p className="desc">
				                  Calendier vous permet de configurer en ligne votre calendrier de réservations.
                         Vous pourrez ainsi faire profiter à vos clients de fonctionnalités uniques:<br/>
                         - Possibilité de réserver plusieures semaines à l'avance <br/>
                         - Recherche des créneaux en fonction d'un jour et d'une heure souhaitée <br/>
                         - Vous pouvez palier à l'imprévu en supprimant des créneaux d'un jour à l'autre
				                </p>
                 </div>


                    <img id="clock" className="animated" src="http://www.locksmith-capetown.com/wp-content/themes/elisium/elisium/business2.png" width="80px"/>
                    <i id="calendar_icon" className="animated fa fa-calendar"></i>
                <div id="second_text" className="text animated">
                  <div className="textbg"></div>
                  <p className="desc">
                          
                        </p>
                </div>

      </div>
    );
  }
}