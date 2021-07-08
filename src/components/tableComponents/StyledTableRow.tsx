import React, {ReactNode} from "react";
import {
    createStyles,
    IconButton,
    TableCell,
    TableRow,
    TextField,
    Theme,
    Typography,
    withStyles
} from "@material-ui/core";
import {IDataObject} from "../../App";
import EditIcon from "@material-ui/icons/Edit"
import ErrorIcon from "@material-ui/icons/Error"
import CheckIcon from "@material-ui/icons/Check"
import {green} from "@material-ui/core/colors";
import RemoveCircleIcon from "@material-ui/core/SvgIcon/SvgIcon";

interface IStyledTableRowProps {
    element: IDataObject,
    toggleStatus: (data: number) => void
    handleDateChange: (elementId: number, payload: string) => void
}

const StyledTableRow = (props: IStyledTableRowProps) => {
    const StyledTitleTableCell = withStyles((theme: Theme) =>
        createStyles({
            body: {
                fontSize: 20,
            },
        }),
    )(TableCell);

    const StyledTableCell = withStyles((theme: Theme) =>
        createStyles({
            body: {
                backgroundColor: props.element.complete ? theme.palette.success.light : theme.palette.error.light
            },
        }),
    )(TableCell);

    return (
       <TableRow key={props.element.id} hover={true}>
           <StyledTitleTableCell align={"center"}>{props.element.task}</StyledTitleTableCell>
           <StyledTitleTableCell align={"right"}>
               <TextField
                   id="datetime-local"
                   label="Due date"
                   type="datetime-local"
                   defaultValue={props.element.endDate}
                   InputLabelProps={{
                       shrink: true,
                   }}
                   onBlur={event => props.handleDateChange(props.element.id, event.target.value)}
               />
           </StyledTitleTableCell>
           <TableCell align={"center"}>
               <IconButton onClick={()=>props.toggleStatus(props.element.id)}>
                       <Typography style={{marginRight: 20}}>
                    {props.element.complete? "COMPLETED" : "INCOMPLETED"}
                       </Typography>
                   {props.element.complete? <CheckIcon style={{color: green[500]}}/> : <ErrorIcon  color={'secondary'}/>}
               </IconButton>
           </TableCell>
       </TableRow>
    )
};

export default StyledTableRow