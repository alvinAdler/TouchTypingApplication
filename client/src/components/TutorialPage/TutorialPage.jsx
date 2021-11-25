import React, { useState, useEffect } from 'react'
import { AppBar, Tabs, Tab } from '@mui/material'
import { useLocation } from 'react-router-dom'

import './TutorialPage_master.css'

import MaterialTabBody from '../UtilityComponents/MaterialTabBody/MaterialTabBody'

import { markLastVisitedPath } from '../Utilities/functions'

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
            <h1 style={{textAlign: "center"}}>Tutorial Page</h1>
            <AppBar color="default" position="static">
                <Tabs
                value={currentTab}
                onChange={handleTabChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                >
                    <Tab label="Touch Typing Theories"/>
                    <Tab label="How to use the App"/>
                </Tabs>
            </AppBar>
            <MaterialTabBody currentTab={currentTab} tabIndex={0}>
                <div className="tutorial-content-container container">
                    <h2>Theories of Touch Typing</h2>
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
                <div className="tutorial-content-container container">
                    <h2>How to Use The Application</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id maxime perspiciatis incidunt placeat ipsam eveniet illum aut et quas tenetur. Fugiat eligendi quasi id esse quibusdam quia repudiandae mollitia corrupti?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At suscipit tempora similique, ut incidunt dicta consequatur corrupti, eos optio vero omnis eius id, animi numquam sit doloremque illum nulla itaque.</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam repellat modi, molestias pariatur odio eaque laudantium accusamus qui commodi aut, similique magni perferendis ducimus dolorum voluptate expedita quibusdam, saepe ullam.</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis doloribus, necessitatibus sequi beatae fugit at cum repellat praesentium! Consequatur, aspernatur animi nisi perspiciatis suscipit odit veniam exercitationem id commodi! Officia?</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam similique dolorem sint, quos quam eos consectetur distinctio voluptatem velit, doloribus aut, aliquid dicta qui dolorum impedit quo quia at molestiae.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt dolores magni quasi quae nihil, rerum quos fuga cumque beatae tempora tempore ab. Sed repudiandae libero, suscipit asperiores obcaecati itaque non.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi tempore distinctio dolore rem facilis sint corporis recusandae? Beatae amet quo, corrupti, autem quos veritatis fuga quas assumenda rerum quis ullam.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quae, adipisci sint veritatis debitis tempore reiciendis qui officiis ad. Cupiditate iste aperiam saepe suscipit adipisci dolorem magni sint blanditiis eligendi.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea corporis earum aliquam similique officiis voluptatibus qui amet commodi itaque nesciunt in, eum error corrupti totam quis neque accusantium? Atque, quisquam?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quas quasi. Repellat iste quia qui fugiat aperiam nesciunt, recusandae maiores eum maxime explicabo pariatur. Dicta vero esse cumque accusantium autem?</p>
                </div>
            </MaterialTabBody>
        </div>
    )
}

export default TutorialPage
