import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import {Carousel, Button} from 'react-bootstrap'

import './App.css';

import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import Navbar from './components/UtilityComponents/Navbar/Navbar';

const App = () => {
	return(
		<Router>
			<div className="App">
				<Navbar/>
				<Switch>
					<Route path="/" exact>
						<div className="container">
							<h1 className="page-title">Touch Typing Application</h1>
							<Carousel>
								<Carousel.Item interval={3000}>
									<img
									className="carousel-image"
									src="https://images.unsplash.com/photo-1615220368123-9bb8faf4221b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2FtcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
									alt="First slide"
									/>
									<Carousel.Caption>
										<h3>First slide label</h3>
										<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
									</Carousel.Caption>
								</Carousel.Item>
								<Carousel.Item interval={3000}>
									<img
									className="carousel-image"
									src="https://images.unsplash.com/photo-1612528443702-f6741f70a049?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2FtcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
									alt="Second slide"
									/>
									<Carousel.Caption>
										<h3>Second slide label</h3>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
									</Carousel.Caption>
								</Carousel.Item>
								<Carousel.Item interval={3000}>
									<img
									className="carousel-image"
									src="https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
									alt="Third slide"
									/>
									<Carousel.Caption>
										<h3>Third slide label</h3>
										<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
									</Carousel.Caption>
								</Carousel.Item>
							</Carousel>
							<div className="main-features">
								<Button variant="secondary">Practice Page</Button>
								<Button variant="secondary">User Performance Page</Button>
								<Button variant="secondary">Tutorial Page</Button>
							</div>
						</div>
					</Route>

					<Route path="/login" render={LoginPage}/>
					<Route path="/register" render={RegisterPage}/>
				</Switch>
			</div>
		</Router>
	)
}

export default App;
