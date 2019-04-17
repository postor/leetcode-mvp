import { Component } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

export default (Page) => class Layout extends Component {
  static getInitialProps = Page.getInitialProps
  render() {
    return (<div>
      <Head>
        <title>LeetCode-mvp</title>
        <link rel="stylesheet" type="text/css" href="/assets/materialize/css/materialize.min.css" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet" />
      </Head>
      <Header />
      <div className="container">
        <Page {...this.props} />
      </div>
      <Footer />
    </div>)
  }
}