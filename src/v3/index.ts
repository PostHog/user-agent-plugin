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
    // only here to make sure the v3 tests are checking this once this starts to fire
    // userAgentV2(event, userAgent, global)

    const vendor = event.properties['$navigator_vendor']

    event.properties['$device'] = detectDevice(userAgent)
    event.properties['$device_type'] = detectDeviceType(userAgent)
    // the only difference from posthog-js...
    // in theory posthog-js has an opera property on the window object
    // but, we never assign it
    // TODO is it added by opera?
    event.properties['$browser'] = detectBrowser(userAgent, vendor, undefined)
    event.properties['$browser_version'] = detectBrowserVersion(userAgent, vendor, undefined)
    const [osName, osVersion] = detectOS(userAgent)
    event.properties['$os'] = osName
    event.properties['$os_version'] = osVersion

    // posthog-js does not add $browser_type, so we won't add it here in v3
    //event.properties['$browser_type'] = agentInfo.type

    return event
}
