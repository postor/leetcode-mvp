import { useState, useEffect, useRef } from 'react'
import { debounce } from 'throttle-debounce'
import updateProblem from '../../lib/update-problem'

const SAVE_THROTTLE = 5 * 1000   //5sec

const Code = ({ problem, submitCode }) => {
  const [code, setCode] = useState('')
  const ref = useRef()
  const { _id } = problem
  useEffect(() => {
    //didMount
    let { currentAnswer, codes } = problem
    if (!currentAnswer) currentAnswer = codes
    setCode(currentAnswer)
    ref.current = debounce(SAVE_THROTTLE, saveCode)
  }, [])
  return (<div>
    <textarea
      style={{
        width: '100%',
        minHeight: '400px'
      }}
      value={code}
      onChange={e => {
        setCode(e.target.value)
        ref.current(_id, e.target.value)
      }} />
    <hr />
    <a className="waves-effect waves-light btn"
      onClick={() => submitCode(code)}
    >submit</a>
  </div>)
}

export default Code

function saveCode(_id, currentAnswer) {
  return updateProblem(_id, { currentAnswer })
}