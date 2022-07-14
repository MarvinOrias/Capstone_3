import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

export default function ProtectedRoute({auth: auth, component: Component, ...rest}){
	return(
			
				<Routes>
					<Route {...rest} 
					render={(props) => {
						if(auth){
							return(<Component {...props} />)
						}
						else{
							return(<Navigate to={{pathname: "/", state: {from: props.location}}} />)
						}
					}}
					/>
				</Routes>
			
		)
}