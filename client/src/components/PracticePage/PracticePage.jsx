import React, { useState, useEffect } from 'react'
import { AppBar, Tabs, Tab } from '@mui/material'
import { Route, Switch, useRouteMatch, useHistory, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'

import './PracticePage_master.css'

import MaterialTabBody from '../UtilityComponents/MaterialTabBody/MaterialTabBody'
import DrillModePage from './DrillModePage/DrillModePage'
import GameModePage from './GameModePage/GameModePage'
import ProtectedRoute from '../UtilityComponents/ProtectedRoute/ProtectedRoute'
import PageTitle from '../UtilityComponents/PageTitle/PageTitle'
import ContentHoverButton from '../UtilityComponents/ContentHoverButton/ContentHoverButton'
import practiceNavigationData from '../Utilities/practiceNavigationData'
import theme from '../Utilities/tabsTheme'

import { markLastVisitedPath, modifyUserCookie, camelCaseToSentenceCase } from '../Utilities/functions'

const PracticePage = () => {

    const [currentTab, setCurrentTab] = useState(0)
    const [timeMode, setTimeMode] = useState(false);
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
            default:
            case 0:
                setSelectedPractice({mode: "drillMode", selection: "homeRow"})
                break;
            case 1:
                setSelectedPractice({mode: "gameMode", selection: "easy"})
                break;
        }
    }

    const preparePageChange = () => {

        modifyUserCookie(selectedPractice.mode, selectedPractice.selection)

        history.push({
            pathname: `${routeMatch.path}/${selectedPractice.mode}`,
            state: {
                diff: selectedPractice.selection
            }
        })
    }

    return (
        <div className="practice-page-container">
            <Switch>
                <Route path={`${routeMatch.path}`} exact render={() => (
                    <>
                        <PageTitle titleName="Practice Page"/>
                        <ThemeProvider theme={theme}>
                            <AppBar className="practice-nav-bar" position="static">
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
                            <div className="options-container container">
                                <h2>Select a lesson</h2>

                                {practiceNavigationData[selectedPractice.mode].map((item, index) => {
                                    return(
                                        <ContentHoverButton 
                                        key={index} 
                                        buttonText={camelCaseToSentenceCase(item.name)} 
                                        isSelected={item.name === selectedPractice.selection}
                                        onClick={() => setSelectedPractice({...selectedPractice, selection: item.name})}
                                        >
                                            <p>{item.description}</p>
                                        </ContentHoverButton>
                                    )
                                })}
                            </div>
                        </MaterialTabBody>
                        <MaterialTabBody currentTab={currentTab} tabIndex={1}>
                            <div className="options-container container">
                                <h2>Select a difficulty</h2>

                                {practiceNavigationData[selectedPractice.mode].map((item, index) => {
                                    return(
                                        <ContentHoverButton 
                                        key={index} 
                                        buttonText={camelCaseToSentenceCase(item.name)} 
                                        isSelected={item.name === selectedPractice.selection}
                                        onClick={() => setSelectedPractice({...selectedPractice, selection: item.name})}
                                        >
                                            <p>{item.description}</p>
                                        </ContentHoverButton>
                                    )
                                })}
                                
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
