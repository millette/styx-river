import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'
import Layout from '../components/layout'

export default class MyOnePage extends React.Component {
  static async getInitialProps (itemUrl) {
    const res = await fetch('https://millette.cloudant.com/u2/' + encodeURIComponent(['item', itemUrl.query.item].join(':')))
    return res.json()
  }

  render () {
    const d = this.props.date.split('T')[0].split('-')
    const query = {
      year: d[0],
      month: d[1],
      day: d[2],
      id: this.props._id
    }
    return (
      <Layout title="One item">
        <h1>{this.props.title}</h1>
        <h2>
          <Link prefetch href={{ pathname: '/', query }}>
            <a>{this.props.date}</a>
          </Link>
        </h2>
        <p>Auteur: {this.props.author}</p>
        {this.props.categories && this.props.categories.length && <ol>
          {this.props.categories.map((t1) => {
            const t2 = t1
            const tag = t1.toLowerCase()
            return (
              <li key={tag}>
                <Link href={{ pathname: '/tags', query: { tag } }}><a>{t2}</a></Link>
              </li>
            )
          })}
        </ol>}
        <div dangerouslySetInnerHTML={{__html: this.props.description}} />
        <Link prefetch href='/'><a>Home</a></Link>
      </Layout>
    )
  }
}
