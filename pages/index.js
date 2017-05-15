import React from 'react'
import Link from 'next/link'
import 'isomorphic-fetch'

export default class MyPage extends React.Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const res = await fetch('http://localhost:5993/u2/item%3Ahttps%3A%2F%2Fwww.r0x.fr%2Fsujet%2Fla-playlist-r0x-fr.12678%2F')
    return await res.json()
  }

  render () {
    return (
      <div>
        <p>Next.js has {this.props.title} ⭐️</p>
        <p>{this.props.date}</p>
        <p>{this.props.link}</p>
        <Link prefetch href='/preact'><a>How about preact?</a></Link>
      </div>
    )
  }
}
