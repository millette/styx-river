import React from 'react'
import Link from 'next/link'
import 'isomorphic-fetch'
import Summary from '../components/summary'

export default class MyPage extends React.Component {
  static async getInitialProps (itemUrl) {
    const id = itemUrl.query.joe

    const u = 'https://millette.cloudant.com/u2/' + encodeURIComponent(id)
    // const u = 'http://localhost:5993/u2/' + encodeURIComponent(id)
    const res = await fetch(u)
    return await res.json()
  }

  render () {
    console.log('THIS props:', this.props)
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.date}</h2>
        <div>{this.props.description}</div>
        <p>Auteur: {this.props.author}</p>
        <Link prefetch href='/'><a>Home</a></Link>
      </div>
    )
  }
}
