import React from "react";
import "./App.scss";
import RangeInput from "./components/RangeInput/RangeInput";
import Result from "./components/Result/Result";
import PostButton from "./components/PostButton/PostButton";
import { default as axios } from "axios";

function App() {
  interface IInputValue {
    value: number;
  }
  interface IPostObj {
    car_coast: number;
    initial_payment: number;
    initial_payment_percent: number;
    lease_term: number;
    total_sum: number;
    monthly_payment_from: number;
  }

  const [carPrice, changeCarPrice] = React.useState<IInputValue>({
    value: 3300000,
  });
  const [liz, changeLiz] = React.useState<IInputValue>({ value: 60 });
  const [percent, changePercent] = React.useState<IInputValue>({ value: 13 });
  const [contr, changeContr] = React.useState<IInputValue>({ value: 0 });
  const [postObj, changePostObj] = React.useState<IPostObj>({
    car_coast: carPrice.value,
    initial_payment: contr.value,
    initial_payment_percent: percent.value,
    lease_term: liz.value,
    total_sum: 5000000,
    monthly_payment_from: 30000,
  });
  const [monthlyResult, changeMonthlyResult] = React.useState<IInputValue>({
    value: 0,
  });
  const [sumResult, changeSumResult] = React.useState<IInputValue>({
    value: 0,
  });
  const mainPercent = 0.035;

  React.useEffect(() => {
    changePostObj({
      car_coast: carPrice.value,
      initial_payment: contr.value,
      initial_payment_percent: parseInt(String(percent.value)),
      lease_term: liz.value,
      total_sum: sumResult.value,
      monthly_payment_from: monthlyResult.value,
    });
  }, [carPrice, contr, percent, liz, sumResult, monthlyResult]);

  React.useEffect(() => {
    changeContr({ value: Math.round(carPrice.value * (percent.value / 100)) });
  }, [percent, carPrice]);

  React.useEffect(() => {
    changeMonthlyResult({
      value: Math.round(
        (carPrice.value - contr.value) *
          ((mainPercent * Math.pow(1 + mainPercent, liz.value)) /
            (Math.pow(1 + mainPercent, liz.value) - 1))
      ),
    });
  }, [carPrice, contr, liz]);

  React.useEffect(() => {
    changeSumResult({
      value: Math.round(contr.value + liz.value * monthlyResult.value),
    });
  }, [contr, liz, monthlyResult]);

  const send = () => {
    fetch("https://hookb.in/eK160jgYJ6UlaRPldJ1P", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(postObj),
    }).then(response => console.log(response))
  };

  return (
    <div className={"app"}>
      <div className={"container"}>
        <h1 className="title">Рассчитайте стоимость автомобиля в лизинг</h1>
        <div className="inputs">
          <RangeInput
            maxValue={6000000}
            minValue={1000000}
            value={carPrice.value}
            changeValue={changeCarPrice}
            title={"Стоимость автомобиля"}
            abr={"₽"}
            percent={false}
          />
          <RangeInput
            maxValue={60}
            minValue={10}
            value={percent.value}
            changeValue={changePercent}
            title={"Первоначальный взнос"}
            abr={""}
            percent={true}
            contr={contr.value}
          />
          <RangeInput
            maxValue={60}
            minValue={1}
            value={liz.value}
            changeValue={changeLiz}
            title={"Срок лизинга"}
            abr={"мес."}
            percent={false}
          />
        </div>
        <div className="results">
          <Result title={"Сумма договора лизинга"} value={sumResult.value} />
          <Result title={"Ежемесячный платеж от"} value={monthlyResult.value} />
          <PostButton send={send} />
        </div>
      </div>
    </div>
  );
}

export default App;
