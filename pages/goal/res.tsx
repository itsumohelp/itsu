import { useState, useEffect } from 'react'
import { useRouter } from "next/router";

type Data = {
  sequence: string
  correct: string
  input: string
  result: string
}

type List = {
  rate: string
  list: Data[]
}

export default function Res(props) {
  const [data, setData] = useState<List>()
  const [isLoading, setLoading] = useState(true)
  console.log(props)

  useEffect(() => {
        fetch('/api/res/' + props.answerid)
        .then((response) => response.json())
        .then((data: List) => setData(data))
        setLoading(false)
      }
    , [props] )
    if (isLoading) return (
      <div className="spinner-border text-primary" role="status">
      <span className="sr-only"></span>
      </div>
    )
    if (!data) return <div> </div>
    return (
      <div>
        <h2>あなたの正解率は {data.rate}% でした</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">選択</th>
              <th scope="col">解答</th>
              <th scope="col">結果</th>
            </tr>
          </thead>
      {data.list.map((result) => (
          <tbody>
            <tr>
              <th scope="row">{result.sequence}</th>
              <td>{result.input}</td>
              <td>{result.correct}</td>
              <td>{result.result}</td>
            </tr>
            <tr></tr>
            </tbody>
      ))
      }
        </table>
    </div>
    )
  }

//   <li className="list-group-item" key={result.id}>
//   <table width="100%"><tbody>
//     <tr>
//       <td>
//         <h5 className="card-title">{result.correct}</h5>
//         <p className="card-text">{result.input}</p>
//       </td>
//     </tr>
//   </tbody></table>
// </li>