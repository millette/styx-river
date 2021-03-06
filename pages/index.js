import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'
import Summary from '../components/summary'
import Layout from '../components/layout'

const perPage = 5

const pad0 = (n) => n.length === 1 ? ('0' + n) : n

export default class MyPage extends React.Component {
  static async getInitialProps (oy) {
    const q = oy.query
    let u = `https://millette.cloudant.com/u2/_design/itemsDateTitlesWithGUID/_view/items?reduce=false&descending=true&limit=${perPage + 1}&stale=update_after`

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
    return res.json()
  }

  render () {
    const nextPage = this.props.rows[perPage]
    const query = nextPage && {
      year: nextPage.key[0],
      month: nextPage.key[1],
      day: nextPage.key[2],
      id: nextPage.id
    }

    return (
      <Layout active='home'>
        {query && <Link prefetch href={{ query }}>
          <ul className='pagination text-center' role='navigation' ariaLabel='Pagination'>
            <li className='pagination-next'>
              <a ariaLabel='Next page'>Next <span className='show-for-sr'>page</span></a>
            </li>
          </ul>
        </Link>}
        {this.props.rows.slice(0, perPage).map((row) => {
          const it = row.value
          const item = row.id.split(':').slice(1).join(':')
          return (
            <Summary it={it} key={item} item={item} />
          )
        })}

        {query && <Link prefetch href={{ query }}>
          <ul className='pagination text-center' role='navigation' ariaLabel='Pagination'>
            <li className='pagination-next'>
              <a ariaLabel='Next page'>Next <span className='show-for-sr'>page</span></a>
            </li>
          </ul>
        </Link>}
      </Layout>
    )
  }
}
