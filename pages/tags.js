import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'
import Summary from '../components/summary'
import Layout from '../components/layout'
import tags from '../data/tags.json'

// FIXME: add pager as in index.js
export default class MyOnePage extends React.Component {
  static async getInitialProps (itemUrl) {
    if (itemUrl.query.tag) {
      const u = `https://millette.cloudant.com/u2/_design/categories/_view/categories?reduce=false&startkey=["${itemUrl.query.tag.toLowerCase()}","\\ufff0"]&endkey=["${itemUrl.query.tag.toLowerCase()}"]&stale=update_after&descending=true`
      const res = await fetch(u)
      const all = await res.json()
      const rows = all.rows
      return { tag: itemUrl.query.tag.toLowerCase(), rows }
    }
    return { tags }
  }

  render () {
    if (this.props.tags && this.props.tags.length) {
      return (
        <Layout title='Tags'>
          <h1>Tags</h1>
          <ol>
            {this.props.tags.map((tag) => {
              tag = tag.toLowerCase()
              return (
                <li key={tag}>
                  <Link href={{ pathname: '/tags', query: { tag } }}><a>{tag}</a></Link>
                </li>
              )
            })}
          </ol>
          <Link prefetch href='/'><a>Home</a></Link>
        </Layout>
      )
    }
    if (this.props.rows && this.props.rows.length) {
      return (
        <Layout title='By tags'>
          <h1>By tags</h1>
          {this.props.rows.map((row) => {
            const it = row.value
            const item = row.id.split(':').slice(1).join(':')
            return (
              <Summary it={it} key={item} item={item} />
            )
          })}
        </Layout>
      )
    }
    return <p>Weird...</p>
  }
}
