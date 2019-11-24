import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from "@material-ui/core/Typography";
import './Spinner.css';

export default function CircularUnderLoad() {
    return (
        <div className="spinner">
            <CircularProgress disableShrink color="secondary" />
            <br />
            <br />
            <Typography variant="body1" align="center" color="secondary">
                loading...
            </Typography>
        </div>);
}