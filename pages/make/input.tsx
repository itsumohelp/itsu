import Radio from "./radio";

export default function Input(props) {
  function delRadio(selectindex) {
    props.checkone(selectindex)
  }
  function updateCheck(value, selectindex) {
    props.checktwo(value, selectindex)
}
let format =
{
    "selectvalue":"",
    "correct":false
}
function addRadio(selectindex) {
  props.addRadio(selectindex)
}
function delRadioOne(selectproblem, selectradioindex) {
  props.delRadioOne(selectproblem, selectradioindex)
}
function updateStage(value, selectproblem, selectindex) {
  props.updateSee(value, selectproblem, selectindex)
}
function updateRadio(value, selectproblem, selectindex) {
  props.updatecheck(value, selectproblem, selectindex)
}
    return (
      <div className="form-group">
        {props.count.map((entry,i) => (
          <div className="inner bg-light m-2 p-2" key={i + "problem"}>
          <h2>No{i} <button type="button" className="btn btn-outline-danger" onClick={()=>delRadio(i)}>❌</button></h2> 
            <textarea className="form-control" id="exampleInputEmail1" name={i+ "_entryValue"} aria-describedby="emailHelp" placeholder="問題内容" onChange={(e) => updateCheck(e.target.value, i)} value={entry.problem}/>
            <br/>
            {/* /* <Radio /> */}

            {props.count[i].selectValue.map((select,j) => (              
            <div className="input-group mb-2" key={j + "select"}>
                <div className="input-group-text">
                <input type="radio" className="correct" aria-label="Radio button for following text input" name={i+ "_radioValue"} value={j} placeholder="選択肢1" checked={select.correct} onChange={(e) => updateRadio(e.target.checked, i, j)} /> 
                </div>
                <input type="text" className="form-control selector" aria-label="Text input with radio button" value={select.value} onChange={(e) => updateStage(e.target.value, i, j)} />
                <button className="btn btn-outline-danger" type="button" id="button-addon2" onClick={()=>delRadioOne(i,j)}>削除</button>
            </div>
          )
        )
        }
                <button type="button" className="btn btn-primary" onClick={()=>addRadio(i)}><img src="/plus-circle.svg" alt="plus" width="20" height="20" /></button>
            </div>
            )
          )
        }
      </div>
    )
  }