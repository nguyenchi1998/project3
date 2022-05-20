import React from 'react';
import {Bar} from 'react-chartjs-2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import {useTheme} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const rand = () => Math.floor(Math.random() * 255);

const Sales = (props) => {
  const theme = useTheme();

  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [
      {
        type: 'line',
        label: 'Dataset 1',
        borderColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
        borderWidth: 2,
        fill: false,
        data: [
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
        ],
      },
      {
        type: 'bar',
        label: 'Dataset 2',
        backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
        data: [
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
        ],
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar',
        label: 'Dataset 3',
        backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
        data: [
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
          rand(),
        ],
      },
    ],
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: {padding: 0},
    legend: {display: false},
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
            display: false,
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider,
            display: false,
            drawBorder: false,
          },
        },
      ],
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card {...props}>
      <CardHeader
        action={
          <Button endIcon={<ArrowDropDownIcon/>} size="small" variant="text">
            This Year
          </Button>
        }
        title="Latest Sales"
      />
      <Divider/>
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative',
          }}
        >
          <Bar data={data} options={options}/>
        </Box>
      </CardContent>
      <Divider/>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon/>}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

export default Sales;
