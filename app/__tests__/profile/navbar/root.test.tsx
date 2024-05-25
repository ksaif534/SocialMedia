/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AppBarForUnitTesting } from '../../../profile/@navbar/root'

describe('Unit Testing For App Bar Component',() => {
    test('AppBarForUnitTesting',() => {
        render(<AppBarForUnitTesting />)
        expect(screen.getByTitle('Home')).toBeDefined()
    })
})