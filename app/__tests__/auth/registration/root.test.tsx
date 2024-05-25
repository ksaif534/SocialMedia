/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { expect, test, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RegistrationCardForUnitTesting } from '../../../auth/registration/@custom/root'

describe('Unit Testing For Registration Form Component', () => {
    test('RegistrationCardForUnitTesting', () => {
        render(<RegistrationCardForUnitTesting />)
        expect(screen.getByRole(`img`, { name: '' })).toBeDefined()
    })
    test('Unit Testing For Registration Form Component', () => {
        render(<RegistrationCardForUnitTesting />)
        expect(screen.getAllByText(`Upload Your Image`, { selector: '*' })).toBeDefined()
    })
})
