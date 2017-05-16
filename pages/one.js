import React from 'react'
import Link from 'next/link'
import 'isomorphic-fetch'
import Summary from '../components/summary'

export default class MyOnePage extends React.Component {
  static async getInitialProps (itemUrl) {
    const res = await fetch('https://millette.cloudant.com/u2/' + encodeURIComponent(['item', itemUrl.query.joe].join(':')))
    return await res.json()
  }

  render () {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.date}</h2>
        <div dangerouslySetInnerHTML={{__html: this.props.description}}></div>
        <p>Auteur: {this.props.author}</p>
        <Link prefetch href='/'><a>Home</a></Link>
      </div>
    )
  }
}
