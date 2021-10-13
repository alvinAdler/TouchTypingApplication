import './App.css';

import PlaceholderJumbotron from './components/UtilityComponents/PlaceholderJumbotron/PlaceholderJumbotron';
import Navbar from './components/UtilityComponents/Navbar/Navbar';

const App = () => {
	return(
		<>
			<Navbar/>
			<div className="App container">
				<PlaceholderJumbotron/>
			</div>
		</>
	)
}

export default App;
