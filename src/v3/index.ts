import { PluginEventExtra } from '../plugin'
import { userAgentV2 } from '../v2'
import { detectBrowser, detectBrowserVersion, detectDevice, detectDeviceType, detectOS } from './user-agent-utils'

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
    const vendor = event.properties['$navigator_vendor']

    event.properties['$device'] = detectDevice(userAgent)
    event.properties['$device_type'] = detectDeviceType(userAgent)
    // the only difference from posthog-js...
    // in theory posthog-js has an opera property on the window object
    // but, we never assign it
    // TODO is it added by opera?
    event.properties['$browser'] = detectBrowser(userAgent, vendor, undefined)
    event.properties['$browser_version'] = detectBrowserVersion(userAgent, vendor, undefined)
    const detectedOS = detectOS(userAgent)
    event.properties['$os'] = detectedOS[0]
    event.properties['$os_version'] = detectedOS[1]

    // posthog-js does not add $browser_type, so we won't add it here in v3
    //event.properties['$browser_type'] = agentInfo.type

    return event
}
