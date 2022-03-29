import TextField from '@mui/material/TextField';
import React, { Fragment } from 'react';

type UserInputProps = {
    directionType: 'from' | 'to';
};

const UserInput: React.FC<UserInputProps> = ({ directionType }) => {
    return (
        <Fragment>
            <TextField
                sx={{ mt: 2, width: '100%' }}
                id="standard-basic"
                variant="standard"
                type="number"
                inputProps={{style: {fontSize: 30, fontWeight: 600}}}
                disabled={(directionType == 'to')}
            />
        </Fragment>
    );
};

export default UserInput;
