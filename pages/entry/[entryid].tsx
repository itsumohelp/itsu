import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import Layout from "../../components/layout"

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
  const {entryid} = router.query;
  useEffect(() => {
      if(router.isReady) {
        fetch('/api/entry/' + entryid)
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
            <h1>{data.name}</h1>
            <div className="card w-full mb-2">
            <div className="card-body">
              <h5 className="card-title">{data.description}</h5>
              <h6 className="card-subtitle mb-2 text-muted">平均走行時間　10分</h6>
              <p className="card-text">{data.explanation}</p>
              <b>この走りで得られるもの</b><br/>
              {data.benefit}<br/><br/>
              <b>認定条件</b><br/>
              {data.certificate}
              <br/><br/>
              <div style={{textAlign: "center"}}>
              <a href="/" className="btn btn-secondary">戻る</a>　
              <a href={"/run/" + data.id} className="btn btn-success btn-lg">出発！</a>
              </div>
            </div>
          </div>
      </Layout>
    )
  }