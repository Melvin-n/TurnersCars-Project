import React from 'react'
import '../css/header.css'

export default function Header() {
  return (
    <div id='topnav'>
          <ul id='page-links-nav'>
              <li className='page-links-nav-item'><a href='/'>Home</a></li>
              <li className='page-links-nav-item'><a href='/sell'>Sell a car</a></li>
              <li className='page-links-nav-item'><a href='/faq'>FAQ</a></li>
          </ul>
      </div>
  )
}
