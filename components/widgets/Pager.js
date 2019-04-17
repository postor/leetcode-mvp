class Item {
  constructor(page, text, disabled = false, active = false) {
    this.page = page
    this.text = text
    this.disabled = disabled
    this.active = active
  }
}

export default ({ total = 0, page = 1, pageSize = 50, cb = () => { } }) => {
  let maxPage = Math.ceil(total / pageSize)
  let lis = [
    new Item(page - 1, '<', page == 1),
    new Item(0, '...', true),
  ]

  for (let i = -3; i <= 3; i++) {
    let p = page + i
    if (p <= 0) continue
    if (p > maxPage) continue
    lis.push(new Item(p, p, false, i == 0))
  }

  lis = [
    ...lis,
    new Item(0, '...', true),
    new Item(page + 1, '>', page == maxPage)
  ]

  return (<ul className="pagination">
    <li className="waves-effect"><a onClick={() => cb(1)}>
      <i className="material-icons">chevron_left</i></a></li>
    {lis.map(({ page, text, disabled, active }, i) => (<li key={i} className={
      (disabled ? "disabled" : "waves-effect") + (active ? ' active' : '')}>
      <a onClick={() => disabled ? undefined : cb(page)}>{text}</a>
    </li>))}
    <li className="waves-effect"><a onClick={() => cb(maxPage)}>
      <i className="material-icons">chevron_right</i></a></li>
  </ul>)
}