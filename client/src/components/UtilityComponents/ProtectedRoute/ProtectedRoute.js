import React, { useContext, useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthContext from '../../context/AuthContext'
import { checkToken } from '../../Utilities/functions'

const ProtectedRoute = ({component: Component, ...rest}) => {

    const authorize = useContext(AuthContext)

    const isAuthenticated = () => {
        try{
			const response = checkToken()
            console.log(response)
			if(!response.data.status){
                console.log("The token is invalid")
				return false
			}else{
                return true
            }
		}	
		catch(err){
            console.log(err.message)
            return false
		}
    }

    return (
        <Route
            {...rest}
            exact
            render = { () =>  {
                const result = isAuthenticated();

                return(
                    result ? 
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
