import Layout from "../components/layout"
import { useSession } from "next-auth/react"
import Entry from "./entry"
import Firstrun from "./firstrun"


export default function IndexPage() {
  const { data: session } = useSession()
  return (
    <Layout>
      <h1>知識を可視しよう</h1>
      <p>認定試験やクイズを作成できいろいろな人に挑戦してもらうことができます。自分の知識や体験を資格にして他の人と共感してみませんか？</p>
      <Firstrun /><br/>
      <h3>注目のレース</h3>
      <Entry />
<br/><br/>
    <div className="fixed-bottom bg-white">
      <table width="100%"><tbody>
        <tr><td>
        <div className="d-grid gap-2">
          <button className="btn btn-primary btn-lg" type="button">レースを探す</button>
        </div>
        </td><td>
        <div className="d-grid gap-2">
          <a href="/make" className="btn btn-primary btn-lg">レースを作る</a>
        </div>
        </td><td>
          <a href="/result" className="btn btn-secondary">発走履歴</a>
        </td>
        </tr>
      </tbody></table>
    </div>
    </Layout>
 )
}