import Link from 'next/link'
import Head from 'next/head'

export default ({ children, title = 'Observatoire québécois du libre' }) =>
  <div>
    <Head>
      <title> OILQ { title }</title>
      <meta charset='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <header>
      <nav>
        <Link prefetch href='/'><a>Home</a></Link> |
        <Link prefetch href='/tags'><a>Tags</a></Link> |
        <Link prefetch href='/about'><a>About</a></Link>
      </nav>
    </header>
    { children }
    <footer>
      <p>Par <a href='http://robin.millette.info/'>Robin Millette</a></p>
    </footer>
  </div>
