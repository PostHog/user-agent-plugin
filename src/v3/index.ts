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
    if (event.properties['$user_agent_plugin_disable']) {
        return event
    }

    if (global.debugMode) {
        console.debug('UserAgentPlugin.userAgentV3(): Processing event')
    }

    const vendor = event.properties['$navigator_vendor']

    event.properties['$device'] = detectDevice(userAgent)
    event.properties['$device_type'] = detectDeviceType(userAgent)
    event.properties['$browser'] = detectBrowser(userAgent, vendor)
    event.properties['$browser_version'] = detectBrowserVersion(userAgent, vendor)
    const [osName, osVersion] = detectOS(userAgent)
    event.properties['$os'] = osName
    event.properties['$os_version'] = osVersion

    // posthog-js does not add $browser_type, so we won't add it here in v3
    //event.properties['$browser_type'] = agentInfo.type

    event.properties['$processed_by_user_agent_plugin'] = true

    return event
}
