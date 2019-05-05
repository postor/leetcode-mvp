import { useState } from 'react'
import request from '../lib/request'
import layout from '../components/layout'
import Description from '../components/problem/Description'
import Submitions from '../components/problem/Submitions'
import Code from '../components/problem/Code'

const tabs = [
  {
    text: 'Description',
    Comp: Description,
  }, {
    text: 'Solution',
    Comp: () => false,
  }, {
    text: 'Submitions',
    Comp: Submitions,
  }, {
    text: 'Discuss',
    Comp: () => false,
  }
]

const Problem = ({ problem, id }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const [code, setCode] = useState('')
  const { Comp } = tabs[tabIndex]
  if (!problem) return (<h1>problem #{id} not found!</h1>)
  return (<div className="row">
    <div style={{ height: 15, width: "100%", clear: 'both' }}></div>
    <div className="col l6">
      <div className="row">
        <div className="col s12">
          <ul className="tabs">
            {tabs.map(({ text }, i) => (<li key={i} className="tab col s3">
              <a
                style={{ padding: 0, borderBottom: tabIndex == i ? "2px solid #f6b2b5" : "none" }}
                className={tabIndex == i ? "active" : ""}
                onClick={() => setTabIndex(i)}
              >{text}</a></li>))}
          </ul>
        </div>
        <div style={{ height: 15, width: "100%", clear: 'both' }}></div>
        <Comp problem={problem} code={code} />
      </div>
    </div>
    <div className="col l6">
      <Code
        problem={problem}
        submitCode={(code) => {
          setCode(code)
          setTabIndex(2)
        }}
      />
    </div>
  </div>)
}

Problem.getInitialProps = async ({ query }) => {
  const { id } = query
  const r = await request.post('/problems/find', { query: { id: parseInt(id) } })
  return {
    problem: r.data && r.data[0],
    id,
  }
}

export default layout(Problem)