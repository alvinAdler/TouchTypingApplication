import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthContext from '../../context/AuthContext'

const ProtectedRoute = ({component: Component, ...rest}) => {

    const authorize = useContext(AuthContext)

    return (
        <Route
            {...rest}
            exact
            render = { () =>  {
                return(
                    authorize.auth ? 
                    <Component/>
                    :
                    <Redirect to="/login"/>
                )
            }
            }
        />
    )
}

export default ProtectedRoute
