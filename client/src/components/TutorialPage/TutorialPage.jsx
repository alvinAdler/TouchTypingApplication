import React, { useState, useEffect } from 'react'
import { AppBar, Tabs, Tab } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';

import './TutorialPage_master.css'

import MaterialTabBody from '../UtilityComponents/MaterialTabBody/MaterialTabBody'

import { markLastVisitedPath } from '../Utilities/functions'
import theme from '../Utilities/tabsTheme'
import PageTitle from '../UtilityComponents/PageTitle/PageTitle'
import ExpandableSection from '../UtilityComponents/ExpandableSection/ExpandableSection'
import PlaceholderJumbotron from '../UtilityComponents/PlaceholderJumbotron/PlaceholderJumbotron'

const TutorialPage = () => {

    const [currentTab, setCurrentTab] = useState(0)
    const location = useLocation()

    useEffect(() => {
        markLastVisitedPath(location.pathname)
    }, [])

    const handleTabChange = (ev, selectedTab) => {
        setCurrentTab(selectedTab)
    }

    return (
        <div className="tutorial-page-container">
            <PageTitle titleName="Tutorial Page"/>
            <ThemeProvider theme={theme}>
                <AppBar color="default" position="static">
                    <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    >
                        <Tab sx={{fontWeight: 600, color: "#2b2b2b", backgroundColor: `${currentTab === 0 ? "#005792" : "#ababab"}`}} label="Touch Typing Theories"/>
                        <Tab sx={{fontWeight: 600, color: "#2b2b2b", backgroundColor: `${currentTab === 1 ? "#005792" : "#ababab"}`}} label="How to Use the App"/>
                    </Tabs>
                </AppBar>
            </ThemeProvider>
            <MaterialTabBody currentTab={currentTab} tabIndex={0}>
                <div className="tutorial-content-container container">
                    <h2 className="tutorial-content-title">Theories of Touch Typing</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quae, adipisci sint veritatis debitis tempore reiciendis qui officiis ad. Cupiditate iste aperiam saepe suscipit adipisci dolorem magni sint blanditiis eligendi.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea corporis earum aliquam similique officiis voluptatibus qui amet commodi itaque nesciunt in, eum error corrupti totam quis neque accusantium? Atque, quisquam?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quas quasi. Repellat iste quia qui fugiat aperiam nesciunt, recusandae maiores eum maxime explicabo pariatur. Dicta vero esse cumque accusantium autem?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id maxime perspiciatis incidunt placeat ipsam eveniet illum aut et quas tenetur. Fugiat eligendi quasi id esse quibusdam quia repudiandae mollitia corrupti?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At suscipit tempora similique, ut incidunt dicta consequatur corrupti, eos optio vero omnis eius id, animi numquam sit doloremque illum nulla itaque.</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam repellat modi, molestias pariatur odio eaque laudantium accusamus qui commodi aut, similique magni perferendis ducimus dolorum voluptate expedita quibusdam, saepe ullam.</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis doloribus, necessitatibus sequi beatae fugit at cum repellat praesentium! Consequatur, aspernatur animi nisi perspiciatis suscipit odit veniam exercitationem id commodi! Officia?</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam similique dolorem sint, quos quam eos consectetur distinctio voluptatem velit, doloribus aut, aliquid dicta qui dolorum impedit quo quia at molestiae.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt dolores magni quasi quae nihil, rerum quos fuga cumque beatae tempora tempore ab. Sed repudiandae libero, suscipit asperiores obcaecati itaque non.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi tempore distinctio dolore rem facilis sint corporis recusandae? Beatae amet quo, corrupti, autem quos veritatis fuga quas assumenda rerum quis ullam.</p>
                </div>
            </MaterialTabBody>
            <MaterialTabBody currentTab={currentTab} tabIndex={1}>
                <div className="tutorial-content-container">
                    <h2 className="tutorial-content-title">How to Use The Application</h2>
                    <p className="tutorial-description lead">Welcome to the tutorial page! This is the page where you can find various tutorial regarding how to operate the application. Ther tutorials are served using expandable cards that you can click on. Please select the cards below according to your needs.</p>
                    <ExpandableSection sectionTitle="Menus">
                        <h3>Menus</h3>
                        <p className="sub-content-forewords">This is the section where you will find the explanations regarding the functionality of each menu in this application. There are 4 core menus / pages of the applicatoin of this application. Each of the menu / page will be elaborated below.</p>
                        <p className="alert alert-warning">You can use the navigation list below to jump to the explanation of the desired menu!</p>
                        <ul>
                            <li>Main Menu</li>
                            <li>Practice Menu</li>
                            <li>User Performance Menu</li>
                            <li>Tutorial Menu</li>
                        </ul>

                        <div className="menus-content-container">
                            <h4>Main Menu</h4>

                            <hr className="my-4" />

                            <h4>Practice Menu</h4>

                            <hr className="my-4" />

                            <h4>User Performance Menu</h4>

                            <hr className="my-4" />
                            
                            <h4>Tutorial Menu</h4>
                        </div>

                    </ExpandableSection>
                    <ExpandableSection>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos voluptas dolore aperiam nobis sequi eum quo, inventore obcaecati eaque eos?</p>
                    </ExpandableSection>
                    <ExpandableSection>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos voluptas dolore aperiam nobis sequi eum quo, inventore obcaecati eaque eos?</p>
                    </ExpandableSection>
                    <ExpandableSection>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos voluptas dolore aperiam nobis sequi eum quo, inventore obcaecati eaque eos?</p>
                    </ExpandableSection>
                    <ExpandableSection>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos voluptas dolore aperiam nobis sequi eum quo, inventore obcaecati eaque eos?</p>
                    </ExpandableSection>
                </div>
            </MaterialTabBody>
        </div>
    )
}

export default TutorialPage
