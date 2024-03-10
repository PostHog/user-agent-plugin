import { PluginEventExtra } from '../plugin'

export const userAgentV3 = (
    event: PluginEventExtra,
    userAgent: string,
    global: {
        enabledPlugin: boolean
        enableSegmentAnalyticsJs: boolean
        overrideUserAgentDetails: boolean
        debugMode: boolean
    }
): PluginEventExtra => {
    return event
}
