import Link from 'next/link'

export default () => (<nav>
  <div className="nav-wrapper">
    <Link href="/"><a className="brand-logo">LeetCode-mvp</a></Link>
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li><a href="https://github.com/postor/leetcode-mvp"
        target="_blank" rel="noopener noreferrer">Github</a></li>
    </ul>
  </div>
</nav>)