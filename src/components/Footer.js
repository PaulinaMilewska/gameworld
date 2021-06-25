import "./Footer.css";

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button } from "@material-ui/core";
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';




const useStyles = makeStyles({
	btn: {
		margin: '10px',
		padding: '10px',
		color: 'white',

	},
	btn2: {
		margin: '10px',
		padding: '10px',
		color: 'white'

	},

	btn3: {
		margin: '10px',
		padding: '10px',
		color: 'white'

	},

	youtube:{
		fontSize:'40px',
		color:'red',
	},

	twitter:{
		fontSize:'40px',
	},

	facebook:{
		fontSize:'40px',
		color:'black',
	},

})

const Footer = () => {
	const classes = useStyles()
	return (

		<div className="main-footer">
			<div className="container">
				<div className="row">
					{/* Column 1 */}
					<div className="col">
						<h4>Nasz serwis z grami GameWorld !</h4>
						<ul className="list">
							<a href="https://www.gry-online.pl/S021.asp">Nowości</a>
							<li>Najlepiej oceniane gry</li>
							<li>Klasyka gier</li>
						</ul>
					</div>

					{/* column2 */}
					<div className="col">
						<h4>O serwisie</h4>
						<ul className="list">
							<Button className={classes.btn} variant="outlined" color="default" href="#outlined-buttons">
								O nas
							</Button>
							<Button className={classes.btn2} variant="outlined" href="#outlined-buttons">
								Kontakt
							</Button>
							<Button className={classes.btn3} variant="outlined" href="#outlined-buttons">
								RSS
							</Button>

						</ul>
					</div>
					{/* column3 */}
					<div className="col">
						<h4></h4>
						<ul className="list">
							<li><YouTubeIcon className={classes.youtube}/></li>
							<li><TwitterIcon className={classes.twitter}/></li>
							<li><FacebookIcon className={classes.facebook}/></li>
						</ul>
					</div>
				</div>
				<div className="row">
					<p className="info">
						&copy;{new Date().getFullYear()} GAMEWORLD | ALL right
						reserved 
					</p>
				</div>
			</div>
			
		</div>
	);
};

export default Footer;







