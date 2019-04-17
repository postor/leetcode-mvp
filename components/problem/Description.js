import Markdown from 'react-markdown'

export default ({ problem }) => {
  const { id, title, difficulty, description } = problem
  return (<div style={{ paddingTop: 1 }}>
    <h6>{id}.{title}</h6>
    <div className="bar">
      <span>{difficulty}</span>
      <span> <i className="material-icons">thumb_up</i> 0 </span>
      <span> <i className="material-icons">thumb_down</i> 0 </span>
      <span> <i className="material-icons">favorite</i> favorite </span>
      <span> <i className="material-icons">share</i> share </span>
    </div>
    <hr />
    <Markdown source={description} />
    <style jsx>{`
    .bar {
      margin: 15px 0;
    }

    .bar > span {
      margin-right: 15px;
    }

    .bar .material-icons {
      font-size: 16px;
    }
    `}</style>
  </div>)
}