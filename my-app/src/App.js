import logo from './logo.svg';
import './App.css';
import { Button, Form, Input, Select } from 'antd';
import React, { useState, Component } from 'react';
const { Option } = Select;
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

function CalcTaxes() {
  /*formRef = React.createRef();

  onFinish = (values) => {
    console.log(values);
    console.log(typeof(values));
  };
  onReset = () => {
    this.formRef.current.resetFields();
  };*/

  const [income, setIncome] = useState(0);
  const [afterTax, setAfterTax] = useState();
    const onFinish = () => {
        console.log(income)
        const temp = income.replace(/,/g,'');
        const intIncome = parseInt(temp);
        console.log(intIncome);
        setAfterTax(intIncome * .5);
    };
  return (
    <Form {...layout} name="control-ref" >
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
