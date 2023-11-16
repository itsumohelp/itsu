import { useState, useEffect } from 'react'

type Data = {
  id: string
  name: string
  description: string
}

export default function Firstrun() {   
    return (
      <div>
        <div className="card w-full mb-1">
          <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <table width="100%"><tbody>
                  <tr>
                    <td>
                      <h5 className="card-title">itumoとはなんですか？</h5>
                      <p className="card-text">走りながら使い方やコンセプトをお伝えします</p>
                    </td>
                    <td width="80">
                      <a href="/entry/1" className="btn btn-primary">走る！</a>
                    </td>
                  </tr>
                </tbody></table>
              </li>
          </ul>            
        </div>
      </div>
    )
  }