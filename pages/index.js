import React from 'react'
import router from 'next/router'
import Link from 'next/link'
import layout from '../components/layout'
import Pager from '../components/widgets/Pager'
import request from '../lib/request'

const Home = ({ list = {} }) => {
  const { rows = [], total = 0, page = 1, pageSize = 50 } = list
  if (!total) return (<div>
    <h1>No problem!</h1>
  </div>)
  return (<div>
    <ul className="collection with-header">
      <li className="collection-header"><h4>Problems</h4></li>
      {rows.map(({ id = 0, title = '', difficulty = '', done = false }, i) => (<li
        className="collection-item"
        key={i}>
        <Link href={{ pathname: '/problem', query: { id } }}>
          <a className="secondary-content left">
            <i className="material-icons">{done ? 'done' : 'turned_in'}</i>
          </a>
        </Link>
        <Link href={{ pathname: '/problem', query: { id } }}>
          <a>{id}.{title}<span className="new badge" data-badge-caption={difficulty}></span></a>
        </Link>
      </li>))}
    </ul>
    <Pager total={total} page={page} pageSize={pageSize} cb={(page) => router.push(`/index?page=${page}`)} />
  </div>)
}

Home.getInitialProps = async ({ query }) => {
  const { page = 1 } = query
  const r = await request.get('/problems/list', { params: { page } })
  return { list: r.data }
}

export default layout(Home)
