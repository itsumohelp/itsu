import { useState, useEffect, FormEvent, useRef } from 'react'
import { useRouter, Router } from "next/router";
import Layout from "../../components/layout"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import Res from "../goal/res"

export default function Entry() {
  const [isLoading, setLoading] = useState(true)
  const router = useRouter();
  const {answerid} = router.query
    return (
      <Layout>
      <Res answerid={answerid} />
    </Layout>
    )
  }