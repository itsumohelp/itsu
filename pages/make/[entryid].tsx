import { ContextType, FormEvent, createContext, useState } from "react";
import Layout from "../../components/layout"
import { useRouter } from "next/router";
import Input from "./input";

export const Context = createContext<ContextType>("");
export default function Firstrun() {
  let basic =
        {
            "problem":"",
            "selectValue":[{
              "value":"",
              "correct":false
            }
            ]
        }
  const router = useRouter();
  const {entryid} = router.query
  const [next, setCount] = useState([basic]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    let outputList = [];
    const allWithClass = Array.from(
      document.querySelectorAll('div.inner')
    );
    allWithClass.forEach(function(element,i,array){
      let output = {};
      output["entryValue"] = allWithClass[i].childNodes[1]["value"];
      output["entryType"] = allWithClass[i].childNodes[3]["value"];      
      output["sq"] = i;
      const elemeelent = Array.from(allWithClass[i].querySelectorAll('input.selector'))
      const correctlist = Array.from(allWithClass[i].querySelectorAll('input.correct'))

      if(!elemeelent) return;
      let choise = [];
      elemeelent.forEach(function(element,i,array){
        choise.push(element.value)
      })
      output["choise"] = choise

      let correct = [];
      correctlist.forEach(function(element,i,array){
        if(element.checked) correct.push(elemeelent[i].value)
      })
      output["correct"] = correct
      outputList.push(output);
    });
    const response = await fetch('/api/detail/' + entryid, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(outputList),
    })
    const data = await response.json()
  }

  function handleClick() {
    setCount([...next, basic])
  }

  function addRadio(selectindex) {
    setCount(
      next.map((select, index) => (index === selectindex ?
        {
          problem: select.problem,
          selectValue: [...select.selectValue, {"value":"","correct":false}]
        }
         : select))
    )
  }
  function delRadioOne(problemindex, radioindex) {
    setCount(
      next.map((select, index) => (index === problemindex ?
        {
          problem: select.problem,
          selectValue: select.selectValue.filter((form, index) => (index !== radioindex))
        }
         : select))
    )
  }
  const deleteList = (selectindex) => {
  setCount(
    next.filter((form, index) => (index !== selectindex)
  ))
}
const updateList = (value, selectindex) => {
  setCount(
    next.map((select, index) => (index === selectindex ? 
      {
        problem: value,
        selectValue: select.selectValue
      }
       : select))
  )
}
const updateSee = (inputvalue, problemindex, selectindex) => {
  setCount(
    next.map((select, index) => (index === problemindex ?
      {
        problem: select.problem,
        selectValue: select.selectValue.map((form, innerIndex) => (innerIndex === selectindex ?
          {
          value: inputvalue,
          correct: form.correct
        } : form))
      }
       : select))
  )
}
const updatecheck = (inputvalue, problemindex, selectindex) => {
  setCount(
    next.map((select, index) => (index === problemindex ?
      {
        problem: select.problem,
        selectValue: select.selectValue.map((form, innerIndex) => (innerIndex === selectindex ?
          {
          value: form.value,
          correct: inputvalue
        } : form))
      }
       : select))
  )
}

    return (
      <Layout>
        <form onSubmit={onSubmit} >
          <h2>詳細作成</h2>
          レースID {entryid}
          <br/><br/>
          <Context.Provider value={[next, setCount]}>
          <Input
           count={next}
          checkone={deleteList}
          checktwo={updateList}
          addRadio={addRadio}
          delRadioOne={delRadioOne}
          updateSee={updateSee}
          updatecheck={updatecheck}
          />
          </Context.Provider>
          
          <br/><br/>
          <div className="d-grid gap-2 col-6 mx-auto">
            
          </div>
            <div className="fixed-bottom bg-white">
            <table width="100%"><tbody>
              <tr><td>
              <div className="d-grid gap-2">
              <button type="button" className="btn btn-primary" onClick={handleClick}>問題追加</button>
              </div>
              </td><td>
              <div className="d-grid gap-2">
              <button type="submit" className="btn btn-success btn-lg">登録</button>
              </div>
              </td>
              </tr>
            </tbody></table>
          </div>

        </form>
      </Layout>
    )
  }