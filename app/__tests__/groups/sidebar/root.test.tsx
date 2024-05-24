/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SidebarGroupsForUnitTesting } from '../../../groups/@sidebar/root'

describe('Unit Testing For Sidebar Group Section',() => {
    test('SidebarGroupsForUnitTesting',() => {
        render(<SidebarGroupsForUnitTesting />)
        expect(screen.getByText('All about Business', { exact: true })).toBeTypeOf('object')
    })
})