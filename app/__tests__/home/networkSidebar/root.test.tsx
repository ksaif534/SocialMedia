/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContactCardForUnitTesting } from '../../../home/@networkSidebar/root'

describe('Unit Testing For Contact Card In Network Sidebar', () => {
    test('ContactCardForUnitTesting', () => {
        render(<ContactCardForUnitTesting />)
        expect(screen.getByRole(`menuitem`,{ name: 'Delete Message' })).toBeDefined()
    })
})