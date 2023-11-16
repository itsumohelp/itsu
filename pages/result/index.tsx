import { useState, useEffect, FormEvent, useRef } from 'react'
import { useRouter, Router } from "next/router";
import Layout from "../../components/layout"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';

type Data = {
  id: string
  entryid: string
  insertat: string
  rate: string
  name: string
}

export default function Result(props) {
  const [data, setData] = useState<Data[]>()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
        fetch('/api/answer')
        .then((response) => response.json())
        .then((data: Data[]) => setData(data))
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
      <Layout>
        <div>
        <h2>発走履歴</h2>
        <table className="table block">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">レースID</th>
              <th scope="col">発走日時</th>
              <th scope="col">結果</th>
            </tr>
          </thead>
      {data.map((result) => (
          <tbody>
            <tr>
              <td></td>
              <th scope="row"><a href={"/cert/" + result.id}>{result.name}</a></th>
              <td>{formatDate(result.insertat)}</td>
              <td>{result.rate}</td>
            </tr>
            <tr></tr>
            </tbody>
      ))
      }
        </table>
    </div>
    </Layout>
    )
    function formatDate(date) {
      return  new Date(date).toLocaleString();
    }

  }