import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'

export default class MyOnePage extends React.Component {
  static async getInitialProps (itemUrl) {
    const res = await fetch('https://millette.cloudant.com/u2/' + encodeURIComponent(['item', itemUrl.query.item].join(':')))
    return res.json()
  }

  render () {
    return (
      <div>
        <Link prefetch href='/'><a>Home</a></Link>
        <h1>{this.props.title}</h1>
        <h2>{this.props.date}</h2>
        <div dangerouslySetInnerHTML={{__html: this.props.description}} />
        <p>Auteur: {this.props.author}</p>
        <Link prefetch href='/'><a>Home</a></Link>
      </div>
    )
  }
}
