import React, { useState, useEffect } from 'react'
import { AppBar, Tabs, Tab } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import Cookies from 'js-cookie'

import './UserPerformancePage_master.css'

import MaterialTabBody from '../UtilityComponents/MaterialTabBody/MaterialTabBody'
import theme from '../Utilities/tabsTheme'
import { markLastVisitedPath } from '../Utilities/functions'

const UserPerformancePage = () => {

    const [currentTab, setCurrentTab] = useState(0)
    const location = useLocation()

    useEffect(() => {
        markLastVisitedPath(location.pathname)

    }, [])

    const handleTabChange = (ev, selectedTab) => {
        setCurrentTab(selectedTab)
    }

    const getPerformanceData = () => {
        axios.all([
            axios({
                method: "GET",
                url: "http://localhost:5000/performance/get/gameMode",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("authorToken")}`,
                }
            }),
            axios({
                method: "GET",
                url: "http://localhost:5000/performance/get/drillMode",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("authorToken")}`,
                }
            })
        ])
        .then(axios.spread((gameData, drillData) => {
            console.log("Game Data")
            console.log(gameData.data)

            console.log("===============")

            console.log("Drill Data")
            console.log(drillData)
        }))
    }

    return (
        <div className="performance-container">
            <h1 style={{textAlign: "center"}}>User Performance Page</h1>
            <ThemeProvider theme={theme}>
                <AppBar color="default" position="static">
                    <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    >
                        <Tab sx={{fontWeight: 600, color: "#2b2b2b", backgroundColor: `${currentTab === 0 ? "#005792" : "#ababab"}`}} label="Drill Mode"/>
                        <Tab sx={{fontWeight: 600, color: "#2b2b2b", backgroundColor: `${currentTab === 1 ? "#005792" : "#ababab"}`}} label="Game Mode"/>
                    </Tabs>
                </AppBar>
            </ThemeProvider>
            <MaterialTabBody currentTab={currentTab} tabIndex={0}>
                <div className="performance-details container">
                    <div className="summary-container">
                        <h4>Summary</h4>
                        <div className="typing-speed">
                            <h5>Typing Speed</h5>
                            <div>
                                <h6>Lowest Typing Speed</h6>
                                <p>50 WPM</p>
                            </div>
                            <div>
                                <h6>Highest Typing Speed</h6>
                                <p>130 WPM</p>
                            </div>
                            <div>
                                <h6>Average Typing Speed</h6>
                                <p>86 WPM</p>
                            </div>
                        </div>
                        <div className="typing-accuracy">
                            <h5>Typing Accuracy</h5>
                            <div>
                                <h6>Lowest Typing Accuracy</h6>
                                <p>94%</p>
                            </div>
                            <div>
                                <h6>Highest Typing Accuracy</h6>
                                <p>100%</p>
                            </div>
                            <div>
                                <h6>Average Typing Accuracy</h6>
                                <p>98%</p>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="practices-container">
                        <h4>Last 10 Practices</h4>
                        <table className="performance-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Practice Time</th>
                                    <th>Lowest Speed</th>
                                    <th>Highest Speed</th>
                                    <th>Average Speed</th>
                                    <th>Accuracy</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{textAlign: "center"}}>1</td>
                                    <td>October 15, 2021 - 20:39</td>
                                    <td>65 WPM</td>
                                    <td>95 WPM</td>
                                    <td>85 WPM</td>
                                    <td>98%</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "center"}}>2</td>
                                    <td>October 15, 2021 - 20:39</td>
                                    <td>65 WPM</td>
                                    <td>95 WPM</td>
                                    <td>85 WPM</td>
                                    <td>98%</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "center"}}>3</td>
                                    <td>October 15, 2021 - 20:39</td>
                                    <td>65 WPM</td>
                                    <td>95 WPM</td>
                                    <td>85 WPM</td>
                                    <td>98%</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "center"}}>4</td>
                                    <td>October 15, 2021 - 20:39</td>
                                    <td>65 WPM</td>
                                    <td>95 WPM</td>
                                    <td>85 WPM</td>
                                    <td>98%</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "center"}}>5</td>
                                    <td>October 15, 2021 - 20:39</td>
                                    <td>65 WPM</td>
                                    <td>95 WPM</td>
                                    <td>85 WPM</td>
                                    <td>98%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>                                    
                </div>
            </MaterialTabBody>
            <MaterialTabBody currentTab={currentTab} tabIndex={1}>
                <div className="performance-details container">
                    <div className="summary-container">
                        <h4>Summary</h4>
                        <div className="typing-speed">
                            <h5>Typing Speed</h5>
                            <div>
                                <h6>Lowest Typing Speed</h6>
                                <p>50 WPM</p>
                            </div>
                            <div>
                                <h6>Highest Typing Speed</h6>
                                <p>130 WPM</p>
                            </div>
                            <div>
                                <h6>Average Typing Speed</h6>
                                <p>86 WPM</p>
                            </div>
                        </div>
                        <div className="typing-accuracy">
                            <h5>Typing Accuracy</h5>
                            <div>
                                <h6>Lowest Typing Accuracy</h6>
                                <p>94%</p>
                            </div>
                            <div>
                                <h6>Highest Typing Accuracy</h6>
                                <p>100%</p>
                            </div>
                            <div>
                                <h6>Average Typing Accuracy</h6>
                                <p>98%</p>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="practices-container">
                        <h4>Last 10 Practices</h4>
                        <table className="performance-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Practice Time</th>
                                    <th>Lowest Speed</th>
                                    <th>Highest Speed</th>
                                    <th>Average Speed</th>
                                    <th>Accuracy</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{textAlign: "center"}}>1</td>
                                    <td>October 15, 2021 - 20:39</td>
                                    <td>65 WPM</td>
                                    <td>95 WPM</td>
                                    <td>85 WPM</td>
                                    <td>98%</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "center"}}>2</td>
                                    <td>October 15, 2021 - 20:39</td>
                                    <td>65 WPM</td>
                                    <td>95 WPM</td>
                                    <td>85 WPM</td>
                                    <td>98%</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "center"}}>3</td>
                                    <td>October 15, 2021 - 20:39</td>
                                    <td>65 WPM</td>
                                    <td>95 WPM</td>
                                    <td>85 WPM</td>
                                    <td>98%</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "center"}}>4</td>
                                    <td>October 15, 2021 - 20:39</td>
                                    <td>65 WPM</td>
                                    <td>95 WPM</td>
                                    <td>85 WPM</td>
                                    <td>98%</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "center"}}>5</td>
                                    <td>October 15, 2021 - 20:39</td>
                                    <td>65 WPM</td>
                                    <td>95 WPM</td>
                                    <td>85 WPM</td>
                                    <td>98%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>                            
                </div>
            </MaterialTabBody>
            <button className="btn btn-primary" onClick={getPerformanceData}>Get Data</button>
        </div>
    )
}

export default UserPerformancePage
