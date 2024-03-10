import { CacheExtension, GeoIPExtension, Meta, StorageExtension, UtilsExtension } from '@posthog/plugin-scaffold'
import { UserAgentMetaInput } from '../plugin'

export function makeMeta(options?: {
    enable?: boolean
    enableSegmentAnalyticsJs?: boolean
    overrideUserAgentDetails?: boolean
    allowV3UserAgentProcessing?: boolean
    debugMode?: boolean
}): Meta<UserAgentMetaInput> {
    return {
        cache: {} as CacheExtension,
        storage: {} as StorageExtension,
        global: {
            enabledPlugin: options?.enable ?? true,
            enableSegmentAnalyticsJs: options?.enableSegmentAnalyticsJs ?? false,
            overrideUserAgentDetails: options?.overrideUserAgentDetails ?? true,
            allowV3UserAgentProcessing: options?.allowV3UserAgentProcessing ?? false,
            debugMode: options?.debugMode ?? false,
        },
        config: {
            enable: options?.enable ? 'true' : 'false',
            enableSegmentAnalyticsJs: options?.enableSegmentAnalyticsJs ? 'true' : 'false',
            overrideUserAgentDetails: options?.overrideUserAgentDetails ? 'true' : 'false',
            allowV3UserAgentProcessing: options?.allowV3UserAgentProcessing ? 'true' : 'false',
        },
        attachments: {},
        jobs: {},
        metrics: {},
        geoip: {} as GeoIPExtension,
        utils: {} as UtilsExtension,
    }
}
