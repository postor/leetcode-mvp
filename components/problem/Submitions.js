import { useState, useEffect } from 'react'
import request from '../../lib/request'

const Submitions = ({ code, problem }) => {
  const [loading, setLoading] = useState(false)
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    (async () => setAnswers(await getAnswers(problem.id)))()
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
        {answers.map(({ rtnCode, stderr }, i) => (<li key={i} className="collection-item">
          <div title={stderr} style={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            color: rtnCode ? 'red' : 'green',
          }} >{rtnCode ? stderr : 'pass'}</div>
        </li>))}
      </ul>)
    })()}

  </div>)
}

export default Submitions

async function submit(key, code) {
  const r = await request.post('/runner', { key, code })

  return {
    ...r.data,
    rtnCode: r.data.code,
    code,
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