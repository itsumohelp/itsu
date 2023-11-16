import { FormEvent, useEffect } from "react";
import Layout from "../../components/layout"
import { useSession } from "next-auth/react";


type Entry = {
  name: string
  description: string
  explanation: string
  benefit: number
  certificate: string
}

export default function make() {   
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = '/api/auth/signin'
    },
  })


  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()  
    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/entry/add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
    const data = await response.json()
    window.location.replace('/make/' + data);
  }

  return (
      <Layout>
        <form onSubmit={onSubmit} >
          <h2>レースを作ります！</h2>
          <div className="form-group">
            レース名と走る人への説明を記入してください。名前は15字前後がよく読まれます。<br/><br/>
            <input type="text" className="form-control" id="name" name="entryName" aria-describedby="emailHelp" placeholder="マラソン名" />
            <br/>
            <textarea className="form-control" id="exampleInputEmail1" name="explanation" aria-describedby="emailHelp" placeholder="マラソンの説明" />
          </div><br/>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button type="submit" className="btn btn-primary">次へ</button>
          </div>
        </form>
      </Layout>
    )
  } 