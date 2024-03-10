import { CacheExtension, GeoIPExtension, Meta, StorageExtension, UtilsExtension } from '@posthog/plugin-scaffold'
import { UserAgentMetaInput } from '../plugin'

export function makeMeta(options?: {
    enable?: boolean
    enableSegmentAnalyticsJs?: boolean
    overrideUserAgentDetails?: boolean
    debugMode?: boolean
}): Meta<UserAgentMetaInput> {
    return {
        cache: {} as CacheExtension,
        storage: {} as StorageExtension,
        global: {
            enabledPlugin: options?.enable ?? true,
            enableSegmentAnalyticsJs: options?.enableSegmentAnalyticsJs ?? false,
            overrideUserAgentDetails: options?.overrideUserAgentDetails ?? true,
            debugMode: options?.debugMode ?? false,
        },
        config: {
            enable: options?.enable ? 'true' : 'false',
            enableSegmentAnalyticsJs: options?.enableSegmentAnalyticsJs ? 'true' : 'false',
            overrideUserAgentDetails: options?.overrideUserAgentDetails ? 'true' : 'false',
        },
        attachments: {},
        jobs: {},
        metrics: {},
        geoip: {} as GeoIPExtension,
        utils: {} as UtilsExtension,
    }
}
