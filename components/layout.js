import Link from 'next/link'
import Head from 'next/head'

export default ({ children, active, title = 'Observatoire québécois du libre' }) =>
  <div>
    <Head>
      <title> OILQ { title }</title>
      <meta charset='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.1/css/foundation.min.css' integrity='sha256-itWEYdFWzZPBG78bJOOiQIn06QCgN/F0wMDcC4nOhxY=' crossorigin='anonymous' />
    </Head>
    <div className='row column'>
      <header>
        <ul className='menu'>
          <li className={active === 'home' && 'active'}><Link prefetch href='/'><a>Home</a></Link></li>
          <li className={active === 'tags' && 'active'}><Link prefetch href='/tags'><a>Tags</a></Link></li>
          <li className={active === 'sources' && 'active'}><Link prefetch href='/sources'><a>Sources</a></Link></li>
          <li className={active === 'sources-v2' && 'active'}><Link prefetch href='/sources-v2'><a>Sources V2</a></Link></li>
          <li className={active === 'about' && 'active'}><Link prefetch href='/about'><a>About</a></Link></li>
        </ul>
      </header>
      { children }
      <footer className='footer'>
        <p>Par <a href='http://robin.millette.info/'>Robin Millette</a></p>
      </footer>
    </div>
  </div>
