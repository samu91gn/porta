import React from 'react'
import { AlertsProvider, useAlertsContext } from 'components'
import { render } from 'tests/custom-render'

it('returns null when there is no provider', () => {
  const ComponentWithoutProvider = () => {
    const { addAlert } = useAlertsContext()
    expect(addAlert).toBeUndefined()
    return <></>
  }

  render(<ComponentWithoutProvider />)
})

it('returns addAlert when there is a provider', () => {
  const ComponentWithProvider = () => {
    const { addAlert } = useAlertsContext()
    expect(addAlert).toBeDefined()
    return <></>
  }

  render(
    <AlertsProvider>
      <ComponentWithProvider />
    </AlertsProvider>
  )
})
