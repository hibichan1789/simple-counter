import { useState } from "react";
import "./index.css"

const initialCount = 0;
export default function CounterApp(){
  const differenceValue = 10;
  const [currentCount, setCurrentCount] = useState(initialCount);
  const [countLog, setCountLog] = useState<number[]>([initialCount])
  function handleCountClick(isAdd:boolean){
    const newCount = isAdd ? currentCount + differenceValue : currentCount - differenceValue;
    setCurrentCount(newCount);
    setCountLog([...countLog, newCount])
  }
  function handleResetClick(){
    setCurrentCount(0);
    setCountLog([initialCount]);
  }
  const currentCountStyle = currentCount >= 10 ? "text-red-600" : "text-gray-700";
  return(
    <div className="flex flex-col gap-3 items-center">
      <div className="flex gap-3 items-center">
        <CountButton differenceValue={differenceValue} isAdd={false} handleClick={handleCountClick}/>
        <span
          className={`${currentCountStyle} font-bold text-lg w-10 text-center truncate`}
        >
          {currentCount}
        </span>
        <CountButton differenceValue={differenceValue} isAdd={true} handleClick={handleCountClick}/>
      </div>
      <ResetButton handleResetClick={handleResetClick}/>
      <DisplayLog historyLog={countLog}/>
    </div>
  );
}

type DisplayLogProps = {
  historyLog:number[]
}
function DisplayLog({historyLog}:DisplayLogProps){
  const displayLog = historyLog.join(" -> ")
  return(
    <div className="flex items-center justify-center">
      <span>{displayLog}</span>
    </div>
  );
}

type CountButtonProps = {
  differenceValue:number;
  isAdd:boolean
  handleClick:(isAdd:boolean)=>void;
}
function CountButton({differenceValue, isAdd, handleClick}:CountButtonProps){
  const displayValue = isAdd ? `+${differenceValue}` : `-${differenceValue}`
  return(
    <button
      onClick={()=>handleClick(isAdd)}
      className="bg-gray-200 w-10  rounded-lg border border-gray-500 shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-300 active:scale-90 transition-all"
    >
      <span className="text-gray-800 font-bold">{displayValue}</span>
    </button>
  )
}
function ResetButton({handleResetClick}:{handleResetClick:()=>void}){
  return(
    <button
      onClick={handleResetClick}
      className="bg-gray-200 px-2 py-1 rounded-lg border border-gray-500 shadow-md hover:bg-gray-300 active:scale-90 transition-all"
    >
      <span>リセット</span>
    </button>
  );
}