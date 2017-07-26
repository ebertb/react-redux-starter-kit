import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'
import { createI13nNode } from 'react-i13n'

const I13nIndexLink = createI13nNode(IndexLink, {
  isLeafNode: true,
  bindClickEvent: true,
  follow: true
})

const I13nLink = createI13nNode(Link, {
  isLeafNode: true,
  bindClickEvent: true,
  follow: true
})

export const PageLayout = ({ children }) => (
  <div className='container text-center'>
    <h1>React Redux Starter Kit</h1>
    <I13nIndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</I13nIndexLink>
    {' · '}
    <I13nLink to='/counter' activeClassName='page-layout__nav-item--active'>Counter</I13nLink>
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
