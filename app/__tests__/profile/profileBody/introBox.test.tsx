/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { IntroBoxForUnitTesting } from '../../../profile/@profileBody/root'

describe('Unit Testing For Intro Box', () => {
    test('IntroBoxForUnitTesting',() => {
        render(<IntroBoxForUnitTesting />)
        expect(screen.getByRole(`heading`,{ name: 'Intro' })).toBeDefined()
    })
    test('IntroBoxForUnitTesting',() => {
        render(<IntroBoxForUnitTesting />)
        expect(screen.getAllByText('Ka-115/6/1,Mohakhali Dakkhin Para, Dhaka-1212')).toBeTruthy()
    })
})