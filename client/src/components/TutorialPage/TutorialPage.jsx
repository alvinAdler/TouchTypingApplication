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
                        <p className="alert alert-info"><strong>Info!</strong> You can use the navigation list below to jump to the explanation of the desired menu!</p>
                        <ul>
                            <li>Main Menu</li>
                            <li>Navbar</li>
                            <li>Login & Register</li>
                            <li>Practice Menu</li>
                            <li>User Performance Menu</li>
                            <li>Tutorial Menu</li>
                        </ul>

                        <div className="menus-content-container">
                            <div className="content-menu">
                                <h4>Main Menu</h4>

                                <p>This is the landing page of the application. This is where you can have access to the core features of the application. Below is the appearance of the menu</p>

                                <img className="app-screenshot" src="/images/appScreenshots/mainMenu.png" alt="Can not find picture" />

                                <p>The main menu contains various component. The user can access the <strong>Practice Page</strong>, <strong>User Performance Page</strong>, and <strong>Tutorial Page</strong>. More explanations for each menu will be provided at the deeper section.</p>

                                <p className="alert alert-warning"><strong>Warning!</strong> This application requires the user to login before accessing some features which are the <strong>Practice Page</strong> and the <strong>User Performance Page</strong>. If the user does not have an account, the user can register themselves using the register button at the <strong>Navbar</strong> (Go to the <strong>Navbar</strong> component below for more info).</p>
                            </div>

                            <hr className="my-4" />


                            <div className="content-menu">
                                <h4>Navbar</h4>

                                <p>The navbar component is a component that provides a quick access tools for the user. The navbar component has 2 state of appearance: before login and after login. Below is the appearance of the navbar before the user logs in to the application.</p>

                                <img className="app-screenshot" src="/images/appScreenshots/navbarBefore.jpg" alt="Can not find picture" />

                                <p>The navbar has a logo (clickable; redirect the user to the main page), a login button, and a register button. The user can simply clicks the login button or the register button to go to the respected page</p>

                                <p className="alert alert-info"><strong>Info!</strong> This navbar is <strong>accessible across page</strong> in order to ease the main menu access for the user.</p>

                                <p>Below is the appearance of the navbar after the user logs in to the application</p>

                                <img className="app-screenshot" src="/images/appScreenshots/navbarAfter.jpg" alt="Can not find picture" />

                                <p>After the user logs in, the application removes the login and register button and instead replaces them with a logout button. This is necessary to prevent double login and registration attempt from the user. Furthermore, the application displays the username at the right side of the application's logo (in this case, the user logs in under the name <strong>Admin</strong>).</p>
                            </div>

                            <hr className="my-4" />

                            <div className="content-menu">
                                <h4>Login</h4>

                                <p>The login component is the component that the user must access prior to using the application. Below is the appearance of the component</p>

                                <img className="app-screenshot" src="/images/appScreenshots/login.png" alt="Can not find picture" />

                                <p>In order to login to the application, the user simply needs to enter the username and the password that has been registered to the system. Keep in mind that the user can not leave any of the login field empty prior to pressing the login button. Otherwise, the application would not let the user in. If the user entered the correct username and password, the user will be directed to the main menu.</p>
                            </div>

                            <hr className="my-4" />

                            <div className="content-menu">

                                <h4>Register</h4>

                                <p>If the user does not have an account, the user can register themselves through this component. Below is the appearance of the component</p>

                                <img className="app-screenshot" src="/images/appScreenshots/register.png" alt="Can not find picture" />

                                <p>In order to register, the user simply need to input their desired username and password. The user will be recignized throughout the application by the username that the user created here. The user is also required to enter their password twice before the user can create an account</p>

                                <p className="alert alert-danger"><strong>Warning!</strong> This application does not have a reset password feature. If by any chance the user forget the password, the user will most likely need to create another account since there is no way to restore or reset a password. <strong>Make sure to remember or store your password somewhere safe!</strong></p>
                            </div>

                            <hr className="my-4" />


                            <div className="content-menu">
                                <h4>Practice Menu</h4>

                                <p>This is the menu where the user can access the practices of the application. In this page, the user can select whether to practice with the drill mode or the game mode. Each selection is seperated via clickable tabs. Below are the explanations of each tab and their modes.</p>

                                <h5>Drill Mode</h5>

                                <p>The Drill mode, as its name, offers a drill-like practices to the user in order to learn touch typing. From the this tab, the user can select the desired lesson that the user would like to try at the drill mode. Below is the appearance of the lesson selection for the drill mode</p>

                                <img className="app-screenshot" src="/images/appScreenshots/practicePageDrill.png" alt="Can not find picture" />

                                <p>There are 6 available options that the user can select before proceeding to the drill mode. Each option leads to a different type of training that the user will experience later. A brief description about the lesson was provided to the user right below each option <strong>whenever the user clicks one</strong>. An indicator was also provided above the "go" button (at the bottom part of the page) to indicate which mode and lesson that the user is currently selected.</p>

                                <p>If the user already selects a lesson, the user can simply click the button "Go" at the bottom part of the page.</p>

                                <h5>Game Mode</h5>

                                <p>The Game mode offers a game-like experience for the user to learn touch typing. From this tab, the user can select the difficulty of the game that the user wants to experience. Below is the appearance of the difficulty selection for the game mode.</p>

                                <img className="app-screenshot" src="/images/appScreenshots/practicePageGame.png" alt="Can not find picture" />

                                <p>There are 3 available options that the user can select as a difficulty. The most top option has the most easy difficulty and the most bottom option has the most hard difficulty. As with the drill mode, an indicator is provided to the user regarding the description of the difficulty and the current difficulty that has been selected by the user.</p>

                            </div>

                            <hr className="my-4" />

                            <div className="content-menu">
                                <h4>User Performance Menu</h4>
                                <p>This is the page where the user can view their practice activities. As with the practice page, the user performance page also seperated the content for the drill mode and the game mode with tabs. Below are the explanations for each mode.</p>

                                <h5>Drill Mode</h5>

                                <p>The content starts with a brief user activity summary for the drill mode. Afterwards, the page display the last 10 practices of the user for the related mode. Below is the appearance of the user activity summary for the drill mode.</p>

                                <img className="app-screenshot" src="/images/appScreenshots/summaryDrill.png" alt="Can not find picture" />

                                <p>For the user activity summary of the drill mode, there are several data that the system displayed. The system displayed data related to the typing speed, typing accuracy, and the practice duration (displayed as "time" field) of the user within the drill mode. Each data was represented by displaying the minimum, maximum, and the average case of the user record in that particular field. With this data, the user can see which aspect of typing that the user needs to improve (whether in speed or accuracy)</p>

                                <div className="alert alert-info">
                                    <p><strong>Info!</strong> Below are the measurement metrices that this application use.</p>   
                                    <ol>
                                        <li>The typing speeds are measured based on the number of typed <strong>Words per Minute (WPM)</strong>.</li>
                                        <li>The typing accuracies are measured based on percentages.</li>
                                        <li>The time / duration of practice are measured based on seconds and displayed in format MM:SS where MM is the minutes and the SS is the seconds.</li>
                                    </ol>
                                    <p>For more details, kindly check the "Score Calculation" section of tutorials.</p>
                                </div>

                                <p>For the performance of the user in drill mode, the system also recorded the last 10 practices of the user in the related mode. Below is the appearance of the records</p>

                                <img className="app-screenshot" src="/images/appScreenshots/historyDrill.png" alt="Can not find picture" />

                                <p>For the drill mode, the system records the date where the practice occurred. The system also records other data such as the selected lesson, the typing speed (in WPM), the typing accuracy (in percentage), the number of words, and the total time it took the user to complete the practice.</p>

                                <h5>Game Mode</h5>

                                <p>The content starts with a brief user activity summary for the game mode. Afterwards, the page display the last 10 practices of the user for the related mode. Below is the appearance of the user activity summary for the game mode.</p>

                                <img className="app-screenshot" src="/images/appScreenshots/summaryGame.png" alt="Can not find picture" />

                                <p>For the user activity summary of the game mode, the system only record that maximum, minimum, and the average score of the user throughout the game. The system does not gathered much data of typing considering that the game mode is more focused on the "game" part of touch typing instead of the "learning" part.</p>

                                <p>For the performance of the user in game mode, the system also recorded the last 10 practices of the user in the related mode. Below is the appearance of the records</p>

                                <img className="app-screenshot" src="/images/appScreenshots/historyGame.png" alt="Can not find picture" />

                                <p>For the game mode, the system records the date where the practice occurred. The system also records other data such as the selected difficulty and the score that the user achieved in that particular game session.</p>
                            </div>
                        </div>

                    </ExpandableSection>

                    <ExpandableSection sectionTitle="Mechanism of The Drill Mode and The Game Mode">
                        <h3>Mechanism of The Drill Mode and The Game Mode</h3>
                        <p className="sub-content-forewords">This section will explain the mechanism of the drill mode and the game mode of the application. This section will also explain various interactions that the user can do in each mode</p>
                        <p className="alert alert-info"><strong>Info!</strong> You can use the navigation list below to jump to the explanation of the desired mode!</p>
                        <ul>
                            <li>Drill Mode</li>
                            <li>Game Mode</li>
                        </ul>

                        <div className="menus-content-container">
                            <div className="content-menu">
                                <h4>Drill Mode</h4>

                                <p>In the drill mode, the user learn touch typing by type some series of words / phrases that are displayed on the screen. In this mode, the application give the user some hints regarding the proper way of typing. As the user type, the program will evaluate the performance of the user according to several aspects. Below is the general appearance of the page.</p>

                                <img className="app-screenshot" src="/images/appScreenshots/drillMain.png" alt="Can not find picture" />

                                <p>It can be seen that there are several components inside of the application. The explanation of each component will be explained below.</p>

                                <h5>Word Wrapper</h5>

                                <img className="app-screenshot" src="/images/appScreenshots/drillWordWrapper.png" alt="Can not find picture" />

                                <p>The Word Wrapper component responsible to display the words / phrases that the user needs to type. The user types each letter one by one until the sequence ends. As the user types more letters, the letters inside of the word wrapper will be shifted to the left; allowing more letters to appear.</p>

                                <p className="alert alert-info"><strong>Info! </strong>After the mode starts, the user can straightly type the letters from their keyboard. The user does not require to type in some sort of input text.</p>

                                <p>There are several color indicators that have been placed at each letter. Each indicator indicate a different status of a letter. Below are those indicators</p>
                                
                                <ul>
                                    <li>The letters will be colored <strong style={{color: "#04ff00"}}>green</strong> if the user typed that letter correctly.</li>
                                    <li>The letters will be colored <strong style={{color: "rgba(255, 0, 0, 0.5)"}}>red</strong> if the user incorrectly typed that letter.</li>
                                    <li>The letters that are not yet typed by the user will be colored <strong>black</strong>.</li>
                                    <li>The current letter that the user needs to type will have a <strong style={{color: "rgba(255, 0, 0, 0.5)"}}>red pointer</strong> right below that letter.</li>
                                </ul>

                                <h5>Text Hints</h5>

                                <p>As previously mentioned, the program will also provide the user with the correct way to type a letter in some forms. One of the form is by using a written hint. Below is the appearance of that component</p>

                                <img className="app-screenshot" src="/images/appScreenshots/drillTextHints.png" alt="Can not find picture" />

                                <p>The instruction inside of this component is pretty much straight forward. It tells the user to use which hand and which finger to type a certain letter. For example, if the user needs to type the letter "e", the user needs to use the middle finger on the left hand.</p>

                                <h5>Keyboard Hints</h5>

                                <p>Another type of hints that are provided to the user is the keyboard hints. This type of hints visualize the appearance of the QWERTY keyboard and highlight the currenter letter that the user needs to type. Below is the appearance of this component.</p>

                                <img className="app-screenshot" src="/images/appScreenshots/drillKeyboardHints.png" alt="Can not find picture" />

                                <p>The letters inside of the keyboard hints were arranged in such a way that it imitates the realy-life hard QWERTY keyboard. The current letter that the user needs to type are hightlighted (the letter that has enhanced contrast and opacity). This keyboard hints were made in order to reduce the user's eye contact with an actual keyboard. Furthermore, the visual keyboard can also display the characters that require the "shift" key to be activated.</p>

                                <h5>Performance Status Bar</h5>

                                <img className="app-screenshot" src="/images/appScreenshots/drillStatusBar.png" alt="Can not find picture" />

                                <p>The performance status bar consists of several indicators related to the current typing performance of the user. Those indicators are:</p>

                                <ul>
                                    <li>
                                        <strong>Timer: </strong>
                                        Displays the amount of time the user need to complete the task. The timer will start as soom as the user type a letter.
                                    </li>
                                    <li>
                                        <strong>Typing speed (in WPMs): </strong>
                                        Display the typing speed of the user in words per minute. The formula used to obtain this will be explained in the next section of tutorial.
                                    </li>
                                    <li>
                                        <strong>Typing accuracy (in percentages): </strong>
                                        Display the typing accuracy of the user in percentages. The formula used to obtain this will be explained in the next section of tutorial.
                                    </li>
                                    <li>
                                        <strong>Error Count: </strong>
                                        Display the number of letters that have been typed incorrectly by the user.
                                    </li>
                                </ul>

                                <h5>Pause Button</h5>

                                <p>Belos is the appearance of the pause button</p>

                                <img style={{width: "50%", height: "50%", margin: "1rem auto"}} src="/images/appScreenshots/drillPauseButton.png" alt="Can not find picture" />

                                <p>The pasuse button is useful when the user want to take a little break within the on going practice. If the user clicks the pause button, a menu will show up indicating that the practice has been paused. While the user pause the practice, the system will pause the evaluation feature. Below is the appearance of the pause menu.</p>

                                <img className="app-screenshot" src="/images/appScreenshots/drillPause.png" alt="Can not find picture" />

                                <p>The user can continue the practice by clicking the "Ok" button in the pause menu.</p>

                                <h5>End Result</h5>

                                <p>After the user finish the practice, a pop-up menu will appear that shows the system will show the typing speed, typing acuuracy, and the time it takes for the user to complete the practice. Below is the appearance of that menu.</p>

                                <img className="app-screenshot" src="/images/appScreenshots/drillResult.png" alt="Can not find picture" />

                                <p>At the bottom part of the pop-up menu, there are 3 buttons. Below are the explanations of each button.</p>

                                <ul>
                                    <li>
                                        <strong>Return Button </strong>
                                        The return button will direct the user back to the practice selection page.
                                    </li>
                                    <li>
                                        <strong>Retry Button </strong>
                                        The retry button will allow the user to retry / repeat the current session of the practice.
                                    </li>
                                    <li>
                                        <strong>Main Menu Button </strong>
                                        The main menu button will direct the user back to the main menu
                                    </li>
                                </ul>

                            </div>

                            <hr className="my-4" />

                            <div className="content-menu">
                                <h4>Game Mode</h4>

                                <p>The game mode is more focused on the gameplay itself rather than the learning part of touch typing. Below is the general appearance of the game mode.</p>

                                <img className="app-screenshot" src="/images/appScreenshots/gameMain.png" alt="Can not find picture" />

                                <p>In this mode, there are aliens falling from the sky. The user's task is to shoot down the aliens; preventing them to reach the ground. The user can shoot down an alien by typing the word that the alien carry. The user can type that word in the given user input text box. The user will gain a score whenever the user shoots down an alien. More score will be given to the user as the user shoots down an alien quicker. The user can only allow up to 2 aliens on the ground. If the third alien landed, the user lose.</p>

                                <p>There are soem features that needs more explanation. Below is the explanation of those menus.</p>

                                <h5>Status Bar</h5>

                                <p>The status bar consists of the pause button, the user's score, and the user's life. The status bar is located at the top part of the page. Below is the appearance of the status bar.</p>

                                <img className="app-screenshot" src="/images/appScreenshots/gameStatusBar.png" alt="Can not find picture" />

                                <p>In the status bar, the application displays 3 lives. Again, the user lose if the user lose all 3 lives. The status bar also displays the score of the user. The status bar also becomes the container of the action buttons such as the pause button. This pause button has the same functionality and mechanism as with the one in the drill mode.</p>

                                <p className="alert alert-info"><strong>Info! </strong> The score calculation of the game mode will be explained in the next section of tutorial.</p>

                                <h5>Main Canvas</h5>

                                <img className="app-screenshot" src="/images/appScreenshots/gameMainCanvas.png" alt="Can not find picture" />

                                <p>The main canvas becomes the place where the gameplay occurs. This is where a bunch of characters and objects are displayed (e.g. the user's characters, aliens, etc.). The main canvas also contains the number of alien that the user need to destroy. Defaultly, the user will have to destroy at least 30 aliens in one go.</p>

                                <h5>User Input</h5>

                                <img className="app-screenshot" src="/images/appScreenshots/gameUserInput.png" alt="Can not find picture" />

                                <p>This is where the user give inputs to the application. The user needs to type the word that an alient carries in this input. Once the user successfully type the correct word, the user input will be cleared automatically; enabling the user to immediately type the word.</p>
                                
                                <p className="alert alert-info"><strong>Info!</strong> As soon as the game started, the application will automatically focus the user on the user input. The user does not need to activate the user input manually.</p>

                            </div>
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
                </div>
            </MaterialTabBody>
        </div>
    )
}

export default TutorialPage
