import { useState, useEffect, FormEvent, useRef } from 'react'
import { useRouter, Router } from "next/router";
import Layout from "../../components/layout"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';

type Detail = {
  id: string
  entryid: string
  section: string
  sequence: number
  value: string
  type: number
  supplement: string
}

type Choise = {
  id: string
  entryid: string
  section: string
  sequence: number
  answer: string
}

type AnswerDetail = {
  id: string
  answerid: string
  section: string
  sequence: number
  answer: string
  value: string
}

export default function Entry() {
  const [data, setData] = useState<Detail[]>([])
  const [choise, setChoise] = useState<Choise[]>([])
  const [isLoading, setLoading] = useState(true)

  const router = useRouter();
  const {entryid} = router.query;
  let count:number = 0
  let current:number = 0
  const mainRef = useRef<Splide>(null);

  useEffect(() => {
      if(router.isReady) {
        fetch('/api/detail/' + entryid)
        .then((response) => response.json())
        .then((data: Detail[]) => setData(data))
        setLoading(false)
      }
    }, [router.isReady])

  useEffect(() => {
    if(router.isReady) {
      fetch('/api/choise/' + entryid)
      .then((response) => response.json())
      .then((choise: Choise[]) => setChoise(choise))
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

async function onSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const formData = new FormData(event.currentTarget)
  console.log(formData);
  let answerDetail:AnswerDetail[] = [];
  const response = await fetch('/api/goal/' + entryid, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
  const data = await response.json()
  window.location.replace('/goal/' + data);
}


async function onRadioClick() {
  if(!mainRef.current) return
  mainRef.current.go('>')
}
    return (
      <Layout>
        <form onSubmit={onSubmit} >
        <Splide id="image-carousel"
        aria-label="私のお気に入りの画像集"
        options={{
          autoplay: false,
          arrows: false,
        }}
        ref={mainRef}
      >
          {data.map((entry) => (
            <SplideSlide>
              <div className='slide-img'>
              <div className='d-block w-100 h-100 bg-light pt-2 pb-2 ps-5 pe-5'>
                <h1>{entry.value}</h1>
                <p>{entry.supplement}</p>
              {choise.map((item) => (
                (() => {
                  if (item.section === entry.section && item.sequence === entry.sequence) {
                    return (
                      <div className="form-check" id={`${count}`}>
                        <input onClick={onRadioClick} className="form-check-input" type="radio" name={item.sequence.toString()} value={item.id} />
                        <label className="form-check-label" htmlFor={item.id}>
                          {item.answer}
                        </label>
                      </div>
                    )
                  }
                })()
              ))
              }
              </div>
            </div>
            </SplideSlide>
          )
        )}
        </Splide>
        <style jsx>{`
        .slide-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
        <button type="submit">Submit</button>
        </form>
      </Layout>
    )
    function Check() {
      current += 1
    }
  }