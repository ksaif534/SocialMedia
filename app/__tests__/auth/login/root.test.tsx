/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoginCardForUnitTesting } from '../../../auth/login/@custom/root'

describe('Unit Test For Login Form Component', () => {
    test('LoginCardForUnitTesting', () => {
        render(<LoginCardForUnitTesting />)
        expect(screen.getByRole(`heading`, { name: 'Authentication Form' })).toBeDefined()
    })
    
    test('LoginCardForUnitTesting', () => {
        render(<LoginCardForUnitTesting />)
        expect(screen.getAllByRole(`button`, {  name: /Login to Account/i }).find(button => button.id == 'submit')).toBeTruthy()
    })
})