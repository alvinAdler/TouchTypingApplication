import React, {useState} from 'react'
import {AppBar, Tabs, Tab} from '@mui/material'
import {Route, Switch, useRouteMatch, useHistory} from 'react-router-dom'

import './PracticePage_master.css'

import MaterialTabBody from '../UtilityComponents/MaterialTabBody/MaterialTabBody'
import DrillModePage from './DrillModePage/DrillModePage'
import GameModePage from './GameModePage/GameModePage'

const PracticePage = () => {

    const [currentTab, setCurrentTab] = useState(0)
    const [selectedPractice, setSelectedPractice] = useState({
        mode: "Drill Mode",
        selection: "Home Row"
    })
    const routeMatch = useRouteMatch()
    const history = useHistory()

    const handleTabChange = (event, selectedTab) => {
        setCurrentTab(selectedTab)
        switch(selectedTab){
            case 0:
                setSelectedPractice({mode: "Drill Mode", selection: "Home Row"})
                break;
            case 1:
                setSelectedPractice({mode: "Game Mode", selection: "Easy"})
                break;
        }
    }

    const preparePageChange = () => {
        switch(selectedPractice.mode){
            case "Drill Mode":
                switch(selectedPractice.selection){
                    case "Home Row":
                    case "Top Row":
                    case "Bottom Row":
                    case "Number Row":
                    case "AllKeys":
                        history.push(`${routeMatch.path}/drillMode`)
                    break;
                }
                break;
            case "Game Mode":
                switch(selectedPractice.selection){
                    case "Easy":
                    case "Medium":
                    case "Hard":
                        history.push(`${routeMatch.path}/gameMode`)
                    break;
                }
                break;
        }
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
                                <button className="btn btn-primary" onClick={() => setSelectedPractice({...selectedPractice, selection: "Home Row"})}>Home Row</button>
                                <button className="btn btn-primary" onClick={() => setSelectedPractice({...selectedPractice, selection: "Top Row"})}>Top Row</button>
                                <button className="btn btn-primary" onClick={() => setSelectedPractice({...selectedPractice, selection: "Bottom Row"})}>Bottom Row</button>
                                <button className="btn btn-primary" onClick={() => setSelectedPractice({...selectedPractice, selection: "Number Row"})}>Number Row</button>
                                <button className="btn btn-primary" onClick={() => setSelectedPractice({...selectedPractice, selection: "AllKeys"})}>All Keyboard Keys</button>
                            </div>
                        </MaterialTabBody>
                        <MaterialTabBody currentTab={currentTab} tabIndex={1}>
                            <div className="options-container container">
                                <h2>Select a difficulty</h2>
                                <button className="btn btn-primary" onClick={() => setSelectedPractice({...selectedPractice, selection: "Easy"})}>Easy</button>
                                <button className="btn btn-primary" onClick={() => setSelectedPractice({...selectedPractice, selection: "Medium"})}>Medium</button>
                                <button className="btn btn-primary" onClick={() => setSelectedPractice({...selectedPractice, selection: "Hard"})}>Hard</button>
                            </div>
                        </MaterialTabBody>
                        <p style={{margin: 0}}>Selected mode: {selectedPractice.mode}</p>
                        <p style={{margin: 0}}>Selected lesson: {selectedPractice.selection}</p>
                        <button className="btn-go btn btn-primary" onClick={preparePageChange}>Go</button>
                    </>
                )}/>
                <Route path={`${routeMatch.path}/drillMode`} render={() => <DrillModePage/>}/>
                <Route path={`${routeMatch.path}/gameMode`} render={() => <GameModePage/>}/>
            </Switch>
        </div>
    )
}

export default PracticePage
