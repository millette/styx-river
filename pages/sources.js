import React from 'react'
import fetch from 'isomorphic-fetch'
import Layout from '../components/layout'

const ss = (a, b) => {
  const va = a.value
  const vb = b.value
  if (va > vb) { return 1 }
  if (va < vb) { return -1 }
  return 0
}

export default class MyPage extends React.Component {
  static async getInitialProps (oy) {
    const year = (oy && oy.query && oy.query.year) || '2017'
    const u = `https://millette.cloudant.com/u2/_design/itemSourcesYear/_view/items?group_level=2&startkey=["${year}"]&endkey=["${year}","\\ufff0"]`
    const res = await fetch(u)
    const data = await res.json()
    const rows = data.rows
      .sort(ss)
      .reverse()
      .map((row) => {
        return {
          source: row.key[1],
          count: row.value
        }
      })
    return { rows }
  }

  render () {
    return (
      <Layout active='sources'>
        <h1>Sources ({this.props.rows.length})</h1>
        <ol>
          {this.props.rows.map((row) => <li key={row.source}>
            {row.source} ({row.count})
          </li>)}
        </ol>
      </Layout>
    )
  }
}
