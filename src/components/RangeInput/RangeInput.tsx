import React from "react";
import styles from "./RangeInput.module.scss";

const RangeInput = ({
  maxValue,
  minValue,
  value,
  changeValue,
  title,
  abr,
  percent,
  contr,
  loading,
}: {
  maxValue: number;
  minValue: number;
  value: any;
  changeValue: any;
  title: string;
  abr: string;
  percent: boolean;
  contr?: number;
  loading: boolean;
}) => {
  const inputRef: any = React.useRef();

  const [valueText, changeText] = React.useState(value);
  const [edit, changeEdit] = React.useState(false);
  const percentRef: any = React.useRef();

  React.useEffect(() => {
    changeText(value);
  }, [value]);

  const setValue = () => {
    changeValue({
      value:
        valueText > maxValue
          ? maxValue
          : valueText < minValue || isNaN(valueText)
          ? minValue
          : valueText,
    });
    changeText(value);
  };

  const applyValueKey = (e: any) => {
    if (e.key === "Enter") {
      !percent ? inputRef.current.blur() : percentRef.current.blur();
      setValue();
    }
  };

  const sep = " ";

  return (
    <div className={loading ? `${styles.RangeInput} ${styles.disable}` : styles.RangeInput}>
      <p className={styles.title}>{title}</p>
      <div className={`${styles.wrap} ${!edit ? "" : styles.edit}`}>
        <div className={styles.inputs}>
          <input
            disabled={loading}
            className={styles.textInput}
            ref={inputRef}
            max={maxValue}
            min={minValue}
            type="text"
            onChange={(e) => {
              changeText(e.target.value);
            }}
            onKeyDown={(e) => applyValueKey(e)}
            onBlur={() => {
              setValue();
              changeEdit(false);
            }}
            onFocus={(e) => {
              if (percent) {
                e.target.blur();
                percentRef.current.focus();
              }
              changeEdit(true);
            }}
            value={
              !percent
                ? isNaN(valueText)
                  ? ""
                  : edit
                  ? valueText
                  : valueText
                      .toString()
                      .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + sep)
                : contr
                ? `${contr
                    .toString()
                    .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + sep)} ₽`
                : 0
            }
          />
          {percent ? (
            <input
                disabled={loading}
              max={maxValue}
              min={minValue}
              onChange={(e) => {
                changeText(e.target.value);
              }}
              onFocus={() => {
                changeEdit(true);
              }}
              onKeyDown={(e) => applyValueKey(e)}
              onBlur={() => {
                setValue();
                changeEdit(false);
              }}
              ref={percentRef}
              type="text"
              value={edit ? valueText : `${valueText}%`}
              className={styles.percentInput}
            />
          ) : (
            <p className={styles.abr}>{abr}</p>
          )}
        </div>
        <input
          className={styles.Range}
          style={{
            backgroundSize: `${
              ((value - minValue) * 100) / (maxValue - minValue)
            }% 100%`,
          }}
          max={maxValue}
          min={minValue}
          value={value}
          disabled={loading}
          onChange={(e) => changeValue({ value: e.target.value })}
          type="range"
        />
      </div>
    </div>
  );
};

export default RangeInput;
