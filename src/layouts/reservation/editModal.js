import { useEffect, useState, forwardRef, useRef } from "react";
import { baseURL } from "../../config"
import axios from "axios";
import Modal from '@mui/material/Modal';
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
};


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={4} ref={ref} variant="filled" {...props} />;
});

export default function BasicModal(props) {
  const [openAlert, setOpenAlert] = useState(false);
  const [open, setOpen] = useState(false);

  const [babyId, setBabyId] = useState('');
  const [babyIdFlag, setBabyIdFlag] = useState(false);
  const [reservationDate, setReservationDate] = useState('');
  //const [reservationDateFlag, setReservationDateFlag] = useState(false);
  const [reservationFirstName, setReservationFirstName] = useState('');
  const [reservationFirstNameFlag, setReservationFirstNameFlag] = useState(false);
  const [reservationLastName, setReservationLastName] = useState('');
  const [reservationLastNameFlag, setReservationLastNameFlag] = useState(false);
  const [reservationEmail, setReservationEmail] = useState('');
  const [reservationEmailFlag, setReservationEmailFlag] = useState(false);
  const [reservationPhone, setReservationPhone] = useState('');
  const [reservationPhoneFlag, setReservationPhoneFlag] = useState(false);
  const [reservationLocation, setReservationLocation] = useState('');
  const [reservationLocationFlag, setReservationLocationFlag] = useState(false);
  const [domainId, setDomainId] = useState('');
  //const [domainIdFlag, setDomainIdFlag] = useState(false);
  const [reservationPaymentStatus, setReservationPaymentStatus] = useState('completed');
  const [city, setCity] = useState('');
  const [cityFlag, setCityFlag] = useState(false);

  const [severity, setSeverity] = useState("success")
  const [message, setMessage] = useState("")

  const [babies, setBabies] = useState([])
  const [babyName, setBabyName] = useState("")
  const [domains, setDomains] = useState([])
  const [domainName, setDomainName] = useState("")

  const handleClose = () => {
    props.handleClose();
  }

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    axios.get(`${baseURL}/api/babies/`).then(response => {
      if (response.data.success === true) {
        setBabies(response.data.entities);
      }
    })
    axios.get(`${baseURL}/api/domains/`).then(response => {
      if (response.data.success === true) {
        setDomains(response.data.entities);
      }
    })

    if (props.open === true && props.isAdd === false && props.id !== '') {
      axios.get(`${baseURL}/api/reservations/${props.id}`).then(response => {
        if (response.data.success === true) {
          setBabyId(response.data.reservation.babyId._id);
          setBabyName(response.data.reservation.babyId.babyName);
          setReservationDate(response.data.reservation.reservationDate);
          setReservationFirstName(response.data.reservation.reservationFirstName);
          setReservationLastName(response.data.reservation.reservationLastName);
          setReservationEmail(response.data.reservation.reservationEmail);
          setReservationPhone(response.data.reservation.reservationPhone);
          setReservationLocation(response.data.reservation.reservationLocation);
          setDomainId(response.data.reservation.domainId)
          setReservationPaymentStatus(response.data.reservation.reservationPaymentStatus);
          setCity(response.data.reservation.city);
          //setBreederPhoto(`${baseURL}/`+response.data.reservation.breederPhoto);
        }
      })
    }
    else {
      setBabyId('');
      setBabyName('');
      setReservationDate('');
      setReservationFirstName('');
      setReservationLastName('');
      setReservationEmail('');
      setReservationPhone('');
      setReservationLocation('');
      setDomainId('')
      setReservationPaymentStatus('');
      setCity('');
    }
    setOpen(props.open)
  }, [props.open])


  const saveData = () => {
    let flag = true;
    if (babyId === '') {
      flag = false;
      setBabyIdFlag(true)
    }
    if (reservationDate === '') {
      flag = false;
      setReservationDateFlag(true)
    }
    if (reservationFirstName === '') {
      flag = false;
      setReservationFirstNameFlag(true)
    }
    if (reservationLastName === '') {
      flag = false;
      setReservationLastNameFlag(true)
    }
    if (reservationEmail === '') {
      flag = false;
      setReservationEmailFlag(true)
    }
    if (reservationPhone === '') {
      flag = false;
      setReservationPhoneFlag(true)
    }
    if (reservationLocation === '') {
      flag = false;
      setReservationLocationFlag(true)
    }
    if (domainId === '') {
      flag = false;
      setDomainIdFlag(true)
    }
    if (reservationPaymentStatus === '') {
      flag = false;
      setReservationPaymentStatus(true)
    }
    if (!flag) {
      return;
    }
    if (props.isAdd === false && props.id !== '') {
      new Promise(resolve => {
        // const item = {
        //   breederId: props.id,
        //   reservationFirstName: reservationFirstName,
        //   babyId: babyId,
        //   reservationPaymentStatus: reservationPaymentStatus,
        //   reservationDate: reservationDate,
        //   breederDesc: breederDesc,
        //   breederPhoto: breederPhoto,
        // }
        const formData = new FormData();
        formData.append("reservationId", props.id);
        formData.append("babyId", babyId);
        formData.append("reservationDate", reservationDate);
        formData.append("reservationFirstName", reservationFirstName);
        formData.append("reservationLastName", reservationLastName);
        formData.append("reservationEmail", reservationEmail);
        formData.append("reservationPhone", reservationEmail);
        formData.append("reservationLocation", reservationEmail);
        formData.append("domainId", domainId);
        formData.append("reservationPaymentStatus", reservationPaymentStatus);
        formData.append("city", city);

        axios.put(`${baseURL}/api/reservations/`, formData).then(response => {
          if (response.data.success === true) {
            resolve();
            props.editSelectedItem(response.data.reservation);
            handleClose()
            setOpenAlert(true)
            setMessage("Successfully updated!")
            setSeverity("success")
          }
        }).catch(err => {
          console.log(err)
          resolve();
          setOpenAlert(true)
          setMessage("Operation failed!")
          setSeverity("error")
        })
      })
    } else {
      new Promise(resolve => {

        const formData = new FormData();
        formData.append("babyId", babyId);
        formData.append("reservationDate", reservationDate);
        formData.append("reservationFirstName", reservationFirstName);
        formData.append("reservationLastName", reservationLastName);
        formData.append("reservationEmail", reservationEmail);
        formData.append("reservationPhone", reservationEmail);
        formData.append("reservationLocation", reservationEmail);
        formData.append("domainId", domainId);
        formData.append("reservationPaymentStatus", reservationPaymentStatus);
        formData.append("city", city);

        axios.post(`${baseURL}/api/reservations/`, formData).then(response => {
          if (response.data.success === true) {
            resolve();
            props.addNewRow(response.data.reservation);
            handleClose()
            setOpenAlert(true)
            setMessage("Successfully Saved!")
            setSeverity("success")
          }
        }).catch(err => {
          resolve();
          setOpenAlert(true)
          setMessage("Operation failed!")
          setSeverity("error")
        })
      })
    }
  }
  const onChangeFirstName = (event) => {
    setReservationFirstNameFlag(false)
    setReservationFirstName(event.target.value)
    if (reservationFirstName === '') {
      setReservationFirstNameFlag(true)
    }
  }
  const onChangeLastName = (event) => {
    setReservationLastNameFlag(false)
    setReservationLastName(event.target.value)
    if (reservationLastName === '') {
      setReservationLastNameFlag(true)
    }
  }
  const onChangeEmail = (event) => {
    setReservationEmailFlag(false)
    setReservationEmail(event.target.value)
    if (reservationEmail === '') {
      setReservationEmailFlag(true)
    }
  }
  const onChangePhone = (event) => {
    setReservationPhoneFlag(false)
    setReservationPhone(event.target.value)
    if (reservationPhone === '') {
      setReservationPhoneFlag(true)
    }
  }
  const onChangeLocation = (event) => {
    setReservationLocationFlag(false)
    setReservationLocation(event.target.value)
    if (reservationLocation === '') {
      setReservationLocationFlag(true)
    }
  }
  const onChangeReservationDate = (value) => {
    setReservationDateFlag(false)
    setReservationDate(value)
    if (reservationDate === '') {
      setReservationDateFlag(true)
    }
  }
  const onChangeCity = (event) => {
    setCityFlag(false)
    setCity(event.target.value)
    if (city === '') {
      setCityFlag(true)
    }
  }
  const onChangeBabyId = (event) => {
    setBabyIdFlag(false)
    setBabyName(event.target.value)
    setBabyId(event.target.value)
    if (event.target.value) {
      setBabyIdFlag(true)
    }
  }
  const onChangeDomainId = (event) => {
    setDomainIdFlag(false)
    setDomainName(event.target.value)
    setDomainId(event.target.value)
    if (event.target.value) {
      setDomainIdFlag(true)
    }
  }

  const radioHandleChange = (event) => {
    setReservationPaymentStatus(event.target.value);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              New Reservation
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">BabyId</InputLabel>
                  <Select
                    error={babyIdFlag}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={babyName}
                    sx={{ height: "3rem" }}
                    label="BabyId"
                    onChange={onChangeBabyId}
                  >
                    {babies.map((item, index) => (
                      <MenuItem key={index} value={item._id}>{item.babyName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="ReservationDate"
                    value={reservationDate}
                    onChange={onChangeReservationDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </MDBox>
              <MDBox mb={2}>
                <TextField
                  error={reservationFirstNameFlag}
                  id="outlined-multiline-static"
                  label="FirstName"
                  value={reservationFirstName}
                  onChange={onChangeFirstName}
                  helperText=""
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <TextField
                  error={reservationLastNameFlag}
                  id="outlined-multiline-static"
                  label="LastName"
                  value={reservationLastName}
                  onChange={onChangeLastName}
                  helperText=""
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <TextField
                  error={reservationEmailFlag}
                  id="outlined-multiline-static"
                  label="Email"
                  value={reservationEmail}
                  onChange={onChangeEmail}
                  helperText=""
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <TextField
                  error={reservationPhoneFlag}
                  id="outlined-multiline-static"
                  label="Phone"
                  value={reservationPhone}
                  onChange={onChangePhone}
                  helperText=""
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <TextField
                  error={reservationLocationFlag}
                  id="outlined-multiline-static"
                  label="Location"
                  value={reservationLocation}
                  onChange={onChangeLocation}
                  helperText=""
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Domain</InputLabel>
                  <Select
                    error={babyIdFlag}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={domainName}
                    sx={{ height: "3rem" }}
                    label="Domain"
                    onChange={onChangeDomainId}
                  >
                    {domains.map((item, index) => (
                      <MenuItem key={index} value={item._id}>{item.domainName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={2}>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">PaymentStatus</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={reservationPaymentStatus}
                    onChange={radioHandleChange}
                  >
                    <FormControlLabel value="completed" control={<Radio />} label="Completed" />
                    <FormControlLabel value="error" control={<Radio />} label="Error" />
                  </RadioGroup>
                </FormControl>
              </MDBox>
              <MDBox mb={2}>
                <TextField
                  error={cityFlag}
                  id="outlined-multiline-static"
                  label="City"
                  value={city}
                  onChange={onChangeCity}
                  helperText=""
                  fullWidth
                />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton onClick={saveData} variant="gradient" color="info" fullWidth>
                  Save
                </MDButton>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton onClick={handleClose} variant="gradient" color="white" fullWidth>
                  Cancel
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </Modal>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleAlertClose}>
          <Alert onClose={handleAlertClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
