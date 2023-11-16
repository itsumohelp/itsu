import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Layout from "../../components/layout"
import Res from "./res"

type Data = {
  id: string
  name: string
  description: string
  explanation: string
  benefit: string
  certificate: string
}

export default function Entry() {
  const [data, setData] = useState<Data>()
  const [isLoading, setLoading] = useState(true)

  const router = useRouter();
  const {answerid} = router.query;
  useEffect(() => {
      if(router.isReady) {
        fetch('/api/entry/answer/' + answerid)
        .then((response) => response.json())
        .then((data: Data) => setData(data))
        setLoading(false)
      }
    }, [router.isReady])
    if (isLoading) return (
      <Layout>
      <div className="spinner-border text-primary" role="status">
      <span className="sr-only"></span>
      </div>
      </Layout>
    )
    if (!data) return <Layout> </Layout>
    return (
      <Layout>
            <h1>完走おめでとうございます！</h1>
            <div className="card w-full mb-2">
            <div className="card-body">
            <h3 className="card-title">{data.name}</h3>
            <h5 className="card-title">{data.description}</h5>
              <h6 className="card-subtitle mb-2 text-muted">平均走行時間　10分</h6>
              <p className="card-text">{data.explanation}</p>
              <Res answerid={answerid} />
              <div style={{textAlign: "center"}}>
              <a href="/" className="btn btn-secondary">戻る</a>
              </div>
            </div>
          </div>
      </Layout>
    )
  }