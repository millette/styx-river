// import React from 'react'
import Link from 'next/link'

export default ({ it, id }) =>
  <div>
    <h2>{it.title}</h2>
    <h3>{it.date}</h3>
    <p><i>{id}</i></p>
    <p>{it.url}</p>
    <div dangerouslySetInnerHTML={{__html: it.summary}}></div>
    <Link prefetch href={{ pathname: '/one', query: { joe: id }}}><a>Just One</a></Link>
  </div>
