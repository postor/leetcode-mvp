import { useState, useEffect } from 'react'
import { debounce } from 'throttle-debounce'
import request from '../../lib/request'

const SAVE_THROTTLE = 5 * 1000   //5sec
const deboncedSaveCode = debounce(SAVE_THROTTLE, saveCode)
const languages = ['nodejs', 'java']

const Code = ({ problem, submitCode }) => {
  const [language, setLanguage] = useState('nodejs')
  const [code, setCode] = useState('')
  const [codeId, setCodeId] = useState('')
  const { _id } = problem

  useEffect(() => {
    const { codes = {} } = problem
    loadCode(language, _id).then(obj => {
      if (obj) {
        setCode(obj.code)
        setCodeId(obj._id)
        return
      }
      setCode(codes[language])
      createCode({
        code: codes[language],
        problemId: _id,
        language,
      }).then(({ _id }) => setCodeId(_id))
    })
  }, [language])

  return (<div>
    <div className="input-field col s12">
      <select
        style={{ display: 'block' }}
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >{languages.map((lang, i) => (<option key={i} value={lang}>{lang}</option>))}</select>
    </div>
    <hr />
    <textarea
      style={{
        width: '100%',
        minHeight: '400px'
      }}
      value={code || ''}
      onChange={e => {
        setCode(e.target.value)
        const obj = {
          _id: codeId,
          code: e.target.value,
        }
        deboncedSaveCode(obj)
      }} />
    <hr />
    <a className="waves-effect waves-light btn"
      onClick={() => submitCode(code, language)}
    >submit</a>
  </div>)
}

export default Code

async function saveCode(obj) {
  await request.post('/codes/update', obj)
}

async function createCode(obj) {
  let r = await request.post('/codes/create', obj);
  return r.data
}

async function loadCode(language, problemId) {
  const r = await request.post('/codes/find', {
    query: { problemId, language }
  })
  return r.data && r.data[0]
}