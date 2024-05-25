/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PeopleCardForUnitTesting } from '../../../../groups/@groupDetails/@people/root'

describe('Unit Testing For People Tab Of Group Details', () => {
    test('PeopleCardForUnitTesting',() => {
        render(<PeopleCardForUnitTesting />)
        expect(screen.getAllByRole('img', { name: 'Saif Kamal' })).toBeDefined()
    })
})