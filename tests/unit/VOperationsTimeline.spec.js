import { shallowMount } from '@vue/test-utils'
import VOperationsTimeline from '@/components/VOperationsTimeline'
import VOperationsTimelineItem from '@/components/VOperationsTimelineItem'
import socketFixture from './fixtures/socketServer'

describe('TheOperationsLog', () => {
  let props

  const build = () => {
    const wrapper = shallowMount(VOperationsTimeline, {
      propsData: props
    })

    return {
      wrapper,
      operationsTimelineItems: () => wrapper.findAll(VOperationsTimelineItem)
    }
  }

  beforeEach(() => {
    props = {
      operations: []
    }
  })

  it('renders the component correctly', () => {
    // arranje
    const { wrapper } = build()

    // assert
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders a list of timeline items', () => {
    // arranje
    props.operations = [
      socketFixture.response.INSERT,
      socketFixture.response.UPDATE,
      socketFixture.response.DELETE,
    ]
    const { operationsTimelineItems } = build()
    const firstItem = operationsTimelineItems().at(0)

    // assert
    expect(operationsTimelineItems().length).toBe(props.operations.length)
    expect(firstItem.exists()).toBe(true)
    expect(firstItem.props().operation).toBe(props.operations[0])
  })

  it('updates the timeline list items', () => {
    // arranje
    const expectedOperations = [
      socketFixture.response.INSERT,
      socketFixture.response.UPDATE,
    ]

    props.operations = [
      socketFixture.response.INSERT,
      socketFixture.response.UPDATE,
      socketFixture.response.DELETE,
    ]
    const { wrapper, operationsTimelineItems } = build()
    expect(operationsTimelineItems().length).toBe(props.operations.length)

    // act
    wrapper.setProps({
      operations: expectedOperations
    })

    // assert
    expect(operationsTimelineItems().length).toBe(expectedOperations.length)
  })
})