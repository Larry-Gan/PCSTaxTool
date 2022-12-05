import logo from './logo.svg';
import './App.css';
import { Button, Form, Input } from 'antd';
import React, { useState, Component } from 'react';
import Select from "react-select";
import {Chart, ArcElement, Tooltip} from 'chart.js'
import { Pie } from "react-chartjs-2";
Chart.register(ArcElement);
Chart.register([Tooltip])
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const supportedYears = [
        {
          value: "2018",
          label: "2018",
        },{
          value:  "2019",
          label:  "2019",
        }, {
          value: "2020",
          label: "2020",
        }, {
          value: "2021",
          label: "2021",
        }, {
          value: "2022",
          label: "2022",
        }];
const personType = [{
          value: "single",
          label: "Single",
        }, {
          value: "seperate",
          label: "Seperate",
        }, {
          value: "together",
          label: "Together",
        }, {
          value: "head",
          label: "Head",
        }];

const mappings2018 = {
  "percents" : [.1, .12, .22, .24, .32, .35, .37],
  "single": [0, 9525, 38700, 82500, 157500, 200000, 500000],
  "seperate": [0, 9525, 38700, 82500, 157500, 200000, 300000],
  "together": [0, 19050, 77400, 165000, 315000, 400000, 600000],
  "head": [0, 13600, 51800, 82500, 157500, 200000, 500000],
  "ss": 128400,
  "budget": 6300000000000,
  "budget_percents": [.1678,
.1646,
.1577,
.1103,
.0868,
.0848,
.0685,
.0326,
.0209,
.0205,
.0184,
.0134,
.0122,
.0121,
.0090,
.0060,
.0045,
.0029,
.0069,]
};

const mappings2019 = {
  "percents" : [.1, .12, .22, .24, .32, .35, .37],
  "single": [0, 9700, 39475, 84200, 160725, 204100, 510300],
  "seperate": [0, 9700, 39475, 84200, 160725, 204100, 306175],
  "together": [0, 19400, 78950, 168400, 321450, 408200, 612350],
  "head": [0, 13850, 52850, 84200, 160700, 204100, 510300],
  "ss": 132900,
  "budget": 6600000000000,
  "budget_percents": [
.1756,
.1651,
.1597,
.1098,
.0859,
.0884,
.0608,
.0328,
.0195,
.0235,
.0181,
.0092,
.0110,
.0124,
.0079,
.0059,
.0061,
.0037,
.0048,]
};

const mappings2020 = {
  "percents" : [.1, .12, .22, .24, .32, .35, .37],
  "single": [0, 9875, 40125, 85525, 163300, 207350, 518400],
  "seperate": [0, 9875, 40125, 85525, 163300, 207350, 311025],
  "together": [0, 19750, 80250, 171050, 326600, 414700, 622050],
  "head": [0, 14100, 53700, 85500, 163300, 207350, 518400],
  "ss": 137700,
  "budget_percents": [0.1452, 0.1261, 0.1203, 0.1038, 0.1592, 0.0604, 0.0649, 0.0269, 0.0102, 0.0313, 0.0215, 0.0201, 0.0084, 0.0101, 0.0714, 0.0045, 0.0045, 0.0034, 0.0077]
};

const mappings2021 = {
  "percents" : [.1, .12, .22, .24, .32, .35, .37],
  "single": [0, 9950, 40525, 86375, 164925, 209425, 523600],
  "seperate": [0, 9950, 40525, 86375, 164925, 209425, 314150],
  "together": [0, 19900, 81050, 172750, 329850, 418850, 628301],
  "head": [0, 14200, 54200, 86350, 164900, 209400, 523600],
  "ss": 142800,
  "budget_percents": [.1374, .1178, .1111, .0998, .1987, .0576, .0696, .0256, .0195, .0505, .0218, .0125, .0078, .0087, .0387, .0041, .0036, .0018, .0131]
};

const mappings2022 = {
  "percents" : [.1, .12, .22, .24, .32, .35, .37],
  "single": [0, 10275, 41775, 89075, 170050, 215950, 539900],
  "seperate": [0, 10275, 41775, 89075, 170050, 215950, 332925],
  "together": [0, 20550, 83550, 178150, 340100, 431900, 647850],
  "head": [0, 14650, 55900, 89050, 170050, 215950, 539900],
  "ss": 147000,
  "budget_percents": [.1649, .1528, .1395, .1305, .104, .0894, .0513, .033, .0094, .0254, .0332, .0111, .0098, .0106, .0086, .0049, .0037, .0019, .016]
};

const yearToTax = {
  "2018" : mappings2018,
  "2019" : mappings2019,
  "2020" : mappings2020,
  "2021" : mappings2021,
  "2022" : mappings2022,
}

const budgetGroup = [
  "Medicare",
  "Social Security",
  "National Defense",
  "Health",
  "Income Security",
  "Net Interest",
  "General Government",
  "Veterans Benefits and Services",
  "International Affairs",
  "Education, Training, Employment, Social Services",
  "Transportation",
  "Community and Regional Development",
  "Natural Resources and Environment",
  "Administration of Justice",
  "Commerce and Housing Credit",
  "General Science, Space, Technology",
  "Agriculture",
  "Energy",
  "Unreported",
]


const handleChange = (value) => {
  console.log(`selected ${value}`);
};


function CalcTaxes() {
  /*formRef = React.createRef();

  onFinish = (values) => {
    console.log(values);,
    console.log(typeof(values));
  };
  onReset = () => {
    this.formRef.current.resetFields();
  };*/
  const [year, setYear] = useState({"value":"2018"});
  const [person, setPerson] = useState("single");
  const [income, setIncome] = useState(0);
  const [afterTax, setAfterTax] = useState();
  const [chartData, setChartData] = useState({
  labels: budgetGroup,
  datasets: [{
    data: [1057140000000, 1036980000000, 993510000000, 694890000000, 546840000000, 534240000000, 431550000000.00006, 205379999999.99997, 131669999999.99998, 129150000000, 115920000000, 84420000000, 76860000000, 76230000000, 56699999999.99999, 37800000000, 28349999999.999996, 18270000000, 43470000000],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(255, 99, 132)',
    ],
    hoverOffset: 4
  }]
});
    const onFinish = () => {
        console.log(income)
        const temp = income.replace(/,/g,'');
        const intIncome = parseInt(temp);
        console.log(intIncome);
        let taxes = 0;
        const marrStatus = person["value"];
        const currMap = yearToTax[year["value"]];
        const rates = currMap["percents"];
        const salaries = currMap[marrStatus];
        const govtSpendingPercents = currMap["budget_percents"];
        for (let i = 1; i < salaries.length; i++) {
          console.log(i);
          console.log(taxes);
          if (intIncome >= salaries[i]) {
            taxes += (salaries[i] - salaries[i-1])*rates[i-1];
          } else {
            taxes += (intIncome - salaries[i - 1])*rates[i-1];
            break;
          }
        }
        if (intIncome > salaries[salaries.length-1]) {
          taxes += (intIncome - salaries[salaries.length-1])*rates[rates.length-1];
        }

        let socSec = 0;
        if (intIncome > currMap["ss"]) {
          socSec = currMap["ss"] * .062;
        } else {
          socSec = intIncome * .062;
        }
        let medicare = 0;
        if (marrStatus == "single" || marrStatus == "head") {
          if (intIncome > 200000) {
            medicare = intIncome * .0145
            medicare += (intIncome - 200000) * .0235;
          } else {
            medicare = intIncome * .0145;
          }
        } else if (marrStatus == "seperate") {
          if (intIncome > 125000) {
            medicare = intIncome * .0145
            medicare += (intIncome - 125000) * .0235;
          } else {
            medicare = intIncome * .0145;
          }
        } else if (marrStatus == "together") {
          if (intIncome > 250000) {
            medicare = intIncome * .0145
            medicare += (intIncome - 250000) * .0235;
          } else {
            medicare = intIncome * .0145;
          }
        }
        console.log("taxes");
        console.log(taxes);
        console.log("socSec")
        console.log(socSec);
        console.log("medicare");
        console.log(medicare);
        setAfterTax(taxes + socSec + medicare);
        let yourPayments = [medicare, socSec]
        for (let i = 2; i < govtSpendingPercents.length; i++) {
            yourPayments.push(govtSpendingPercents[i] * taxes);
        }
        setChartData({
        labels: budgetGroup,
        datasets: [{
          data: yourPayments,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 99, 132)',
          ],
          hoverOffset: 4
        }]
      });
    };
  return (
    <>
    <Form {...layout} name="control-ref" style={{width:'100%'}}>

    <p>Yearly Income</p>
      <Form.Item
        name="note"
        rules={[
          {
            required: true,
          },
        ]}
        onFinish={onFinish}
      >
        <Input style={{width: '50%'}} onChange={(e) => setIncome(e.target.value)}/>
      </Form.Item>


      <Form.Item {...layout}>
      <p>Fiscal Year</p>
      <div style={{width: '50%'}}>
      <Select
        name="year"
        label="Fiscal Year"
        defaultValue="2018"
        width = '10px'
        onChange={setYear}
        options={supportedYears}
      />
      </div>
      </Form.Item>


      <Form.Item {...layout}>
      <p>Marital Status</p>
      <div style={{width: '50%'}}>
      <Select
        name="status"
        label="Marital Status"
        defaultValue="single"
        width = '10px'
        onChange={setPerson}
        options={personType}
      />
      </div>
      </Form.Item>


      <Form.Item {...tailLayout}>
        <Button type="primary"  htmlType="submit" onClick={() => onFinish()}>
          Submit
        </Button>
      </Form.Item>
        {afterTax}
    </Form>
    <div className="chart-container" style={{width: '50%'}}>
    <h2>Budget chart for {year["value"]}</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            }
          }
        }}
      />
    </div>
    </>
  );
}

export default CalcTaxes;
