import React from 'react'
import Link from 'next/link'
import 'isomorphic-fetch'
import Summary from '../components/summary'

export default class MyPage extends React.Component {
  static async getInitialProps () {
    const res = await fetch('https://millette.cloudant.com/u2/_design/itemsDateTitlesWithGUID/_view/items?reduce=false&descending=true&limit=10&stale=update_after')
    return await res.json()
  }

  render () {
    return (
      <div>
        {this.props.rows.map((row) => {
          const it = row.value
          const id = row.id.split(':').slice(1).join(':')
          return (
            <Summary it={it} key={id} id={id}></Summary>
          )
        })}
      </div>
    )
  }
}
