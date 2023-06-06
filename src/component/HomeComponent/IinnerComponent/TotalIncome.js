import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography, Skeleton, Box, Grow } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { sanitizeUrl } from '@braintree/sanitize-url'
import { ApiRequest } from '../../../ApiRequest';

const TotalIncome = ({ refreshControll }) => {
  const theme = useTheme();
  const vendor_id = localStorage.getItem('vendor_id');
  const [vendorDashboardinfo, setVendorDashboardinfo] = React.useState({});
  const [vendorDashboardinfoIncom, setVendorDashboardinfoIncom] = React.useState({});
  const [loader, setLoader] = React.useState(true);

  React.useEffect(async () => {
    // console.log('TotalIncome')
    const controller = new AbortController();
    const signal = controller.signal
    axios.all([
      ApiRequest.post(sanitizeUrl(`/vendorgraph`), {
        vendor_id: vendor_id
      }, { signal: signal }),
      ApiRequest.post(sanitizeUrl(`/vendordashcounts`), {
        vendor_id: vendor_id
      }, { signal: signal })
    ])
      .then(axios.spread((data1, data2) => {
        if (data1.data.response.status === 1) {
          setVendorDashboardinfoIncom(data1.data.monthGraph)
          setLoader(false)
        } else {
          if (data1.data.response.status === -1) {
            setLoader(false)
          }
        }
        if (data2.data.response.status === 1) {
          setVendorDashboardinfo(data2.data.dashCounts)
          setLoader(false)
        } else {
          if (data2.data.response.status === -1) {
            setLoader(false)
          }
        }
      }));
    return () => controller.abort();
  }, [refreshControll]);

  const chartData = {
    type: 'area',
    height: 135,
    options: {
      chart: {
        id: 'support-chart',
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 1
      },
      xaxis: {
        /* type: 'datetime', */
        categories: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          format: 'MM/yyyy'
        },
        y: {
          title: ''
        },
        marker: {
          show: false
        }
      }
    },
    series: [{
      data: vendorDashboardinfoIncom
    }]
  };


  return (
    <>
      {loader ?
        <Box sx={{ pt: 2 }}>
          <Skeleton variant="rectangular" width={'100%'} height={170} sx={{ borderRadius: 1 }} />
        </Box>
        :
        <Grow in>
          <div>
            <Card sx={{ backgroundColor: '#ede7f6', boxShadow: 9 }}>
              <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark, fontFamily: 'Nunito', fontWeight: '700' }}>
                        Total Income
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h4" sx={{ color: theme.palette.grey[800], fontFamily: 'Nunito', fontWeight: '700' }}>
                        &#8377;  {vendorDashboardinfo.total_net_amount === undefined ? '0' : vendorDashboardinfo.total_net_amount}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800], fontFamily: 'Nunito', fontWeight: '700' }}>
                    Statistic
                  </Typography>
                </Grid>
              </Grid>
              <ReactApexChart {...chartData} />
            </Card>
          </div>
        </Grow>
      }
    </>
  )
}

export default TotalIncome
