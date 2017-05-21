export default ({ it, item }) => {
  const lang = it.meta && it.meta.language && <small>({it.meta.language})</small>
  const by = it.meta && it.meta.author && <h4>By {it.meta.author}</h4>
  const gen = it.meta && it.meta.generator && <p>Generator: {it.meta.generator}</p>

  // console.log(it)
  return <div>
    <h3>{(it.meta && it.meta.title) || item} {lang}</h3>
    {it.meta && it.meta.image && <img style={{float: 'left'}} src={it.meta.image.url} />}
    {by}
    <p><b>{it.error}</b></p>
    <p>{(it.meta && it.meta.date) || (it.meta && it.meta.pubdate)}</p>
    <p>{it.meta && it.meta.link}</p>
    <p>{it.meta && it.meta.description}</p>
    {gen}
  </div>
}
