import React from 'react'

import { render } from 'tests/custom-render'
import { SearchWidget } from 'components/developer-accounts'
import { RenderResult, fireEvent } from '@testing-library/react'

let wrapper: RenderResult

beforeEach(() => {
  wrapper = render(<SearchWidget onFilter={jest.fn()} />)
})

it('should render properly', () => {
  expect(wrapper.container.firstChild).toMatchSnapshot()
})

it('should have the first filter selected by default', () => {
  const targetOption = 'accounts_table.col_group'
  expect(wrapper.getByText(targetOption)).toBeInTheDocument()
  // FIXME: need to mock i18n or remove this assertion
  // expect(wrapper.getByPlaceholderText('Filter by org')).toBeInTheDocument()
})

it('should be able to select any filter option', () => {
  const targetOption = 'accounts_table.col_admin'
  expect(wrapper.queryAllByText(targetOption).length).toEqual(0)

  const dropdownButton = wrapper.getByText('accounts_table.col_group').closest('button')
  fireEvent.click(dropdownButton as HTMLButtonElement)
  fireEvent.click(wrapper.getByText(targetOption))

  expect(wrapper.getByText(targetOption)).toBeInTheDocument()
  // FIXME: need to mock i18n or remove this assertion
  // expect(wrapper.getByPlaceholderText('Filter by admin')).toBeInTheDocument()
})
