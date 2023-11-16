import type { ReactNode } from "react"
import 'bootstrap/dist/css/bootstrap.css'

export default function Headerless({ children }: { children: ReactNode }) {
  return (
      <main>{children}</main>
  )
}
