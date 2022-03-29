import TextField from '@mui/material/TextField';
import React, { Fragment } from 'react';

type UserInputProps = {
    directionType: 'from' | 'to';
}

const UserInput: React.FC<UserInputProps> = ({
    directionType
}) => {
    return <Fragment>
        <TextField id="standard-basic" variant="standard" />
    </Fragment>;
};

export default UserInput;


    // const supportedCodesUrl =
    //     'https://v6.exchangerate-api.com/v6/f85e1ab717a788b92e1bf176/codes';


        //     axios
        //         .get<SupportedCodesResponse>(supportedCodesUrl)
        //         .then((response) => {
        //             if(response.data.result === 'success'){
        //                 setSupportedCodes(response.data.supported_codes);
        //             }
        //         });