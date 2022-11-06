import logo from './logo.svg';
import './App.css';
import { Button, Form, Input } from 'antd';
import React, { useState, Component } from 'react';
import Select from "react-select";
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
};

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
  const [income, setIncome] = useState(0);
  const [afterTax, setAfterTax] = useState();
    const onFinish = () => {
        console.log(income)
        const temp = income.replace(/,/g,'');
        const intIncome = parseInt(temp);
        console.log(intIncome);
        let taxes = 0;
        const rates =  mappings2018["percents"];
        const salaries = mappings2018["single"];
        for (let i = 1; i < salaries.length; i++) {
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
        setAfterTax(taxes);
    };
  return (
    <Form {...layout} name="control-ref" style={{width:'100%'}}>
      <Form.Item
        name="note"
        label="Note"
        rules={[
          {
            required: true,
          },
        ]}
        onFinish={onFinish}
      >
        <Input onChange={(e) => setIncome(e.target.value)}/>
      </Form.Item>

      <Form.Item {...layout}>
      <Select
        defaultValue="2018"
        style={{
          width: 120,
        }}
        onChange={setYear}
        options={supportedYears}
      />
      </Form.Item>


      <Form.Item {...tailLayout}>
        <Button type="primary"  htmlType="submit" onClick={() => onFinish()}>
          Submit
        </Button>
        <Button htmlType="button">
          Reset
        </Button>
      </Form.Item>
        {afterTax}
    </Form>
  );
}

export default CalcTaxes;
