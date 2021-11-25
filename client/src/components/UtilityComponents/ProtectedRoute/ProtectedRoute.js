import React, { useContext, useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthContext from '../../context/AuthContext'
import { checkToken } from '../../Utilities/functions'

const ProtectedRoute = ({component: Component, ...rest}) => {

    const authorize = useContext(AuthContext)

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        console.log('Ini UseEffect')

        const authentication = async () => {
            const response = await isAuthenticated();

            console.log({response});

            setAuthenticated(response);
        }
        
        authentication();
    })

    const isAuthenticated = async () => {
        try{
			const response = await checkToken()
            console.log(response)
			if(!response.data.status){
                console.log("The token is invalid")
				return false
			}else{
                return true
            }
		}	
		catch(err){
			// console.log(err.message)
            // console.log("here")
            console.log("loiasjdfiljsda;f;klj")
            console.log(err.message)
            return false
		}
    }

    return (
        <Route
            {...rest}
            exact
            render = { () =>  {
                // console.log(aisAuthenticated())
                // const result = isAuthenticated();

                console.log({authenticated})

                return(
                        authenticated ? 
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
