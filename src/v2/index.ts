import { PluginEventExtra } from '../plugin'
import { detect } from 'detect-browser'

export const userAgentV2 = (
    event: PluginEventExtra,
    userAgent: string,
    _global: {
        enabledPlugin: boolean
        enableSegmentAnalyticsJs: boolean
        overrideUserAgentDetails: boolean
        debugMode: boolean
    }
): PluginEventExtra => {
    const agentInfo = detect(userAgent)
    const device = detectDevice(userAgent)
    const deviceType = detectDeviceType(userAgent)

    // The special Posthog property names are retrieved from:
    // https://github.com/PostHog/posthog/blob/master/frontend/src/lib/components/PropertyKeyInfo.tsx
    event.properties['$device'] = device
    event.properties['$device_type'] = deviceType

    if (agentInfo) {
        event.properties['$browser'] = agentInfo.name
        event.properties['$browser_version'] = agentInfo.version
        event.properties['$os'] = agentInfo.os
        // Custom property
        event.properties['$browser_type'] = agentInfo.type
    }

    return event
}

// detectDevice and detectDeviceType from https://github.com/PostHog/posthog-js/blob/9abedce5ac877caeb09205c4b693988fc09a63ca/src/utils.js#L808-L837
function detectDevice(userAgent: string) {
    if (/Windows Phone/i.test(userAgent) || /WPDesktop/.test(userAgent)) {
        return 'Windows Phone'
    } else if (/iPad/.test(userAgent)) {
        return 'iPad'
    } else if (/iPod/.test(userAgent)) {
        return 'iPod Touch'
    } else if (/iPhone/.test(userAgent)) {
        return 'iPhone'
    } else if (/(BlackBerry|PlayBook|BB10)/i.test(userAgent)) {
        return 'BlackBerry'
    } else if (/Android/.test(userAgent) && !/Mobile/.test(userAgent)) {
        return 'Android Tablet'
    } else if (/Android/.test(userAgent)) {
        return 'Android'
    } else {
        return ''
    }
}

function detectDeviceType(userAgent: string) {
    const device = detectDevice(userAgent)
    if (device === 'iPad' || device === 'Android Tablet') {
        return 'Tablet'
    } else if (device) {
        return 'Mobile'
    } else {
        return 'Desktop'
    }
}
