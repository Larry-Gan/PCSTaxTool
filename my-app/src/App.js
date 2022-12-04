import logo from './logo.svg';
import './App.css';
import { Button, Form, Input } from 'antd';
import React, { useState, Component } from 'react';
import Select from "react-select";
import {Chart, ArcElement} from 'chart.js'
import { Pie } from "react-chartjs-2";
Chart.register(ArcElement);
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
};

const mappings2019 = {
  "percents" : [.1, .12, .22, .24, .32, .35, .37],
  "single": [0, 9700, 39475, 84200, 160725, 204100, 510300],
  "seperate": [0, 9700, 39475, 84200, 160725, 204100, 306175],
  "together": [0, 19400, 78950, 168400, 321450, 408200, 612350],
  "head": [0, 13850, 52850, 84200, 160700, 204100, 510300],
  "ss": 132900,
};

const mappings2020 = {
  "percents" : [.1, .12, .22, .24, .32, .35, .37],
  "single": [0, 9875, 40125, 85525, 163300, 207350, 518400],
  "seperate": [0, 9875, 40125, 85525, 163300, 207350, 311025],
  "together": [0, 19750, 80250, 171050, 326600, 414700, 622050],
  "head": [0, 14100, 53700, 85500, 163300, 207350, 518400],
  "ss": 137700,
};

const mappings2021 = {
  "percents" : [.1, .12, .22, .24, .32, .35, .37],
  "single": [0, 9950, 40525, 86375, 164925, 209425, 523600],
  "seperate": [0, 9950, 40525, 86375, 164925, 209425, 314150],
  "together": [0, 19900, 81050, 172750, 329850, 418850, 628301],
  "head": [0, 14200, 54200, 86350, 164900, 209400, 523600],
  "ss": 142800,
};

const mappings2022 = {
  "percents" : [.1, .12, .22, .24, .32, .35, .37],
  "single": [0, 10275, 41775, 89075, 170050, 215950, 539900],
  "seperate": [0, 10275, 41775, 89075, 170050, 215950, 332925],
  "together": [0, 20550, 83550, 178150, 340100, 431900, 647850],
  "head": [0, 14650, 55900, 89050, 170050, 215950, 539900],
  "ss": 147000,
};

const yearToTax = {
  "2018" : mappings2018,
  "2019" : mappings2019,
  "2020" : mappings2020,
  "2021" : mappings2021,
  "2022" : mappings2022,
}


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
  const [year, setYear] = useState("2018");
  const [person, setPerson] = useState("single");
  const [income, setIncome] = useState(0);
  const [afterTax, setAfterTax] = useState();
  const [chartData, setChartData] = useState({
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
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
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
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
