import React, { useState, useEffect } from 'react'
import { AppBar, Tabs, Tab } from '@mui/material'
import { Route, Switch, useRouteMatch, useHistory, useLocation } from 'react-router-dom'

import './PracticePage_master.css'

import MaterialTabBody from '../UtilityComponents/MaterialTabBody/MaterialTabBody'
import DrillModePage from './DrillModePage/DrillModePage'
import GameModePage from './GameModePage/GameModePage'
import ProtectedRoute from '../UtilityComponents/ProtectedRoute/ProtectedRoute'
import PageTitle from '../UtilityComponents/PageTitle/PageTitle'

import { markLastVisitedPath, modifyUserCookie } from '../Utilities/functions'

const PracticePage = (props) => {

    const [currentTab, setCurrentTab] = useState(0)
    const [selectedPractice, setSelectedPractice] = useState({
        mode: "drillMode",
        selection: "homeRow"
    })
    const routeMatch = useRouteMatch()
    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        markLastVisitedPath(location.pathname)
    }, [])

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

        modifyUserCookie("practice", selectedPractice)

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
                        <PageTitle titleName="Practice Page"/>
                        <AppBar className="practice-nav-bar" color="default" position="static">
                            <Tabs
                            value={currentTab}
                            onChange={handleTabChange}
                            textColor="inherit"
                            variant="fullWidth"
                            >
                                <Tab sx={{fontWeight: 600, color: "black"}} label="Drill Mode"/>
                                <Tab sx={{fontWeight: 600, color: "black"}} label="Game Mode"/>
                            </Tabs>
                        </AppBar>
                        <MaterialTabBody currentTab={currentTab} tabIndex={0}>
                            <div className="options-container container">
                                <h2>Select a lesson</h2>
                                <button className="practice-selection-button" onClick={() => setSelectedPractice({...selectedPractice, selection: "homeRow"})}>Home Row</button>
                                <button className="practice-selection-button" onClick={() => setSelectedPractice({...selectedPractice, selection: "topRow"})}>Top Row</button>
                                <button className="practice-selection-button" onClick={() => setSelectedPractice({...selectedPractice, selection: "bottomRow"})}>Bottom Row</button>
                                <button className="practice-selection-button" onClick={() => setSelectedPractice({...selectedPractice, selection: "numberRow"})}>Number Row</button>
                                <button className="practice-selection-button" onClick={() => setSelectedPractice({...selectedPractice, selection: "allKeys"})}>All Keyboard Keys</button>
                                <button className="practice-selection-button" onClick={() => setSelectedPractice({...selectedPractice, selection: "commonWords"})}>Common Words</button>
                            </div>
                        </MaterialTabBody>
                        <MaterialTabBody currentTab={currentTab} tabIndex={1}>
                            <div className="options-container container">
                                <h2>Select a difficulty</h2>
                                <button className="practice-selection-button" onClick={() => setSelectedPractice({...selectedPractice, selection: "easy"})}>Easy</button>
                                <button className="practice-selection-button" onClick={() => setSelectedPractice({...selectedPractice, selection: "medium"})}>Medium</button>
                                <button className="practice-selection-button" onClick={() => setSelectedPractice({...selectedPractice, selection: "hard"})}>Hard</button>
                            </div>
                        </MaterialTabBody>
                        <div className="mode-indicator">
                            <span>Selected mode: {camelCaseToSentenceCase(selectedPractice.mode)}</span>
                            <span>Selected lesson: {camelCaseToSentenceCase(selectedPractice.selection)}</span>
                        </div>
                        <button className="button-go" onClick={preparePageChange}>Go</button>
                    </>
                )}/>
                
                <ProtectedRoute path={`${routeMatch.path}/drillMode`} component={DrillModePage}/>
                <ProtectedRoute path={`${routeMatch.path}/gameMode`} component={GameModePage}/>
            </Switch>
        </div>
    )
}

export default PracticePage
