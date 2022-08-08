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

import DefaultImage from "../../assets/images/default.png";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.paper',
  boxShadow: 24,
};


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={4} ref={ref} variant="filled" {...props} />;
});

export default function BasicModal(props) {
  const [openAlert, setOpenAlert] = useState(false);
  const [open, setOpen] = useState(false);

  const [babyName, setBabyName] = useState('');
  const [babyNameFlag, setBabyNameFlag] = useState(false);
  const [literId, setLiterId] = useState('');
  const [literIdFlag, setLiterIdFlag] = useState(false);
  const [babyGender, setBabyGender] = useState('female');
  const [literDOB, setLiterDOB] = useState('');
  const [literDOBFlag, setLiterDOBFlag] = useState(false);
  const [petDescriptionId, setPetDescriptionId] = useState('');
  const [petDescriptionIdFlag, setPetDescriptionIdFlag] = useState(false);
  const [babyPic1, setBabyPic1] = useState(null);
  const [babyPic2, setBabyPic2] = useState(null);
  const [babyPic3, setBabyPic3] = useState(null);
  const [babyPic4, setBabyPic4] = useState(null);
  const [babyPic5, setBabyPic5] = useState(null);
  const [babyPic6, setBabyPic6] = useState(null);
  const [babyPic1Flag, setBabyPic1Flag] = useState(false);
  const [babyPrice, setBabyPrice] = useState(0)
  const [babyPriceFlag, setBabyPriceFlage] = useState(false)
  const [babyStatus, setBabyStatus] = useState('Avaliable')
  const [babyStatusFlag, setBabyStatusFlag] = useState(false)

  const [severity, setSeverity] = useState("success")
  const [message, setMessage] = useState("")

  const [literIds, setLiterIds] = useState([])
  const [literIdName, setLiterIdName] = useState("")
  const [petDescriptions, setPetDescriptions] = useState([])
  const [file1, setFile1] = useState()
  const [file2, setFile2] = useState()
  const [file3, setFile3] = useState()
  const [file4, setFile4] = useState()
  const [file5, setFile5] = useState()
  const [file6, setFile6] = useState()

  const imageFileRef1 = useRef();
  const imageFileRef2 = useRef();
  const imageFileRef3 = useRef();
  const imageFileRef4 = useRef();
  const imageFileRef5 = useRef();
  const imageFileRef6 = useRef();

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
    axios.get(`${baseURL}/api/liters/`).then(response => {
      if (response.data.success === true) {
        setLiterIds(response.data.entities);
      }
    })
    axios.get(`${baseURL}/api/petDescriptions/`).then(response => {
      if (response.data.success === true) {
        setPetDescriptions(response.data.entities);
      }
    })

    if (props.open === true && props.isAdd === false && props.id !== '') {
      axios.get(`${baseURL}/api/babies/${props.id}`).then(response => {
        if (response.data.success === true) {
          setBabyName(response.data.baby.babyName);
          setLiterId(response.data.baby.literId);
          //setLiterIdName(response.data.baby.petTypeId._id);
          setBabyGender(response.data.baby.babyGender);
          setLiterDOB(response.data.baby.literDOB);
          setPetDescriptionId(response.data.baby.petDescriptionId);
          if (response.data.baby.babyPic1 !== '')
            setBabyPic1(`${baseURL}/` + response.data.baby.babyPic1);
          if (response.data.baby.babyPic2 !== '')
            setBabyPic2(`${baseURL}/` + response.data.baby.babyPic2);
          if (response.data.baby.babyPic3 !== '')
            setBabyPic3(`${baseURL}/` + response.data.baby.babyPic3);
          if (response.data.baby.babyPic4 !== '')
            setBabyPic4(`${baseURL}/` + response.data.baby.babyPic4);
          if (response.data.baby.babyPic5 !== '')
            setBabyPic5(`${baseURL}/` + response.data.baby.babyPic5);
          if (response.data.baby.babyPic6 !== '')
            setBabyPic6(`${baseURL}/` + response.data.baby.babyPic6);
          setBabyPrice(response.data.baby.babyPrice);
          setBabyStatus(response.data.baby.babyStatus);
        }
      })
    }
    else {
      setBabyName('');
      setLiterId('');
      setLiterIdName('');
      setLiterDOB('');
      setPetDescriptionId('');
      setBabyPic1('');
      setBabyPic2('');
      setBabyPic3('');
      setBabyPic4('');
      setBabyPic5('');
      setBabyPic6('');
      setBabyPrice(0);
    }
    setOpen(props.open)
  }, [props.open])


  const saveData = () => {
    let flag = true;
    if (babyName === '') {
      flag = false;
      setBabyNameFlag(true)
    }
    if (literId === '') {
      flag = false;
      setLiterIdFlag(true)
    }

    if (literDOB === '') {
      flag = false;
      setLiterDOBFlag(true)
    }
    if (petDescriptionId === '') {
      flag = false;
      setPetDescriptionIdFlag(true)
    }
    // if (babyPic1 === '') {
    //   flag = false;
    //   setBabyPic1Flag(true)
    // }
    if (!flag) {
      return;
    }
    if (props.isAdd === false && props.id !== '') {
      new Promise(resolve => {
        const formData = new FormData();
        formData.append("breederId", props.id);
        formData.append("babyName", babyName);
        formData.append("literId", literId);
        formData.append("babyGender", babyGender);
        formData.append("literDOB", literDOB);
        formData.append("petDescriptionId", petDescriptionId);
        formData.append("babyPrice", babyPrice);
        formData.append("babyStaus", babyStatus);
        if (file1)
          formData.append("file1", file1);
        if (file2)
          formData.append("file2", file2);
        if (file3)
          formData.append("file3", file3);
        if (file4)
          formData.append("file4", file4);
        if (file5)
          formData.append("file5", file5);
        if (file6)
          formData.append("file6", file6);
        axios.put(`${baseURL}/api/babies/`, formData).then(response => {
          if (response.data.success === true) {
            setFile1(null);
            setFile2(null);
            setFile3(null);
            setFile4(null);
            setFile5(null);
            setFile6(null);
            props.editSelectedItem(response.data.baby);
            handleClose()
            setOpenAlert(true)
            setMessage("Successfully updated!")
            setSeverity("success")
            resolve();
          }
        }).catch(err => {
          console.log(err)
          setOpenAlert(true)
          setMessage("Operation failed!")
          setSeverity("error")
          resolve();
        })
      })
    } else {
      new Promise(resolve => {
        const formData = new FormData();
        formData.append("babyName", babyName);
        formData.append("literId", literId);
        formData.append("babyGender", babyGender);
        formData.append("literDOB", literDOB);
        formData.append("petDescriptionId", petDescriptionId);
        formData.append("babyPrice", babyPrice);
        formData.append("babyStatus", babyStatus);
        if (file1)
          formData.append("file1", file1);
        if (file2)
          formData.append("file2", file2);
        if (file3)
          formData.append("file3", file3);
        if (file4)
          formData.append("file4", file4);
        if (file5)
          formData.append("file5", file5);
        if (file6)
          formData.append("file6", file6);

        axios.post(`${baseURL}/api/babies/`, formData).then(response => {
          if (response.data.success === true) {
            setFile1(null);
            setFile2(null);
            setFile3(null);
            setFile4(null);
            setFile5(null);
            setFile6(null);
            setOpenAlert(true)
            setMessage("Successfully Saved!")
            setSeverity("success")
            props.addNewRow(response.data.baby);
            handleClose()
            resolve();
          }
        }).catch(err => {
          alert('OMG')
          setOpenAlert(true)
          setMessage("Operation failed!")
          setSeverity("error")
          resolve();
        })
      })
    }
  }
  const onBabyPriceChange = (event) => {
    setBabyPriceFlage(false)
    setBabyPrice(event.target.value)
    if (babyName === '') {
      setBabyPriceFlage(true)
    }
  }
  const onChangeBabyName = (event) => {
    setBabyNameFlag(false)
    setBabyName(event.target.value)
    if (babyName === '') {
      setBabyNameFlag(true)
    }
  }
  const onChangeLiterDOB = (value) => {
    setLiterDOBFlag(false)
    setLiterDOB(value)
    if (literDOB === '') {
      setLiterDOBFlag(true)
    }
  }
  const onChangePetDescriptionDesc = (event) => {
    setPetDescriptionIdFlag(false)
    setPetDescriptionId(event.target.value)
    if (petDescriptionId === '') {
      setPetDescriptionIdFlag(true)
    }
  }
  const onChangeBabyPic1 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile1(event.target.files[0])
      let reader = new FileReader();
      reader.onload = (e) => {
        setBabyPic1(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  const onChangeBabyPic2 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile2(event.target.files[0])
      let reader = new FileReader();
      reader.onload = (e) => {
        setBabyPic2(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  const onChangeBabyPic3 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile3(event.target.files[0])
      let reader = new FileReader();
      reader.onload = (e) => {
        setBabyPic3(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  const onChangeBabyPic4 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile4(event.target.files[0])
      let reader = new FileReader();
      reader.onload = (e) => {
        setBabyPic4(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  const onChangeBabyPic5 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile5(event.target.files[0])
      let reader = new FileReader();
      reader.onload = (e) => {
        setBabyPic5(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  const onChangeBabyPic6 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile6(event.target.files[0])
      let reader = new FileReader();
      reader.onload = (e) => {
        setBabyPic6(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  const onChangeLiterId = (event) => {
    setLiterIdName(event.target.value)
    setLiterId(event.target.value)
    if (event.target.value === "") {
      setLiterIdFlag(true)
    }
  }
  const radioHandleChange = (event) => {
    setBabyGender(event.target.value);
  };
  const onBabyStatusChaine = (event) => {
    setBabyStatus(event.target.value)
  }
  const imageClick1 = () => {
    imageFileRef1.current.click();
  }
  const imageClick2 = () => {
    imageFileRef2.current.click();
  }
  const imageClick3 = () => {
    imageFileRef3.current.click();
  }
  const imageClick4 = () => {
    imageFileRef4.current.click();
  }
  const imageClick5 = () => {
    imageFileRef5.current.click();
  }
  const imageClick6 = () => {
    imageFileRef6.current.click();
  }

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
              New Baby
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <TextField
                  error={babyNameFlag}
                  id="outlined-multiline-static"
                  label="BabyName"
                  value={babyName}
                  onChange={onChangeBabyName}
                  helperText=""
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">LiterId</InputLabel>
                  <Select
                    error={literIdFlag}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={literIdName}
                    sx={{ height: "3rem" }}
                    label="LiterId"
                    onChange={onChangeLiterId}
                  >
                    {literIds.map((item, index) => (
                      <MenuItem key={index} value={item._id}>{item._id}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="BreederDOB"
                    value={literDOB}
                    onChange={onChangeLiterDOB}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <FormControl sx={{ marginLeft: "10px" }}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={babyGender}
                    onChange={radioHandleChange}
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                  </RadioGroup>
                </FormControl>
              </MDBox>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">PetDescription</InputLabel>
                  <Select
                    error={petDescriptionIdFlag}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={petDescriptionId}
                    sx={{ height: "3rem" }}
                    label="PetDescription"
                    onChange={onChangePetDescriptionDesc}
                  >
                    {petDescriptions.map((item, index) => (
                      <MenuItem key={index} value={item._id}>{item.petDescription}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={2}>
                <input type="file" onChange={onChangeBabyPic1} hidden ref={imageFileRef1} />
                <img src={babyPic1 !== '' ? babyPic1 : DefaultImage} alt="image" onClick={imageClick1} width={100} height={100} sx={{ padding: "3rem" }} />
                <input type="file" onChange={onChangeBabyPic2} hidden ref={imageFileRef2} />
                <img src={babyPic2 !== '' ? babyPic2 : DefaultImage} alt="image" onClick={imageClick2} width={100} height={100} sx={{ padding: "3rem" }} />
                <input type="file" onChange={onChangeBabyPic3} hidden ref={imageFileRef3} />
                <img src={babyPic3 !== '' ? babyPic3 : DefaultImage} alt="image" onClick={imageClick3} width={100} height={100} sx={{ padding: "3rem" }} />
                <input type="file" onChange={onChangeBabyPic4} hidden ref={imageFileRef4} />
                <img src={babyPic4 !== '' ? babyPic4 : DefaultImage} alt="image" onClick={imageClick4} width={100} height={100} sx={{ padding: "3rem" }} />
                <input type="file" onChange={onChangeBabyPic5} hidden ref={imageFileRef5} />
                <img src={babyPic5 !== '' ? babyPic5 : DefaultImage} alt="image" onClick={imageClick5} width={100} height={100} sx={{ padding: "3rem" }} />
                <input type="file" onChange={onChangeBabyPic6} hidden ref={imageFileRef6} />
                <img src={babyPic6 !== '' ? babyPic6 : DefaultImage} alt="image" onClick={imageClick6} width={100} height={100} sx={{ padding: "3rem" }} />
              </MDBox>
              <MDBox mb={2}>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">Status</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={babyStatus}
                    onChange={onBabyStatusChaine}
                  >
                    <FormControlLabel value="Available" control={<Radio />} label="Available" />
                    <FormControlLabel value="Reservered" control={<Radio />} label="Reservered" />
                    <FormControlLabel value="Sold" control={<Radio />} label="Sold" />
                  </RadioGroup>
                </FormControl>
              </MDBox>
              <MDBox mb={1}>
                <TextField
                  error={babyPriceFlag}
                  id="outlined-number"
                  label="Number"
                  type="Price"
                  value={babyPrice}
                  onChange={onBabyPriceChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </MDBox>
              <MDBox mt={1} mb={1}>
                <MDButton onClick={saveData} variant="gradient" color="info" fullWidth>
                  Save
                </MDButton>
              </MDBox>
              <MDBox mt={1} mb={1}>
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
