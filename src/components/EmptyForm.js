import React from 'react';

export default function EmptyForm(props){
	return(
			<>
				<h3 className="mt-3" style={{textAlign: 'center'}}>Your {props.form} are empty</h3>
			</>
		)
}