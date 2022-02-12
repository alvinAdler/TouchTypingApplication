import React, { useState, useEffect } from 'react'
import { AppBar, Tabs, Tab } from '@mui/material'
import { useLocation, useHistory } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import Cookies from 'js-cookie'
import swal from 'sweetalert2'

import './UserPerformancePage_master.css'

import MaterialTabBody from '../UtilityComponents/MaterialTabBody/MaterialTabBody'
import theme from '../Utilities/tabsTheme'
import PageTitle from '../UtilityComponents/PageTitle/PageTitle'
import EmptyBanner from '../UtilityComponents/EmptyBanner/EmptyBanner'
import { 
    markLastVisitedPath,
    camelCaseToSentenceCase,
    changeTimeFormat,
    convertISOtoUTC
} from '../Utilities/functions'

const UserPerformancePage = () => {

    const [currentTab, setCurrentTab] = useState(0)
    const [drillPerformances, setDrillPerformances] = useState({
        lastTenDrills: [],
        summary: {}
    })
    const [gamePerformances, setGamePerformances] = useState({
        lastTenGames: [],
        summary: {}
    })


    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        markLastVisitedPath(location.pathname)
        getPerformanceData()
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
            if(gameData.data.isEmpty){
                console.log("Does not exist for game")
            }else{
                console.log("Game Data")
                console.log(gameData.data)
                setGamePerformances(gameData.data.result)
            }

            if(drillData.data.isEmpty){
                console.log("Does not exist for drill")
            }else{
                console.log("Drill Data")
                console.log(drillData.data)
                setDrillPerformances(drillData.data.result)
            }

        }))
        .catch((err) => {
            if(err.response){
                console.log(err.response)
            }else{
                console.log(err.message)
            }
            
            swal.fire({
                icon: "error",
                title: "Oops",
                text: "Something went wrong. Please recheck your connection",
                confirmButtonColor: "#eb4034",
            })
            .then((res) => {
                history.push("/")
            })
        })
    }

    return (
        <div className="performance-container">
            <PageTitle titleName="User Performance Page"/>
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
                <div className="performance-details">
                    <div className="summary-container">
                        <h2 className="performance-section-title">Summary</h2>

                        {Object.keys(drillPerformances.summary).length < 1 ? 
                        <EmptyBanner 
                        title="No data" 
                        description="You have not take practice in the drill mode."
                        suggestion="You can go back to the practice menu and select your favourite practice to begin! Your performance for the drill mode will be recorded here."
                        />
                        :
                        <>
                            <div className="performance-sum-details">
                                <h3 className="performance-subsection-title">Typing Speed</h3>
                                <div className="performance-subsection-content">
                                    <h4>Slowest</h4>
                                    <p>{drillPerformances.summary?.minWpm} <span>WPM</span></p>
                                </div>
                                <div className="performance-subsection-content">
                                    <h4>Fastest</h4>
                                    <p>{drillPerformances.summary?.maxWpm} <span>WPM</span></p>
                                </div>
                                <div className="performance-subsection-content">
                                    <h4>Average</h4>
                                    <p>{drillPerformances.summary?.averageWpm} <span>WPM</span></p>
                                </div>
                            </div>
                            <div className="performance-sum-details">
                                <h3 className="performance-subsection-title">Typing Accuracy</h3>
                                <div className="performance-subsection-content">
                                    <h4>Lowest</h4>
                                    <p>{drillPerformances.summary?.minAcc}%</p>
                                </div>
                                <div className="performance-subsection-content">
                                    <h4>Highest</h4>
                                    <p>{drillPerformances.summary?.maxAcc}%</p>
                                </div>
                                <div className="performance-subsection-content">
                                    <h4>Average</h4>
                                    <p>{drillPerformances.summary?.averageAcc}%</p>
                                </div>
                            </div>  
                            <div className="performance-sum-details">
                                <h3 className="performance-subsection-title">Time</h3>
                                <div className="performance-subsection-content">
                                    <h4>Slowest</h4>
                                    <p>{changeTimeFormat(drillPerformances.summary?.slowestTime)}</p>
                                </div>
                                <div className="performance-subsection-content">
                                    <h4>Fastest</h4>
                                    <p>{changeTimeFormat(drillPerformances.summary?.fastestTime)}</p>
                                </div>
                                <div className="performance-subsection-content">
                                    <h4>Average</h4>
                                    <p>{changeTimeFormat(drillPerformances.summary?.averageTime)}</p>
                                </div>
                            </div>   
                        </>               
                        }

                    </div>
                    <hr className="my-4" style={{color: "white", backgroundColor: "white", height: "2px"}}/>
                    <div className="practices-container">
                        <h2 className="performance-section-title">Last 10 Practices</h2>
                        <div className="performance-table-container">
                            {drillPerformances.lastTenDrills.length < 1 ?

                            <EmptyBanner 
                            title="No data" 
                            description="You have not take practice in the drill mode."
                            suggestion="You can go back to the practice menu and select your favourite practice to begin! Your performance for the drill mode will be recorded here."
                            />

                            :

                            <table className="performance-table">
                                <thead>
                                    <tr className="performance-row">
                                        <th>No</th>
                                        <th>Practice Date</th>
                                        <th>Lesson</th>
                                        <th>Words per Minute</th>
                                        <th>Accuracy</th>
                                        <th>Total Words</th>
                                        <th>Total Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {drillPerformances.lastTenDrills.length > 0 &&
                                        drillPerformances.lastTenDrills.map((item, index) => (
                                            <tr key={index} className={`performance-row ${index % 2 === 0 ? "row-light" : "row-dark"}`}>
                                                <td className="data-num">{index + 1}</td>
                                                <td className="data-date">{convertISOtoUTC(item.recordDate)}</td>
                                                <td className="data-selection">{camelCaseToSentenceCase(item.lesson)}</td>
                                                <td className="data-wpm">{item.wordsPerMinute} wpm</td>
                                                <td className="data-acc">{item.accuracy}%</td>
                                                <td className="data-word-count">{item.totalOfWords} words</td>
                                                <td className="data-total-time">{changeTimeFormat(item.totalSeconds)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            }
                        </div>
                    </div>                                    
                </div>
            </MaterialTabBody>
            <MaterialTabBody currentTab={currentTab} tabIndex={1}>
                <div className="performance-details">
                    <div className="summary-container">
                        <h2 className="performance-section-title">Summary</h2>

                        {Object.keys(gamePerformances.summary).length < 1 ? 

                        <EmptyBanner 
                        title="No data" 
                        description="You have not take practice in the drill mode."
                        suggestion="You can go back to the practice menu and select your favourite practice to begin! Your performance for the drill mode will be recorded here."
                        />

                        :

                        <>
                            <div className="performance-sum-details">
                                <h3 className="performance-subsection-title">Score</h3>

                                <div className="performance-subsection-content">
                                    <h4>Lowest</h4>
                                    <p>{gamePerformances.summary?.minScore} <span>points</span></p>
                                </div>
                                <div className="performance-subsection-content">
                                    <h4>Highest</h4>
                                    <p>{gamePerformances.summary?.maxScore} <span>points</span></p>
                                </div>
                                <div className="performance-subsection-content">
                                    <h4>Average</h4>
                                    <p>{gamePerformances.summary?.scoreAverage} <span>points</span></p>
                                </div>

                            </div> 

                            <div className="performance-sum-details">
                                <h3 className="performance-subsection-title">Time</h3>

                                <div className="performance-subsection-content">
                                    <h4>Slowest</h4>
                                    <p>{changeTimeFormat(gamePerformances.summary?.maxTime)}</p>
                                </div>
                                <div className="performance-subsection-content">
                                    <h4>Fastest</h4>
                                    <p>{changeTimeFormat(gamePerformances.summary?.minTime)}</p>
                                </div>
                                <div className="performance-subsection-content">
                                    <h4>Average</h4>
                                    <p>{changeTimeFormat(gamePerformances.summary?.timeAverage)}</p>
                                </div>

                            </div>                 
                        </>

                        }

                    </div>
                    <hr className="my-4" style={{color: "white", backgroundColor: "white", height: "2px"}}/>
                    <div className="practices-container">
                        <h2 className="performance-section-title">Last 10 Practices</h2>
                        <div className="performance-table-container">

                            {gamePerformances.lastTenGames.length < 1 ?
                            
                            <EmptyBanner 
                            title="No data" 
                            description="You have not take practice in the game mode."
                            suggestion="You can go back to the practice menu and select your favourite practice to begin! Your performance for the game mode will be recorded here."
                            />

                            :

                            <table className="performance-table">
                                <thead>
                                    <tr className="performance-row">
                                        <th>No</th>
                                        <th>Practice Date</th>
                                        <th>Difficulty</th>
                                        <th>Score</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gamePerformances.lastTenGames.length > 0 &&
                                        gamePerformances.lastTenGames.map((item, index) => (
                                            <tr key={index} className={`performance-row ${index % 2 === 0 ? "row-light" : "row-dark"}`}>
                                                <td className="data-num">{index + 1}</td>
                                                <td className="data-date">{convertISOtoUTC(item.recordDate)}</td>
                                                <td className="data-selection">{camelCaseToSentenceCase(item.difficulty)}</td>
                                                <td className="data-score">{item.score} points</td>
                                                <td className="data-score">{changeTimeFormat(item.totalSeconds)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            }

                        </div>
                    </div>                                    
                </div>
            </MaterialTabBody>
        </div>
    )
}

export default UserPerformancePage
