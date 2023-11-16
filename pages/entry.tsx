import { useState, useEffect } from 'react'

type Data = {
  id: string
  name: string
  description: string
}

export default function Entry() {
  const [data, setData] = useState<Data[]>([])
   
    useEffect(() => {
      fetch('/api/entry')
      .then((response) => response.json())
      .then((data: Data[]) => setData(data))
    }, [])
   
    return (
      <div>
        <div className="card w-full mb-1">
          <ul className="list-group list-group-flush">
            {data.map((entry) => (
              <li className="list-group-item" key={entry.id}>
                <table width="100%"><tbody>
                  <tr>
                    <td>
                      <h5 className="card-title">{entry.name}</h5>
                      <p className="card-text">{entry.description}</p>
                    </td>
                    <td width="60">
                      <a href={"/entry/" + entry.id} className="btn btn-primary">走る</a>
                    </td>
                  </tr>
                </tbody></table>
              </li>
    				))}
          </ul>            
        </div>
      </div>
    )
  }