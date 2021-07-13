import './App.css';
import data from "./data.json";
import React, {useState} from "react";
import {
    Grid, IconButton,
    TableBody,
    TableCell,
    TableHead,
    TableRow, TextField,
    Typography,
} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import Table from '@material-ui/core/Table';
import {green} from "@material-ui/core/colors";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/Error"
import MuiDialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";

interface IDataObject {
    id: number,
    task: string,
    complete: boolean,
    endDate?: string
}

export interface ITodoListObject {
    key: number,
    id: number,
    task: string,
    complete: boolean,
    endDate?: string
}

const generateKeysForList = (data: Array<IDataObject>) :Array<ITodoListObject> => {
    const toDoList = new Array<ITodoListObject>();
    data.forEach(element => toDoList.push({key: element.id, id: element.id, task: element.task, complete: element.complete, endDate: element.endDate}));
    return toDoList;
};

function App() {

    //TODO: Add an ability to create a due date for each task. The end user should be able to pick or enter a date for each todo item. Show off your design skill to make it easy and intuitive for user to use your app

    const [toDoList, setToDoList] = useState<Array<ITodoListObject>>(generateKeysForList(data));
    const [filteredList, setFilteredList] = useState<Array<ITodoListObject>>([]);
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const [inputTextFieldValue, setInputTextFieldValue] = useState<string>("");
    const [inputDatePickerDialogValue, setInputDatePickerDialogValue] = useState<string>("");

    const removeCompletedElements = (currentState: Array<ITodoListObject>) =>{
      const currentStatus = [...currentState];
      const filteredStatus = currentStatus.filter(element => {return !element.complete});
      setFilteredList(filteredStatus)
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
            key: currentState.length + 2,
            id: currentState.length + 2,
            task: inputTextFieldValue ? inputTextFieldValue : "Undefined Task",
            complete: false,
            endDate: inputDatePickerDialogValue
        };
        currentState.push(createdTask);
        setToDoList(currentState);
        filteredList.length && removeCompletedElements(currentState);
        handleDialogToggle()
    };

    const handleDateChange = (elementId: number, endDate: string) => {
      const currentState = [...toDoList];
      const selectedItem = currentState.find(element => element.id === elementId);
      if (selectedItem)
      selectedItem.endDate = endDate;
      setToDoList(currentState)
    };

    const generateTableRow = (element: ITodoListObject) => {
        return(
        <TableRow id={'table-row-body'} key={element.id} hover={true}>
            <TableCell id={"table-cell-task-name"} align={"center"} style={{fontSize: 20}}>{element.task}</TableCell>
            <TableCell align={"center"}>
                <TextField
                    style={{fontSize: 20}}
                    id="datetime-local"
                    label="Due date"
                    type="datetime-local"
                    defaultValue={element.endDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onBlur={event => handleDateChange(element.id, event.target.value)}
                />
            </TableCell>
            <TableCell align={"center"}>
                <IconButton id={"change-status-button"} onClick={()=>toggleStatus(element.id)}>
                    <Typography style={{marginRight: 20, fontSize: 20}}>
                        {element.complete? "COMPLETED" : "INCOMPLETED"}
                    </Typography>
                    {element.complete? <CheckIcon style={{color: green[500]}} fontSize={"large"}/> : <ErrorIcon  color={'secondary'} fontSize={"large"}/>}
                </IconButton>
            </TableCell>
        </TableRow>
        )
    };

    return (
        <div className="App">
            <Dialog id={"add-task-dialog"} onClose={()=>{}} aria-labelledby="customized-dialog-title" open={isDialogOpen}>
                <MuiDialogTitle disableTypography style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography id={"customized-dialog-title"} variant="h6" style={{paddingTop: 12, fontSize:20}}>Add ToDo item:</Typography>
                    <IconButton id={"dialog-close-button"} aria-label="close" onClick={handleDialogToggle}>
                        <CloseIcon />
                    </IconButton>
                </MuiDialogTitle>
                <MuiDialogContent dividers>
                    <TextField id={'task-name-text-field'} label="Name of task: " onBlur={(event)=>handleInputTextFieldOnBlur(event.target.value)}
                               style={{fontSize: "auto", position: "absolute", width: 300}}/>
                    <TextField
                        style={{position: "relative", marginTop: 80, width: 300}}
                        id="datetime-local-dialog"
                        label="Due date"
                        type="datetime-local"
                        defaultValue={""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onBlur={event => setInputDatePickerDialogValue(event.target.value)}
                    />
                </MuiDialogContent>
                <MuiDialogActions>
                    <Button id={'save-task-button'} onClick={saveTask} color="primary">
                        Insert task
                    </Button>
                </MuiDialogActions>
            </Dialog>
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid item sm={2}/>
                <Grid item sm={8} xs={12}>
                    <Typography id={"app-title"} variant={"h2"} component={"h3"}>
                        TO DO LIST
                    </Typography>
                </Grid>
                <Grid item sm={2}/>
                <Grid container alignItems={'center'}>
                <Grid item sm={2}/>
                <Grid item sm={4} xs={12}>
                    <IconButton id={'add-button'} onClick={handleDialogToggle}>
                        <Typography className={'Icon-button-text'}>ADD ELEMENT</Typography>
                        <AddCircleIcon fontSize={"large"} style={{color: green[500]}}/>
                    </IconButton>
                </Grid>
                <Grid item sm={4} xs={12} >
                    <IconButton id={'remove-button'} onClick={() => removeCompletedElements(toDoList)}>
                        <Typography className={'Icon-button-text'}>FILTER OUT COMPLETED</Typography>
                        <RemoveCircleIcon fontSize={"large"} color={'secondary'}/>
                    </IconButton>
                </Grid>
                <Grid item sm={2}/>
                </Grid>
                <Grid item sm={8} xs={12}>
                    <Table>
                        <TableHead>
                            <TableRow id={'table-row-head'} className={'Table-row-head'}>
                                <TableCell className={'Table-cell-head'} align={"center"}>TODO LIST</TableCell>
                                <TableCell className={'Table-cell-head'} align={"center"}>DUE DATE</TableCell>
                                <TableCell className={'Table-cell-head'}align={"center"}>STATUS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredList.length ? filteredList.map(element => generateTableRow(element)) : toDoList.map(element =>
                            generateTableRow(element))}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;