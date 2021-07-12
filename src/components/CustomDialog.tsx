import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {Grid, TextField} from "@material-ui/core";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

interface ICustomDialogProps {
    saveTask: () => void,
    handleInputTextFieldOnBlur: (value: string) => void,
    setInputDatePickerDialogValue: (value: string) => void,
    isDialogOpen: boolean,
    handleDialogToggle: () => void
}


const CustomDialog = (props: ICustomDialogProps) => {

    return (
            <Dialog onClose={()=>{}} aria-labelledby="customized-dialog-title" open={props.isDialogOpen}>
                <DialogTitle id="customized-dialog-title" onClose={props.handleDialogToggle}>
                    Add ToDo item:
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container alignItems={'center'}>
                    <Grid item sm={12}>
                    <TextField label="Name of task: " onBlur={(event)=>props.handleInputTextFieldOnBlur(event.target.value)} style={{marginBottom: 20}}/>
                    </Grid>
                    <Grid item sm={12}>
                    <TextField
                        id="datetime-local"
                        label="Due date"
                        type="datetime-local"
                        defaultValue={""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onBlur={event => props.setInputDatePickerDialogValue(event.target.value)}
                    />
                    </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.saveTask} color="primary">
                        Insert task
                    </Button>
                </DialogActions>
            </Dialog>
    );
};

export default CustomDialog