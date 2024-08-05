import { debounce } from '../helper'

describe('debounce', () => {
  let func: jest.Mock

  beforeEach(() => {
    func = jest.fn()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
  })

  it('should call the function after the specified delay', () => {
    const debouncedFunc = debounce(func, 200)

    // Call the debounced function
    debouncedFunc()

    // Fast forward time by 200 milliseconds
    jest.advanceTimersByTime(200)

    // Verify that the function was called once
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should not call the function before the delay', () => {
    const debouncedFunc = debounce(func, 200)

    // Call the debounced function
    debouncedFunc()

    // Fast forward time by less than the delay (100 milliseconds)
    jest.advanceTimersByTime(100)

    // Verify that the function was not called
    expect(func).not.toHaveBeenCalled()
  })

  it('should call the function only once if called multiple times within the delay', () => {
    const debouncedFunc = debounce(func, 200)

    // Call the debounced function multiple times within 200 milliseconds
    debouncedFunc()
    debouncedFunc()
    debouncedFunc()

    // Fast forward time by 200 milliseconds
    jest.advanceTimersByTime(200)

    // Verify that the function was called only once
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should call the function with the correct arguments', () => {
    const debouncedFunc = debounce(func, 200)

    // Call the debounced function with arguments
    debouncedFunc('arg1', 'arg2')

    // Fast forward time by 200 milliseconds
    jest.advanceTimersByTime(200)

    // Verify that the function was called with the correct arguments
    expect(func).toHaveBeenCalledWith('arg1', 'arg2')
  })

  it('should reset the delay if called again within the delay period', () => {
    const debouncedFunc = debounce(func, 200)

    // Call the debounced function and then call it again after 100 milliseconds
    debouncedFunc()
    jest.advanceTimersByTime(100)
    debouncedFunc()

    // Fast forward time by 100 milliseconds (total 200 milliseconds from the first call)
    jest.advanceTimersByTime(100)

    // Verify that the function was not called yet
    expect(func).not.toHaveBeenCalled()

    // Fast forward time by another 100 milliseconds
    jest.advanceTimersByTime(100)

    // Verify that the function was called once
    expect(func).toHaveBeenCalledTimes(1)
  })
})
