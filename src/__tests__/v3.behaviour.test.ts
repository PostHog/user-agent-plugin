import { processEvent } from '../plugin'
import { makeMeta } from './index'

describe('useragent-plugin v3', () => {
    test('should not process event when disabled', async () => {
        const event = { properties: { $raw_user_agent: 'present' } }
        const processedEvent = await processEvent(event as any, makeMeta())
        expect(Object.keys(processedEvent.properties)).toStrictEqual(Object.keys(event.properties))
    })

    test.todo('should not process event when $raw_user_agent is missing')
    test.todo('should not process event when $raw_user_agent is empty')
    test.todo('should not process when a v2 user agent is present')
})
