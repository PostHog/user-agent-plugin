import { userAgentV3 } from '../v3'
import { userAgentV2 } from '../v2'
import { makeMeta } from './index'
import { PluginEventExtra, processEvent } from '../plugin'

jest.mock('../v2/index', () => ({
    userAgentV2: jest.fn(),
}))

jest.mock('../v3/index', () => ({
    userAgentV3: jest.fn(),
}))

describe('plugin validation', () => {
    afterEach(() => {
        // none of these tests should ever try to process
        expect(userAgentV2).not.toHaveBeenCalled()
        expect(userAgentV3).not.toHaveBeenCalled()
    })

    test('should not process event if segment_userAgent is missing', async () => {
        const event = {
            properties: {},
        } as Partial<PluginEventExtra>
        const meta = makeMeta({ enableSegmentAnalyticsJs: true })
        const result = await processEvent(event as PluginEventExtra, meta)
        expect(result).toBe(event)
    })

    test('should not process event if v2 mode and user agent is missing', async () => {
        const event = {
            properties: {},
        } as Partial<PluginEventExtra>
        const meta = makeMeta()
        const result = await processEvent(event as PluginEventExtra, meta)
        expect(result).toBe(event)
    })

    test.each(['$user-agent', '$user_agent', '$useragent'])(
        'should not process event if v2 mode and %s is empty',
        async key => {
            const event = {
                properties: {
                    [key]: '     ',
                },
            } as Partial<PluginEventExtra>
            const meta = makeMeta()
            const result = await processEvent(event as PluginEventExtra, meta)
            expect(result).toEqual({ properties: {} })
        }
    )

    test('should not process event if v3 mode neither user agent not raw_user_agent is present', async () => {
        const event = {
            properties: {},
        } as Partial<PluginEventExtra>
        const meta = makeMeta({ allowV3UserAgentProcessing: true })
        const result = await processEvent(event as PluginEventExtra, meta)
        expect(result).toBe(event)
    })

    test('should not process event if v3 mode and user agent and raw_user_agent are empty', async () => {
        const event = {
            properties: {
                $useragent: '     ',
                $raw_user_agent: '     ',
            },
        } as Partial<PluginEventExtra>
        const meta = makeMeta({ allowV3UserAgentProcessing: true })
        const result = await processEvent(event as PluginEventExtra, meta)
        expect(result).toEqual({
            properties: {
                // we never remove the raw_user_agent key
                $raw_user_agent: '     ',
            },
        })
    })
})
