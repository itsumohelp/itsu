import { useContext, useState } from "react";
import { Context } from "./[entryid]";
export default function Radio() {
    let temp =
    {
        "problem":"",
        "selectValue":[{
          "value":"",
          "correct":false
        }
        ]
    }
    const ChildContext = useContext(Context);
 

    let basic =
        {
            "selectvalue":"",
            "correct":false
        }
    const [format,setRadi] = useState([basic]);
    const [radio, setCount] = useState(1);
    function addRadio() {
        setRadi([...format, basic])
    }
    function checkstart() {
        ChildContext[1]([...ChildContext[0], temp])
    }
    function delRadio(selectindex) {
        setRadi(
            format.filter((form, index) => (index !== selectindex)
        ))
    }
    function updateStage(value, selectindex) {
        setRadi(
            format.map((select, index) => (index === selectindex ? {selectvalue: value, correct: select.correct} : select))
        )
    }
    function updateCheck(checked, selectindex) {
        setRadi(
            format.map((select, index) => (index === selectindex ? {selectvalue: select.selectvalue, correct: checked} : select))
        )
    }
    return (
      <div className="form-group">
        {format.map((select,i) => (
            <div className="input-group mb-2" key={i}>
                <div className="input-group-text">
                <input type="radio" className="correct" aria-label="Radio button for following text input" name={radio+ "_radioValue"} value={i} placeholder="選択肢1" checked={select.correct} 
                onChange={(e) => updateCheck(e.target.checked, i)} 
                 />
                </div>
                <input type="text" className="form-control selector" aria-label="Text input with radio button" value={select.selectvalue} 
                onChange={(e) => updateStage(e.target.value, i)} />
                <button className="btn btn-outline-danger" type="button" id="button-addon2" onClick={()=>delRadio(i)}>削除</button>
            </div>
        )
        )
        }
        
        <button type="button" className="btn btn-primary" onClick={addRadio}><img src="/plus-circle.svg" alt="plus" width="20" height="20" /></button>
        <button type="button" className="btn btn-primary" onClick={checkstart}>ETST</button>
        <br/><br/><br/>
        </div>
    )
}