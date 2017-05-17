import Link from 'next/link'

export default ({ it, id }) =>
  <div>
    <h2><Link prefetch href={{ pathname: '/one', query: { item: id } }}><a>{it.title}</a></Link></h2>
    <h3>{it.date}</h3>
    <p><i>{id}</i></p>
    <p>{it.url}</p>
    <div dangerouslySetInnerHTML={{__html: it.summary}} />
  </div>
