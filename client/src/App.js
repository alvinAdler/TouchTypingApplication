import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import {Carousel} from 'react-bootstrap'

import './App.css';

import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Navbar from './components/UtilityComponents/Navbar/Navbar';
import PracticePage from './components/PracticePage/PracticePage.jsx';
import UserPerformancePage from './components/UserPerformancePage/UserPerformancePage'
import TutorialPage from './components/TutorialPage/TutorialPage';
import PlaceholderJumbotron from './components/UtilityComponents/PlaceholderJumbotron/PlaceholderJumbotron'

const App = () => {

	return(
		<Router>
			<div className="App">
				<Navbar/>
				<div className="app-content-container container">
					<Switch>
						<Route path="/" exact>
							<h1 className="page-title">Touch Typing Application</h1>
							<Carousel slide={false} fade={false}>
								<Carousel.Item>
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
								<Carousel.Item>
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
								<Carousel.Item>
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
								<Link to="/practice">Practice Page</Link>
								<Link to="/userPerformance">User Performance Page</Link>
								<Link to="/tutorial">Tutorial Page</Link>
							</div>
						</Route>

						<Route path="/login" render={() => <LoginPage/>}/>
						<Route path="/register" render={() => <RegisterPage/>}/>
						<Route path="/practice" render={() => <PracticePage/>}/>
						<Route path="/userPerformance" render={() => <UserPerformancePage/>}/>
						<Route path="/tutorial" render={() => <TutorialPage/>}/>
					</Switch>
				</div>
			</div>
		</Router>
	)
}

export default App;
