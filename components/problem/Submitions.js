import { useState, useEffect } from 'react'
import request from '../../lib/request'

const Submitions = ({ code, problem }) => {
  const [loading, setLoading] = useState(false)
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    (async () => setAnswers(await getAnswers()))()
  }, [])

  useEffect(() => {
    (async () => {
      if (!code) return
      if (loading) return
      setLoading(true)
      const result = await submit(problem.key, code)
      const newAnswer = await addAnswer(problem.id, result, code)
      setAnswers([newAnswer, ...answers])
    })()
  }, [code])

  return (<div>
    {loading && (<div className="progress">
      <div className="indeterminate"></div>
    </div>)}
    {(() => {
      if (!answers.length) return (<h4>no submition yet!</h4>)
      return (<ul className="collection with-header">
        <li className="collection-header"><h4>Submitions</h4></li>
        {answers.map(({ rtnCode, stdout }, i) => (<li key={i} className="collection-item">
          <div title={stdout} style={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            color: rtnCode ? 'red' : 'green',
          }} >{rtnCode ? stdout : 'pass'}</div>
        </li>))}
      </ul>)
    })()}

  </div>)
}

export default Submitions

async function submit(key, code) {
  return {
    rtnCode: 0,
    stdout: 'hello'
  }
}

async function getAnswers(id) {
  const r = await request.post('/answers/find', { query: { problemId: parseInt(id) } })
  return r.data
}

async function addAnswer(problemId, result, code) {
  const r = await request.post('/answers/create', {
    ...result,
    problemId,
    code,
  })
  return r.data
}