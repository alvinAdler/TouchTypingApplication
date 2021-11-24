import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthContext from '../../context/AuthContext'

const ProtectedLogin = ({component: Component, ...rest}) => {

    const authorize = useContext(AuthContext)

    return (
        <Route
            {...rest}
            render = {() => authorize.auth ? 
            (
                <Redirect to="/"/>
            )
            :
            (
                <Component/>
            )
        }
        />
    )
}

export default ProtectedLogin
