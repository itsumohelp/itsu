"use client"
import { useState } from 'react'

export default function Home() {
  const [name, setName] = useState('')
  const [postedData, setPostedData] = useState('')

  const onChangeHandler = (e:any) => {
    setName(e.target.value)
  }

  const onSubmitHandler = async (e:any) => {
    e.preventDefault()

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name }),
    })

    const data = await res.json()
    setPostedData(data.body)
  }
  return (
    <main>
      <h1>Next JS APIのテスト</h1>
      <form onSubmit={onSubmitHandler} className='flex flex-col justify-center' action='/api/users' method='POST'>
          <input value={name} onChange={onChangeHandler} type='text' name='name' placeholder='名前' />
          <button type='submit'>送信</button>
        </form>
    </main>
  )
}