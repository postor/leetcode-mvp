import { useState, useEffect, useReducer } from 'react'
import request from '../../lib/request'
import updateProblem from '../../lib/update-problem'

const Submitions = ({ code, problem }) => {
  const [loading, setLoading] = useState(false)
  const [answers, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    (async () => dispatch({ update: await getAnswers(problem.id) }))()
  }, [])

  useEffect(() => {
    (async () => {
      if (!code) return
      if (loading) return
      setLoading(true)
      const result = await submit(problem.key, code)
      const newAnswer = await addAnswer(problem.id, result, code)
      await updateProblem(problem._id, { done: !result.rtnCode })
      dispatch({ add: newAnswer })
      setLoading(false)
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
    createdAt: new Date() * 1,
  }
}

async function getAnswers(id) {
  const r = await request.post('/answers/find', {
    query: { problemId: parseInt(id) },
    sort: '-createdAt'
  })
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

function reducer(state, action) {
  if (action.add)
    return [action.add, ...state]
  if (action.update)
    return action.update
}