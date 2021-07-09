import './App.css';
import Header from "./components/Header";
import data from "./data.json";
import React, {useState} from "react";
import {
    Backdrop, Button,
    createStyles, Dialog, DialogContent, DialogTitle,
    Grid, IconButton,
    makeStyles,
    TableBody,
    TableCell,
    TableHead,
    TableRow, TextField,
    Theme, Typography,
    withStyles
} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import Table from '@material-ui/core/Table';
import {green} from "@material-ui/core/colors";
import StyledTableRow from "./components/tableComponents/StyledTableRow"
import CustomDialog from "./components/CustomDialog";

export interface IDataObject {
    id: number,
    task: string,
    complete: boolean,
    endDate?: string
}

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            fontSize: 20
        },
    }),
)(TableCell);

function App() {

    //TODO: Add an ability to create a due date for each task. The end user should be able to pick or enter a date for each todo item. Show off your design skill to make it easy and intuitive for user to use your app

    const [toDoList, setToDoList] = useState<Array<IDataObject>>(data);
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const [inputTextFieldValue, setInputTextFieldValue] = useState<string>("");
    const [inputDatePickerDialogValue, setInputDatePickerDialogValue] = useState<string>("");

    const removeCompletedElements = () =>{
      const currentStatus = [...toDoList];
      const filteredStatus = currentStatus.filter(element => {return !element.complete});
      setToDoList(filteredStatus)
    };

    const toggleStatus = (elementId: number) =>{
        const currentStatus = [...toDoList];
        const selectedElement = currentStatus.find(element => element.id === elementId);
        if (selectedElement){
            selectedElement.complete = !selectedElement.complete
        }
        setToDoList(currentStatus);
    };

    const handleDialogToggle = () => {
        setInputTextFieldValue("");
        setInputDatePickerDialogValue("");
      setDialogOpen(!isDialogOpen)
    };

    const handleInputTextFieldOnBlur = (value: string) => {
        setInputTextFieldValue(value)
    };

    const saveTask = () => {
        const currentState = [...toDoList];
        const createdTask = {
            id: currentState.length + 2,
            task: inputTextFieldValue ? inputTextFieldValue : "Undefined Task",
            complete: false,
            endDate: inputDatePickerDialogValue
        };
        currentState.push(createdTask);
        setToDoList(currentState);
        handleDialogToggle()
    };

    const handleDateChange = (elementId: number, endDate: string) => {
      const currentState = [...toDoList];
      const selectedItem = currentState.find(element => element.id === elementId);
      if (selectedItem)
      selectedItem.endDate = endDate;
      setToDoList(currentState)
    };

    return (
        <div className="App">
            <CustomDialog
                saveTask={saveTask}
                handleInputTextFieldOnBlur={handleInputTextFieldOnBlur}
                setInputDatePickerDialogValue={setInputDatePickerDialogValue}
                isDialogOpen={isDialogOpen}
                handleDialogToggle={handleDialogToggle}
            />
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid item sm={2}/>
                <Grid item sm={8} xs={12}>
                    <Header/>
                </Grid>
                <Grid item sm={2}/>
                <Grid item sm={2}/>
                <Grid item sm={4} xs={12} alignItems={'center'}>
                    <IconButton onClick={handleDialogToggle}>
                        <Typography>ADD ELEMENT</Typography>
                        <AddCircleIcon fontSize={"large"} style={{color: green[500]}}/>
                    </IconButton>
                </Grid>
                <Grid item sm={4} xs={12} alignItems={'center'}>
                    <IconButton onClick={removeCompletedElements}>
                        <Typography>FILTER OUT COMPLETED</Typography>
                        <RemoveCircleIcon fontSize={"large"} color={'secondary'}/>
                    </IconButton>
                </Grid>
                <Grid item sm={2}/>
                <Grid item sm={8} xs={12}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align={"center"}>TODO LIST</StyledTableCell>
                                <StyledTableCell align={"center"}>DUE DATE</StyledTableCell>
                                <StyledTableCell align={"center"}>STATUS</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {toDoList.map(element =>
                            <StyledTableRow element={element} toggleStatus={toggleStatus} handleDateChange={handleDateChange}/>)}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;