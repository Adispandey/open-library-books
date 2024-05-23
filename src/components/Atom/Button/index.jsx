import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ sx,children, onClick, variant = 'contained', ...props}) => {
    return (
        <Button onClick={onClick} variant={variant} {...props} sx={sx}>
            {children}
        </Button>
    );
};

export default CustomButton;
