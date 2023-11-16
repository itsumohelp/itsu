import { useState, useEffect, FormEvent, useRef } from 'react'
import { useRouter, Router } from "next/router";
import Layout from "../components/layout"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';

type Answer = {
  id: string
  userid: string
  entryid: string
  rate: number
}
export default function Entry() {
  const [data, setData] = useState<Answer[]>([])
  const [isLoading, setLoading] = useState(true)

  const router = useRouter();
  let count:number = 0
  let current:number = 0
  const mainRef = useRef<Splide>(null);

  useEffect(() => {
      if(router.isReady) {
        fetch('/api/result')
        .then((response) => response.json())
        .then((data: Answer[]) => setData(data))
        setLoading(false)
      }
    }, [router.isReady])
  
    return (
      <Layout>
        <h2>マラソン履歴</h2>
        <p>直近で走ったマラソン</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">マラソン</th>
              <th scope="col">解答</th>
              <th scope="col">結果</th>
            </tr>
          </thead>
          {data.map((answer) => (
          <tbody>
            <tr>
              <td>{answer.entryid}</td>
              <td><a href={"/result/"+answer.id} >{answer.id}</a></td>
              <td>{answer.rate}</td>
            </tr>
            <tr></tr>
            </tbody>
      ))
      }
        </table>
      </Layout>
    )
  }