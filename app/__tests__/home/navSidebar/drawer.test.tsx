/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DrawerForUnitTesting } from '../../../home/@navsidebar/drawer'

describe('Unit Testing For Sliding Drawer Component',() => {
    test('DrawerForUnitTesting',() => {
        render(<DrawerForUnitTesting />)
        expect(screen.getByRole(`button`,{ name: 'Home' })).toBeDefined()
    })
})