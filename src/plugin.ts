import { PluginEvent, Meta } from '@posthog/plugin-scaffold'
import { userAgentV3 } from './v3'
import { userAgentV2 } from './v2'

export type UserAgentPluginConfiguration = {
    enable: string
    enableSegmentAnalyticsJs?: string
    overrideUserAgentDetails?: string
    // if provided then the plugin will process $raw_user_agent or $useragent
    allowV3UserAgentProcessing?: string
    debugMode?: string
}

export type UserAgentMetaInput = {
    config: UserAgentPluginConfiguration
    global: {
        enabledPlugin: boolean
        enableSegmentAnalyticsJs: boolean
        overrideUserAgentDetails: boolean
        allowV3UserAgentProcessing: boolean
        debugMode: boolean
    }
}

export interface PluginEventExtra extends PluginEvent {
    $useragent?: string
    $raw_user_agent?: string
}

/**
 * Setup of the plugin
 * @param param0 the metadata of the plugin
 */
export function setupPlugin({ config, global }: Meta<UserAgentMetaInput>) {
    try {
        global.enableSegmentAnalyticsJs = config.enableSegmentAnalyticsJs === 'true'
        global.overrideUserAgentDetails = config.overrideUserAgentDetails === 'true'
        global.allowV3UserAgentProcessing = config.allowV3UserAgentProcessing === 'true'
        global.debugMode = config.debugMode === 'true'
    } catch (e: unknown) {
        throw new Error('Failed to read the configuration')
    }
}

/**
 * Process the event
 */
export async function processEvent(event: PluginEventExtra, { global }: Meta<UserAgentMetaInput>) {
    const availableKeysOfEvent = Object.keys(event.properties)

    let userAgent = ''

    if (global.enableSegmentAnalyticsJs) {
        // If the segment integration is enabled and the segment_userAgent is missing, we skip the processing of the event
        const hasSegmentUserAgentKey = availableKeysOfEvent.includes('segment_userAgent')
        if (!hasSegmentUserAgentKey) {
            if (global.debugMode) {
                console.warn(`UserAgentPlugin.processEvent(): Event is missing segment_userAgent`)
            }

            return event
        }

        // Extract user agent from event properties
        userAgent = `${event.properties.segment_userAgent}`
    } else {
        // If the magical property name $useragent is missing, we skip the processing of the event
        const hasUserAgentKey =
            availableKeysOfEvent.includes('$user-agent') ||
            availableKeysOfEvent.includes('$useragent') ||
            availableKeysOfEvent.includes('$user_agent')
        // if v3 processing is not enabled (the default),
        // and there is no user agent
        // then we can exit here
        if (!global.allowV3UserAgentProcessing && !hasUserAgentKey) {
            if (global.debugMode) {
                console.warn(`UserAgentPlugin.processEvent(): Event is missing $useragent or $user-agent`)
            }

            return event
        }

        // Extract user agent from event properties
        if (event.properties.$useragent) {
            userAgent = event.properties.$useragent
        } else if (event.properties['$user-agent']) {
            userAgent = event.properties['$user-agent']
        } else if (event.properties.$user_agent) {
            userAgent = event.properties.$user_agent
        }

        // Remove the unnecessary $useragent or $user-agent user property
        delete event.properties.$useragent
        delete event.properties['$user-agent']
        delete event.properties.$user_agent
    }

    const hasRawUserAgentKey =
        availableKeysOfEvent.includes('$raw_user_agent') && event.properties['$raw_user_agent'].trim().length > 0
    const hasUserAgent = userAgent.trim().length > 0
    if (!hasRawUserAgentKey && !hasUserAgent) {
        if (global.debugMode) {
            console.warn(`UserAgentPlugin.processEvent(): $useragent is empty`)
        }

        return event
    }

    if (!hasRawUserAgentKey && !hasUserAgent) {
        if (global.debugMode) {
            console.warn(`UserAgentPlugin.processEvent(): neither $raw_user_agent or $useragent was provided`)
        }

        return event
    }

    const eventProperties = Object.keys(event.properties)
    const hasBrowserProperties = eventProperties.some((value: string) =>
        ['$browser', '$browser_version', '$os', '$device', '$device_type'].includes(value)
    )

    if (!global.overrideUserAgentDetails && hasBrowserProperties) {
        if (global.debugMode) {
            console.warn(
                `UserAgentPlugin.processEvent(): The event has $browser, $browser_version, $os, $device, or $device_type but the option 'overrideUserAgentDetails' is not enabled.`
            )
        }

        return event
    }

    if (hasRawUserAgentKey && !hasUserAgent) {
        return userAgentV3(event, event.properties['$raw_user_agent'], global)
    }

    return userAgentV2(event, userAgent, global)
}
