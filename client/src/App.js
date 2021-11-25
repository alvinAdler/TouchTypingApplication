import { useState, useEffect } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import Cookies from 'js-cookie'
import axios from 'axios'

import './App.css';

import AuthContext from './components/context/AuthContext';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Navbar from './components/UtilityComponents/Navbar/Navbar';
import PracticePage from './components/PracticePage/PracticePage.jsx';
import UserPerformancePage from './components/UserPerformancePage/UserPerformancePage'
import TutorialPage from './components/TutorialPage/TutorialPage';
import ProtectedRoute from './components/UtilityComponents/ProtectedRoute/ProtectedRoute';
import ProtectedLogin from './components/UtilityComponents/ProtectedRoute/ProtectedLogin';
import { checkToken } from './components/Utilities/functions'

const App = () => {

	const [auth, setAuth] = useState(false)

	const history = useHistory()
	const location = useLocation()

	useEffect(() => {
        const onPageMount = () => {

			if(Cookies.get("authorToken") === undefined && Cookies.get("refreshToken") === undefined){
				console.log("User has not logged in")
				return 
			}

            axios({
                method: "POST",
				url: "http://localhost:5500/verify",
				headers: {
					"Authorization": `Bearer ${Cookies.get("authorToken")}`
				}
            })
			.then((res) => {
				if(res.status === 200 && res.data.status){
					console.log(res.data.message)
					setAuth(true)

					if(Cookies.get("lastPath") !== undefined && location.pathname !== "/"){
						history.push(Cookies.get("lastPath"))
					}
				}
			})
			.catch((err) => {
				console.log(err.response)
			})
        }

        onPageMount()
    }, [])

	const changePageTo = (pageDir) => {

		try{
			const response = checkToken()

			if(!response.data.status){
				console.log(response.data.message)
				console.log("User has not logged in change page")
				return
			}
		}	
		catch(err){
			console.log(err.message)
			return
		}

		console.log("I reached here")
		history.push(pageDir)
	}

	return(
		<div className="App">
			<AuthContext.Provider value={{auth, setAuth}}>
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
								<button type="button" onClick={() => changePageTo("/practice")}>Practice Page</button>
								<button type="button" onClick={() => changePageTo("/userPerformance")}>User Performance Page</button>
								<button type="button" onClick={() => changePageTo("/tutorial")}>Tutorial Page</button>
							</div>
						</Route>

						<ProtectedLogin path="/login" component={LoginPage}/>
						<ProtectedLogin path="/register" component={RegisterPage}/>
						<ProtectedRoute path="/practice" component={PracticePage}/>
						<ProtectedRoute path="/userPerformance" component={UserPerformancePage}/>
						<ProtectedRoute path="/tutorial" component={TutorialPage}/>
					</Switch>
				</div>
			</AuthContext.Provider>
		</div>
	)
}

export default App;
