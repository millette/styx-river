import React from 'react'
import Link from 'next/link'
import 'isomorphic-fetch'
import Summary from '../components/summary'

export default class MyPage extends React.Component {
  static async getInitialProps () {
    const u = 'https://millette.cloudant.com/u2/_design/itemsDateTitlesWithGUID/_view/items?reduce=false&descending=true&limit=10&stale=update_after'
    // const u = 'http://localhost:5993/u2/_design/itemsDateTitlesWithGUID/_view/items?reduce=false&descending=true&limit=10&stale=update_after'
    const res = await fetch(u)
    return await res.json()
  }

  render () {
    return (
      <div>
        {this.props.rows.map((row) => {
          const it = row.value
          const id = row.id
          return (
            <Summary it={it} id={id}></Summary>
          )
        })}
      </div>
    )
  }
}
