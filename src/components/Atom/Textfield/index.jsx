import React from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = ({ label, ...props }) => {
    return <TextField label={label} {...props} />;
};

export default CustomTextField;
