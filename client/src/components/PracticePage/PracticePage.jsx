import React, {useState} from 'react'
import {AppBar, Tabs, Tab} from '@mui/material'
import {Route, Switch, useRouteMatch} from 'react-router-dom'

import './PracticePage_master.css'

import MaterialTabBody from '../UtilityComponents/MaterialTabBody/MaterialTabBody'
import PlaceholderJumbotron from '../UtilityComponents/PlaceholderJumbotron/PlaceholderJumbotron'
import DrillModePage from './DrillModePage/DrillModePage'
import GameModePage from './GameModePage/GameModePage'

const PracticePage = () => {

    const [currentTab, setCurrentTab] = useState(0)
    const routeMatch = useRouteMatch()

    const handleTabChange = (event, selectedTab) => {
        console.log(selectedTab)
        setCurrentTab(selectedTab)
    }

    return (
        <div className="practice-page-container">
            <Switch>
                <Route path={`${routeMatch.path}`} exact render={() => (
                    <>
                        <h1 style={{textAlign: "center"}}>Practice Page</h1>
                        <AppBar color="default" position="static">
                            <Tabs
                            value={currentTab}
                            onChange={handleTabChange}
                            textColor="inherit"
                            variant="fullWidth"
                            >
                                <Tab label="Drill Mode"/>
                                <Tab label="Game Mode"/>
                            </Tabs>
                        </AppBar>
                        <MaterialTabBody currentTab={currentTab} tabIndex={0}>
                            <div className="options-container container">
                                <h2>Select a lesson</h2>
                                <button className="btn btn-primary">Home Row</button>
                                <button className="btn btn-primary">Top Row</button>
                                <button className="btn btn-primary">Bottom Row</button>
                                <button className="btn btn-primary">Number Row</button>
                                <button className="btn btn-primary">All Keyboard Keys</button>
                            </div>
                        </MaterialTabBody>
                        <MaterialTabBody currentTab={currentTab} tabIndex={1}>
                            <div className="options-container container">
                                <h2>Select a difficulty</h2>
                                <button className="btn btn-primary">Easy</button>
                                <button className="btn btn-primary">Medium</button>
                                <button className="btn btn-primary">Hard</button>
                            </div>
                        </MaterialTabBody>
                        <p style={{margin: 0}}>Selected mode: Drill Mode</p>
                        <p style={{margin: 0}}>Selected lesson: Home Row</p>
                        <button className="btn-go btn btn-primary">Go</button>
                    </>
                )}/>
                <Route path={`${routeMatch.path}/drillMode`} render={() => <DrillModePage/>}/>
                <Route path={`${routeMatch.path}/gameMode`} render={() => <GameModePage/>}/>
            </Switch>
        </div>
    )
}

export default PracticePage
