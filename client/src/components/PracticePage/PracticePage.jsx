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
                setSelectedPractice({mode: "drillMode", selection: "homeRow"})
                break;
            case 1:
                setSelectedPractice({mode: "gameMode", selection: "easy"})
                break;
        }
    }

    const preparePageChange = () => {
        history.push({
            pathname: `${routeMatch.path}/${selectedPractice.mode}`,
            state: {
                diff: selectedPractice.selection
            }
        })
    }

    const camelCaseToSentenceCase = (text) => {
        let afterRegex = text.replace(/([A-Z])/g, " $1")
        return afterRegex.charAt(0).toUpperCase() + afterRegex.slice(1)
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
                                <button className="btn btn-primary" onClick={() => setSelectedPractice({...selectedPractice, selection: "homeRow"})}>Home Row</button>
                                <button className="btn btn-primary" onClick={() => setSelectedPractice({...selectedPractice, selection: "topRow"})}>Top Row</button>
                                <button className="btn btn-primary" onClick={() => setSelectedPractice({...selectedPractice, selection: "bottomRow"})}>Bottom Row</button>
                                <button className="btn btn-primary" onClick={() => setSelectedPractice({...selectedPractice, selection: "numberRow"})}>Number Row</button>
                                <button className="btn btn-primary" onClick={() => setSelectedPractice({...selectedPractice, selection: "allKeys"})}>All Keyboard Keys</button>
                            </div>
                        </MaterialTabBody>
                        <MaterialTabBody currentTab={currentTab} tabIndex={1}>
                            <div className="options-container container">
                                <h2>Select a difficulty</h2>
                                <button className="btn btn-primary" onClick={() => setSelectedPractice({...selectedPractice, selection: "easy"})}>Easy</button>
                                <button className="btn btn-primary" onClick={() => setSelectedPractice({...selectedPractice, selection: "medium"})}>Medium</button>
                                <button className="btn btn-primary" onClick={() => setSelectedPractice({...selectedPractice, selection: "hard"})}>Hard</button>
                            </div>
                        </MaterialTabBody>
                        <p style={{margin: 0}}>Selected mode: {camelCaseToSentenceCase(selectedPractice.mode)}</p>
                        <p style={{margin: 0}}>Selected lesson: {camelCaseToSentenceCase(selectedPractice.selection)}</p>
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
