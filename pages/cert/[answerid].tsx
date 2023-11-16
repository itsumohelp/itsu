import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import Headerless from '../../components/headerless'
import styles from "./header.module.css"

type Data = {
  id: string
  userid: string
  entryid: string
  insertat: string
  rate: string
  name: string
}

export default function Cert() {
  const [data, setData] = useState<Data>()
  const [isLoading, setLoading] = useState(true)

  const router = useRouter();
  const {answerid} = router.query;
  useEffect(() => {
      if(router.isReady) {
        fetch('/api/answer/' + answerid)
        .then((response) => response.json())
        .then((data: Data) => setData(data))
        setLoading(false)
      }
    }, [router.isReady])
    if (isLoading) return (
      <div className="spinner-border text-primary" role="status">
      <span className="sr-only"></span>
      </div>
    )
    if (!data) return <Headerless><div>error</div></Headerless>
    return (
      <Headerless>
            <div className="card w-full mb-2 border-primary border-5 text-center">
                <h1>{data.name}</h1>
                <h2>{data.rate}</h2>
                {formatDate(data.insertat)}
            <p className="m-3">このスコアを取得したことを証明いたします</p>

            <p className='ps-2 text-secondary'>
              レース提供　{data.userid} (1.0.0)<br/>
            </p>
            <h1 className="m-3">ITSUMO</h1>
            <p className='ps-2 text-secondary'>{data.id}</p>
            </div>
            </Headerless>
    )
    function formatDate(date) {
      return  new Date(date).toLocaleString();
    }
  }