import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useState, useEffect} from 'react'
import axios from 'axios';

export default function ActivityManager(){
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [employmentNo, setEmploymentNo] = useState("")
  const [res, setRes] = useState([])

  const handleFirstNameChange = (event)=>{
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event)=>{
    setLastName(event.target.value)
  }

  const handleEmploymentNo = (event)=>{
    setEmploymentNo(event.target.value)
  }

  function saveManager(){
   
    const data = {
      levelName: 'seniorManagers',
      levelPosition: '1',
      firstName: firstName,
      lastName: lastName,
      employmentNo: employmentNo
    }
    axios.post('http://127.0.0.1:8000/api/organogram/', data)
    .then(response =>{
      console.log(setRes(response.data))
    })
    .catch(error =>{
      console.error(error)
    });

  }
    return (
        <div className="activity-container" >
          <div>
            <h3>Add Manager</h3>
            <TextField name='text_first_name' value={firstName} onChange={handleFirstNameChange} className="new-manager" id="filled-basic" label="First Name" variant="filled" />
            <TextField name='text_last_name' value={lastName} onChange={handleLastNameChange} className="new-manager" id="filled-basic" label="Last Name" variant="filled" />
            <TextField name='text_employment_no'  value={employmentNo} onChange={handleEmploymentNo} className="new-manager" id="filled-basic" label="Employment No." variant="filled" />
            <Button onClick={saveManager} className="btn-add" variant="contained">Save</Button>
            <br />
            <br />
            <Divider />
          </div>
          <div>
            <br />
            <h3>Employee Information</h3>
            <TextField className="new-manager" id="filled-basic" label="First Name" variant="filled" />
            <TextField className="new-manager" id="filled-basic" label="Last Name" variant="filled" />
            <ButtonGroup className="group-button-container" variant="contained" aria-label="outlined primary button group">
                <Button className="btn-group" variant="contained">Update</Button>
                <Button className="btn-update btn--margin" variant="contained">Remove Employee</Button>
            </ButtonGroup>
          </div>
          <div>
            <br />
            <br />
            <Divider />
            <br />
            <h3>New Employee</h3>
            <TextField className="new-manager" id="filled-basic" label="First Name" variant="filled" />
            <TextField className="new-manager" id="filled-basic" label="Last Name" variant="filled" />
            <TextField className="new-manager" id="filled-basic" label="Employment No." variant="filled" />
            <ButtonGroup className="group-button-container" variant="contained" aria-label="outlined primary button group">
                <Button className="btn-group" variant="contained">Update</Button>
                <Button className="btn-update btn--margin" variant="contained">Remove Employee</Button>
            </ButtonGroup>
          </div>
        </div>
    )
}