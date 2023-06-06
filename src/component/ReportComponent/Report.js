import React from 'react'
import { Box, Container, Grow, Typography, Divider, Button, Radio, TextField, FormHelperText, IconButton } from '@mui/material';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Swal from 'sweetalert2';
import { useIonRouter } from '@ionic/react';
import { ApiRequestUrl } from '../../ApiRequest';

const Report = () => {
  let Navigate = useIonRouter();
  const vendor_id = localStorage.getItem('vendor_id');
  const [loader, setLoader] = React.useState(false);
  const [reportWeek, setReportWeek] = React.useState(false);
  const [reportMonth, setReportMonth] = React.useState(false);
  const [reportCustome, setReportCustome] = React.useState(false);
  const [reportMode, setReportMode] = React.useState('');
  const [trType, setTrType] = React.useState('');
  const [valueStartDate, setValueStartDate] = React.useState(null);
  const [valueEndDate, setValueEndDate] = React.useState(null);
  const [startdate, setStartdate] = React.useState(false)
  const [expireddate, setExpireddate] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState();
  const [selectedValueID, setSelectedValueID] = React.useState('');
  const [customReport, setCustomReport] = React.useState(false);
  const [getTrTypeSet, setGetTrTypeSet] = React.useState(false);
  const [getTrType, setGetTrType] = React.useState({
    trType: ''
  });
  const [value, setValue] = React.useState({
    from_date: "",
    to_date: ""
  });

  React.useEffect(() => {
    if (reportMode === 'week') {
      setReportWeek(true)
      setReportMonth(false)
      setReportCustome(false)
    } else {

    }
  })
  React.useEffect(() => {
    if (reportMode === 'month') {
      setReportWeek(false)
      setReportMonth(true)
      setReportCustome(false)
    } else {

    }
  })
  React.useEffect(() => {
    if (reportMode === 'costome') {
      setReportWeek(false)
      setReportMonth(false)
      setReportCustome(true)
    } else {

    }
  })

  const handleChangeMode = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChange = (event) => {
    setTrType(event.target.value);
    setGetTrType({ ...getTrType, trType: event.target.value })
  };

  React.useEffect(() => {
    if (value.from_date === '') {
    } else {
      setStartdate(false)
    }
  })
  React.useEffect(() => {
    if (value.to_date === '') {
    } else {
      setExpireddate(false)
    }
  })


  React.useEffect(() => {
    if (selectedValueID == 3) {
      setCustomReport(true)
    } else {
      setCustomReport(false)
    }
  })

  const handleChangeStartDate = (newValue) => {
    setValueStartDate(newValue);
    setValue({ ...value, from_date: newValue })
  };
  const handleChangeEndDate = (newValue) => {
    setValueEndDate(newValue);
    setValue({ ...value, to_date: newValue })
  };

  const checkStringNullEmptytrType = (str) => {
    if (str != null && str !== '') {
      return false;
    } else {
      return true;
    };
  };

  var validationtrType = '';
  const validateetrType = () => {
    if (checkStringNullEmptytrType(getTrType.trType)) {
      validationtrType += '<li>Enter Your Confrim Password</li>';
      setGetTrTypeSet(true)
    }
    if (validationtrType !== '') {
      return null;
    }
    else {

    };
  };

  React.useEffect(() => {
    if (getTrType.trType === '') {
      // setGetTrTypeSet(true)
    } else {
      setGetTrTypeSet(false)
    }
  });

  const onSubmitWeek = async (e, name) => {
    e.preventDefault()
    // console.log(name.name)
    validateetrType()
    if (validationtrType === '') {
      setLoader(true)
      var weeklyTr_list = JSON.stringify({
        vendor_id: vendor_id,
        from_date: '',
        to_date: ''
      });

      var weeklyTr_config = {
        method: 'post',
        url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/${name.name}`),
        headers: {
          'Content-Type': 'application/json'
        },
        data: weeklyTr_list
      };

      const controller = new AbortController();
      const signal = controller.signal
      await axios(weeklyTr_config, { signal: signal })
        .then(function (response) {
          if (response.data.response.status === 1) {
            // console.log(response.data.transaction === null ? false : true)
            sessionStorage.setItem('transaction', JSON.stringify(response.data.transaction))
            Navigate.push('/ReportDetails')
            setLoader(false)
          } else {
            if (response.data.response.status === -1) {
              setLoader(false)
            } else {
              alert('somethig worng')
            }
          }
        })
        .catch(function (err) {
          setLoader(true)
          if (err.name === "AbortError") {
            console.log("successfully aborted");
          } else {
            console.log(err);
            setLoader(false)
          }
        });
      return () => controller.abort();
    }
  }

  const onSubmitMonth = async (e, name) => {
    e.preventDefault()
    // console.log(name.name)
    validateetrType()
    if (validationtrType === '') {
      setLoader(true)
      var weeklyTr_list = JSON.stringify({
        vendor_id: vendor_id,
        from_date: '',
        to_date: ''
      });

      var weeklyTr_config = {
        method: 'post',
        url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/${name.name}`),
        headers: {
          'Content-Type': 'application/json'
        },
        data: weeklyTr_list
      };

      const controller = new AbortController();
      const signal = controller.signal
      await axios(weeklyTr_config, { signal: signal })
        .then(function (response) {
          if (response.data.response.status === 1) {
            sessionStorage.setItem('transaction', JSON.stringify(response.data.transaction))
            Navigate.push('/ReportDetails')
            setLoader(false)
          } else {
            if (response.data.response.status === -1) {
              setLoader(false)
            } else {
              alert('somethig worng')
            }
          }
        })
        .catch(function (err) {
          setLoader(true)
          if (err.name === "AbortError") {
            console.log("successfully aborted");
          } else {
            console.log(err);
            setLoader(false)
          }
        });
      return () => controller.abort();
    }
  }


  const checkStringNullEmpty = (str) => {
    if (str != null && str !== '') {
      return false;
    } else {
      return true;
    };
  };

  var validation = '';
  const validatee = () => {
    if (checkStringNullEmpty(value.from_date)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setStartdate(true)
    }
    if (checkStringNullEmpty(value.to_date)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setExpireddate(true)
    }
    if (validation !== '') {
      return null;
    }
    else {

    };
  };

  const onSubmitCustome = async (e, name) => {
    e.preventDefault()
    validateetrType()
    if (validationtrType === '') {
      validatee();
      if (validation === '') {
        var weeklyTr_list = JSON.stringify({
          vendor_id: vendor_id,
          from_date: new Date(value.from_date).toLocaleDateString(),
          to_date: new Date(value.to_date).toLocaleDateString()
        });

        var weeklyTr_config = {
          method: 'post',
          url: sanitizeUrl(`${ApiRequestUrl.baseUrl}/${name.name}`),
          headers: {
            'Content-Type': 'application/json'
          },
          data: weeklyTr_list
        };

        setLoader(true)
        const controller = new AbortController();
        const signal = controller.signal
        await axios(weeklyTr_config, { signal: signal })
          .then(function (response) {
            if (response.data.response.status === 1) {
              // console.log(response.data)
              sessionStorage.setItem('transaction', JSON.stringify(response.data.transaction))
              Navigate.push('/ReportDetails')
              setLoader(false)
            } else {
              if (response.data.response.status === -1) {
                Swal.fire(
                  "Opps !",
                  response.data.response.message,
                  'info'
                )
                setLoader(false)
              } else {
                alert('somethig worng')
              }
            }
          })
          .catch(function (err) {
            setLoader(true)
            if (err.name === "AbortError") {
              console.log("successfully aborted");
            } else {
              console.log(err);
              setLoader(false)
            }
          });
        return () => controller.abort();
      }
    }
  }



  const week = { id: 1, reportmodename: 'Current Week', trType: 'weeklyTr' };
  const month = { id: 2, reportmodename: 'Current Month', trType: 'montlyTr' };
  const costom = { id: 3, reportmodename: 'Custom Date', trType: '' };

  return (
    <>
      {loader ?
        <>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
        :
        ""
      }
      <Grow in>
        <div>
          <Container sx={{ pt: 10, }}>
            <Typography sx={{ color: 'gray', fontFamily: 'Nunito', fontWeight: '700', fontSize: 23 }}>Generate </Typography>
            <Typography sx={{ color: '#000000', fontFamily: 'Nunito', fontWeight: '700', fontSize: 23 }}>Activity Report</Typography>
          </Container>

          <Container sx={{ pt: 4 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl error={getTrTypeSet} fullWidth>
                <InputLabel id="demo-simple-select-label">Report name</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={trType}
                  label="Report name"
                  onChange={handleChange}
                >
                  <MenuItem value={'Transaction report'}>Transaction report</MenuItem>
                </Select>
              </FormControl>
              {getTrTypeSet ?
                <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                  Transaction Name
                </FormHelperText>
                : ''
              }
            </Box>
          </Container>

          <Box sx={{ pt: 4 }}>
            <Box sx={{ backgroundColor: '#FFFFFF', width: '100%', height: 'auto', boxShadow: 9, }}>
              <Box sx={{ p: 1 }}>
                <Typography sx={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 20 }}>Report Mode</Typography>
              </Box>
              <Divider />
              <Box sx={{ pt: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', pl: 1, pr: 1, pt: 1, pb: 1, alignItems: 'center' }}>
                  <Typography variant='h6' sx={{ fontFamily: 'Nunito', fontWeight: '700' }}>{week.reportmodename}</Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton onClick={() => setReportMode('week')}>
                    <Radio checked={selectedValue === week.reportmodename} onChange={(e) => { handleChangeMode(e); setSelectedValueID(week.id) }} /* onClick={() => setReportMode('week')} */ value={week.reportmodename} name="radio-buttons" inputProps={{ 'aria-label': 'B' }} />
                  </IconButton>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'center', pl: 1, pr: 1, pt: 1, pb: 1, alignItems: 'center' }}>
                  <Typography variant='h6' sx={{ fontFamily: 'Nunito', fontWeight: '700' }}>{month.reportmodename}</Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton onClick={() => setReportMode('month')}>
                    <Radio checked={selectedValue === month.reportmodename} onChange={(e) => { handleChangeMode(e); setSelectedValueID(month.id) }} /* onClick={() => setReportMode('month')} */ value={month.reportmodename} name="radio-buttons" inputProps={{ 'aria-label': 'B' }} />
                  </IconButton>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'center', pl: 1, pr: 1, pt: 1, pb: 1, alignItems: 'center' }}>
                  <Typography variant='h6' sx={{ fontFamily: 'Nunito', fontWeight: '700' }}>{costom.reportmodename}</Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton onClick={() => setReportMode('costome')}>
                    <Radio checked={selectedValue === costom.reportmodename} onChange={(e) => { handleChangeMode(e); setSelectedValueID(costom.id) }} /* onClick={() => setReportMode('costome')} */ value={costom.reportmodename} name="radio-buttons" inputProps={{ 'aria-label': 'B' }} />
                  </IconButton>
                </Box>
                <Divider />
              </Box>

              {customReport ?
                <Container>
                  <Grow in>
                    <div>
                      <Box>
                        <Box sx={{ display: 'flex', pt: 2, pb: 2 }}>
                          <Box>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <Stack spacing={3}>
                                <DesktopDatePicker
                                  label="Start Date"
                                  inputFormat="MM/dd/yyyy"
                                  value={valueStartDate}
                                  onChange={handleChangeStartDate}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                              </Stack>
                            </LocalizationProvider>
                            {startdate ?
                              <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                Date is required
                              </FormHelperText>
                              : ''
                            }
                          </Box>
                          <Box sx={{ m: 0.5 }} />
                          <Box>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <Stack spacing={3}>
                                <DesktopDatePicker
                                  label="End Date"
                                  inputFormat="MM/dd/yyyy"
                                  value={valueEndDate}
                                  onChange={handleChangeEndDate}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                              </Stack>
                            </LocalizationProvider>
                            {expireddate ?
                              <FormHelperText error id="standard-weight-helper-text--register" sx={{ fontFamily: 'Nunito' }}>
                                Date is required
                              </FormHelperText>
                              : ''
                            }
                          </Box>
                        </Box>
                      </Box>
                    </div>
                  </Grow>
                </Container>
                : ''}
            </Box>
          </Box>
          <Container sx={{ pt: 2, pb: 5 }}>
            {reportWeek === true ?
              <Button onClick={(e) => onSubmitWeek(e, { name: 'weeklyTr' })} fullWidth variant="contained" sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' }, height: 40, }}>
                Weekly Report
              </Button>
              :
              null
            }
            {reportMonth === true ?
              <Button onClick={(e) => onSubmitMonth(e, { name: 'montlyTr' })} fullWidth variant="contained" sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' }, height: 40, }}>
                Montly report
              </Button>
              :
              null
            }
            {reportCustome === true ?
              <Button onClick={(e) => onSubmitCustome(e, { name: 'montlyTr' })} fullWidth variant="contained" sx={{ color: '#FFFFFF', fontFamily: 'Nunito', backgroundColor: '#6500d8', pt: 2, pb: 2, boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)', '&:hover': { backgroundColor: '#6500d8' }, height: 40, }}>
                Custome report
              </Button>
              :
              null
            }
          </Container>
        </div>
      </Grow>
    </>
  )
}

export default Report;
