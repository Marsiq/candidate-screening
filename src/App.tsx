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

const generateKeysForList = (data: Array<IDataObject>): Array<ITodoListObject> => {
  const toDoList = new Array<ITodoListObject>();
  data.forEach(element => toDoList.push({
    key: element.id,
    id: element.id,
    task: element.task,
    complete: element.complete,
    endDate: element.endDate
  }));
  return toDoList;
};

function App() {

  const [toDoList, setToDoList] = useState<Array<ITodoListObject>>(generateKeysForList(data));
  const [filteredList, setFilteredList] = useState<Array<ITodoListObject>>([]);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [inputTextFieldValue, setInputTextFieldValue] = useState<string>("");
  const [inputDatePickerDialogValue, setInputDatePickerDialogValue] = useState<string>("");

  const removeCompletedElements = (currentState: Array<ITodoListObject>) => {
    const currentStatus = [...currentState];
    const filteredStatus = currentStatus.filter(element => {
      return !element.complete
    });
    setFilteredList(filteredStatus)
  };

  const toggleStatus = (elementId: number) => {
    const currentStatus = [...toDoList];
    const selectedElement = currentStatus.find(element => element.id === elementId);
    if (selectedElement) {
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
    return (
        <TableRow id={'table-row-body'} key={element.id} hover={true}>
          <TableCell id={"table-cell-task-name"} align={"center"}
                     className={"table-cell__text"} style={{textShadow: element.complete? "1px 1px #00B140" : "1px 1px #EF3340"}}>{element.task}</TableCell>
          <TableCell align={"center"}>
            <TextField
                className={"table-cell__text"}
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
            <IconButton id={"change-status-button"} onClick={() => toggleStatus(element.id)}>
              <Typography className={"status-button__text"}>
                {element.complete ? "COMPLETED" : "INCOMPLETED"}
              </Typography>
              {element.complete ? <CheckIcon className={'add-button__icon'} fontSize={"large"}/> :
                  <ErrorIcon color={'secondary'} fontSize={"large"}/>}
            </IconButton>
          </TableCell>
        </TableRow>
    )
  };

  return (
      <div className="App">
        <Dialog id={"add-task-dialog"} onClose={() => {
        }} aria-labelledby="customized-dialog-title" open={isDialogOpen}>
          <MuiDialogTitle disableTypography
                          className={'dialog__title'}>
            <Typography id={"customized-dialog-title"} variant="h6"
                        className={'dialog__title__text'}>Add ToDo item:</Typography>
            <IconButton id={"dialog-close-button"} aria-label="close" onClick={handleDialogToggle}>
              <CloseIcon/>
            </IconButton>
          </MuiDialogTitle>
          <MuiDialogContent dividers>
            <TextField id={'task-name-text-field'} label="Name of task: "
                       onBlur={(event) => handleInputTextFieldOnBlur(event.target.value)}
                       style={{position: "absolute", width: 300}}/>
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
          <Grid item md={8} sm={12} xs={12} className={'title__background'}>
            <Typography id={"app-title"} variant={"h3"} component={"h3"} className={'title__text'}>
              TO DO LIST
            </Typography>
          </Grid>
          <Grid container alignItems={'center'}>
            <Grid item md={2}/>
            <Grid item md={4} sm={6} xs={12}>
              <IconButton id={'add-button'} onClick={handleDialogToggle} className={"icon-button"}>
                <Typography className={'icon-button__text'}>ADD ELEMENT</Typography>
                <AddCircleIcon fontSize={"large"} className={'add-button__icon'}/>
              </IconButton>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <IconButton id={'remove-button'} onClick={() => removeCompletedElements(toDoList)} className={"icon-button"}>
                <Typography className={'icon-button__text'}>FILTER OUT COMPLETED</Typography>
                <RemoveCircleIcon fontSize={"large"} className={'remove-button__icon'}/>
              </IconButton>
            </Grid>
            <Grid item md={2}/>
          </Grid>
          <Grid item md={8} sm={12} xs={12}>
            <Table id={'task-table'}>
              <TableHead>
                <TableRow id={'table-row-head'} className={'table-head__table-row'}>
                  <TableCell className={'table-head__table-cell'} align={"center"}>
                    Task name
                  </TableCell>
                  <TableCell className={'table-head__table-cell'} align={"center"}>
                    Due date
                  </TableCell>
                  <TableCell className={'table-head__table-cell'}
                             align={"center"}>
                    Status
                  </TableCell>
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