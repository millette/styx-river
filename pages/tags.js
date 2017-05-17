import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'
import Summary from '../components/summary'

export default class MyOnePage extends React.Component {
  static async getInitialProps (itemUrl) {
    let u
    // FIXME: Use cloudant URLs
    if (itemUrl.query.tag) {
      u = `http://localhost:5993/u2/_design/categories/_view/categories?reduce=false&startkey=["${itemUrl.query.tag}"]&endkey=["${itemUrl.query.tag}","\\ufff0"]&stale=update_after`
    } else if (itemUrl.req && itemUrl.req.headers && itemUrl.req.headers.host) {
      u = `http://${itemUrl.req.headers.host}/static/tags.json`
    } else {
      u = 'http://localhost:3000/static/tags.json'
    }
    const res = await fetch(u)
    const tags = await res.json()
    if (itemUrl.query.tag) {
      return { tag: itemUrl.query.tag, rows: tags.rows }
    } else {
      return { tags }
    }
  }

  render () {
    if (this.props.tags && this.props.tags.length) {
      return (
        <div>
          <Link prefetch href='/'><a>Home</a></Link>
          <h1>Tags</h1>
          <ol>
            {this.props.tags.map((tag) =>
              <li key={tag}>
                <Link href={{ pathname: '/tags', query: {tag} }}><a>{tag}</a></Link>
              </li>
            )}
          </ol>
          <Link prefetch href='/'><a>Home</a></Link>
        </div>
      )
    }
    return (
      <div>
        <h1><Link href="/"><a>Home</a></Link></h1>
        <h2><Link href="/tags"><a>Tags</a></Link></h2>
        {this.props.rows.map((row) => {
          const it = row.value
          const item = row.id.split(':').slice(1).join(':')
          return (
            <Summary it={it} key={item} item={item} />
          )
        })}
      </div>
    )
  }
}
