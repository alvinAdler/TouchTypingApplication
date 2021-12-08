import { useState, useEffect } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import Cookies from 'js-cookie'
import swal from 'sweetalert2'

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
import PageTitle from './components/UtilityComponents/PageTitle/PageTitle'
import { checkToken } from './components/Utilities/functions'

const App = () => {

	const [auth, setAuth] = useState(false)

	const history = useHistory()
	const location = useLocation()

	useEffect(() => {
        const onPageMount = async () => {

			const result = await checkToken()

			if(result.status){
				setAuth(true)

				if(Cookies.get("lastPath") !== undefined && location.pathname !== "/"){
					history.push(Cookies.get("lastPath"))
				}
			}
        }

        onPageMount()
    }, [])

	const changePageTo = async (pageDir) => {

		if(pageDir === "/tutorial"){
			history.push(pageDir)
			return
		}

		try{
			const response = await checkToken()

			if(!response.status){
				swal.fire({
					icon: "error",
					title: "Login Required!",
					text: "Please login to access the main features",
					confirmButtonColor: "#2285e4"
				})
				.then(() => {
					history.push("/login")
				})
				return
			}
		}	
		catch(err){
			console.log(err.message)
			swal.fire({
				icon: "error",
				title: "An error has occurred!",
				text: `${err.message}`
			})
			return
		}

		history.push(pageDir)
	}

	// const dummyLogin = () => {
	// 	axios({
    //         method: "POST",
    //         url: "http://localhost:5500/login",
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         data: {
    //             username: "admin",
    //             password: "admin"
    //         }
    //     })
    //     .then((res) => {
    //         if(res.status === 200 && res.data.isLoggedIn === true){
    //             console.log("Successfully logged in")

    //             Cookies.set("authorToken", res.data.authToken)
    //             Cookies.set("refreshToken", res.data.refreshToken)

                
    //         }
    //     })
	// }

	// const dummyGetUser = () => {
	// 	tokenAxios({
    //         method: "GET",
    //         url: "http://localhost:5000/users/getUserIdentity",
    //         headers: {
    //             'content-type': 'application/json'
	// 		}
    //     })
    //     .then((res) => {
    //         if(res.status === 200){
    //             console.log("Successfully fetched data")

    //             console.log(res)
    //         }
    //     })
	// 	.catch((err) => {
	// 		if(err.response){
	// 			console.log("I am in the client")
	// 			console.log(err.response)
	// 		}
	// 	})
	// }

	return(
		<div className="App">
			<AuthContext.Provider value={{auth, setAuth}}>
				<Navbar/>
				<div className="app-content-container container">
					<Switch>
						<Route path="/" exact>
							<div className="main-page-container">
								<PageTitle titleName="Touch Typing Application"/>
								<Carousel className="main-carousel">
									<Carousel.Item className="main-carousel-item" interval={3000}>
										<img
										className="carousel-image"
										src="/images/undraw_banner_productivity.svg"
										alt="First slide"
										/>
										<Carousel.Caption className="main-carousel-caption">
											<h2>Increase Your Productivity</h2>
											<p>Complete more tasks with higher typing speed and accuracy</p>
										</Carousel.Caption>
									</Carousel.Item>
									<Carousel.Item className="main-carousel-item" interval={3000}>
										<img
										className="carousel-image"
										src="/images/undraw_banner_speed.svg"
										alt="Second slide"
										/>
										<Carousel.Caption className="main-carousel-caption">
											<h2>Go Fast Typing Now!</h2>
											<p>Impress the others with your typing skills</p>
										</Carousel.Caption>
									</Carousel.Item>
									<Carousel.Item className="main-carousel-item" interval={3000}>
										<img
										className="carousel-image"
										src="/images/undraw_banner_accuracy.svg"
										alt="Third slide"
										/>
										<Carousel.Caption className="main-carousel-caption">
											<h2>Less Typing Error</h2>
											<p>Present a fast and an error free work to your colleagues</p>
										</Carousel.Caption>
									</Carousel.Item>
								</Carousel>
								<div className="main-features">
									<div className="features-section" onClick={() => changePageTo("/practice")}> 
										<h2>Practice Page</h2>
										<p>Enhance your typing skills with practices</p>
									</div>
									<div className="features-section" onClick={() => changePageTo("/userPerformance")}> 
										<h2>User Performance Page</h2>
										<p>Track your progress of typing</p>
									</div>
									<div className="features-section" onClick={() => changePageTo("/tutorial")}> 
										<h2>Tutorial Page</h2>
										<p>View the tutorials to get started with the application</p>
									</div>
								</div>
								{/* <div className="network-playground">
									<button type="button" className="btn btn-primary" onClick={dummyLogin}>
										Send Request
									</button>
									<button type="button" className="btn btn-success" onClick={dummyGetUser}>
										Get user
									</button>
								</div> */}
							</div>
						</Route>

						<ProtectedLogin path="/login" component={LoginPage}/>
						<ProtectedLogin path="/register" component={RegisterPage}/>
						<ProtectedRoute path="/practice" component={PracticePage}/>
						<ProtectedRoute path="/userPerformance" component={UserPerformancePage}/>
						<Route path="/tutorial" render={() => <TutorialPage/>}/>
					</Switch>
				</div>
			</AuthContext.Provider>
		</div>
	)
}

export default App;
