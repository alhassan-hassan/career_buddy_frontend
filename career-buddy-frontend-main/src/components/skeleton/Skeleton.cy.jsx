import React from 'react'
import Skeleton from './Skeleton'

describe('<Skeleton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Skeleton />)
  })
})