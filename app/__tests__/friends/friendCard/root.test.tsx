/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FriendCardButtonForUnitTesting } from '../../../friends/@friendCard/root'

describe('Unit Testing For Friend Card Component', () => {
    test('FriendCardButtonForUnitTesting',() => {
        render(<FriendCardButtonForUnitTesting />)
        expect(screen.getByRole(`button`,{ name: 'Add Friend' })).toBeTypeOf('object')
    })
    test('FriendCardButtonForUnitTesting',() => {
        render(<FriendCardButtonForUnitTesting />)
        expect(screen.getAllByText('Remove')).toBeDefined();
    })
})