/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PostCardForUnitTesting } from '../../../home/@posts/root'

describe('Unit Testing For Post Card', () => {
    test('PostCardForUnitTesting',() => {
        render(<PostCardForUnitTesting />)
        expect(screen.getByText('How to build a React web application')).toBeDefined()
    })
    test('PostCardForUnitTesting',() => {
        render(<PostCardForUnitTesting />)
        expect(screen.getByRole(`button`, { name: 'Submit Comment' })).toBeDefined()
    })
    test('PostCardForUnitTesting',() => {
        render(<PostCardForUnitTesting />)
        expect(screen.getAllByTitle('Delete Comment')).toBeTruthy()
    })
})