import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'
import FeedSummary from '../components/feed-summary'
import Layout from '../components/layout'

const perPage = 10

const pad0 = (n) => n.length === 1 ? ('0' + n) : n

export default class MyPage extends React.Component {
  static async getInitialProps (oy) {
    const q = oy.query
    let u = `https://millette.cloudant.com/u2/_design/FeedsDatesV2/_view/feeds?reduce=false&limit=${perPage + 1}&descending=true&stale=update_after`
    const startWhen = []
    if (q && q.year) {
      startWhen.push(pad0(q.year))
      if (q.month) {
        startWhen.push(pad0(q.month))
        if (q.day) {
          startWhen.push(pad0(q.day))
          if (q.id) {
            u += '&startkey_docid=' + encodeURIComponent(q.id)
          }
        }
      }
      u += '&startkey=' + JSON.stringify(startWhen)
    }

    const res = await fetch(u)
    const data = await res.json()
    const rows = data.rows
    return { rows }
  }

  render () {
    const nextPage = this.props.rows[perPage]
    // console.log('NP:', nextPage)
    const query = nextPage && {
      year: nextPage.key[0],
      month: nextPage.key[1],
      day: nextPage.key[2],
      id: nextPage.id
    }

    return (
      <Layout active='sources-v2'>
        <h1>Sources V2</h1>
        {query && <Link prefetch href={{ pathname: '/sources-v2', query }}><a>Next page</a></Link>}
        {this.props.rows.slice(0, perPage).map((row) => {
          const it = row.value
          const item = row.id
          return (
            <FeedSummary it={it} key={item} item={item} />
          )
        })}
        {query && <Link prefetch href={{ pathname: '/sources-v2', query }}><a>Next page</a></Link>}
      </Layout>
    )
  }
}
