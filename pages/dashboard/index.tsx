import { FormEvent, useEffect, useState } from "react";
import Layout from "../../components/layout"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Data = {
  id: string
  name: string
  rate: string
  insertat: string
}

export default function dashboard() {
  const { data: session, status } = useSession()
  const [data, setData] = useState<Data[]>([])
  const [isLoading, setLoading] = useState(true)
  console.log(session)

  const router = useRouter();
  useEffect(() => {
      if(router.isReady) {
        fetch('/api/answer/user/clnho0qlz0000m5qbaf9bxcfl')
        .then((response) => response.json())
        .then((data: Data[]) => setData(data))
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
        こんにちわ！まる丸さん！
        <h1>走ったレース</h1>
        {data.map((entry) => (
          <>
          {entry.id} , {entry.name} , {entry.rate} , {entry.insertat}<br/>
          </>
        ))}

        <h1>作ったレース</h1>
      </Layout>
    )
  } 