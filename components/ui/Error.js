import React from 'react'
import { Text } from 'native-base'

const Error = ({txt}) => {
    return ( 
        <Text style={globalStylesTwo.txtError}>{txt}</Text>
    )
}
 
export default Error