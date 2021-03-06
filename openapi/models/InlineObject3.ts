/* tslint:disable */
/* eslint-disable */
/**
 * chibichilo-server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface InlineObject3
 */
export interface InlineObject3 {
    /**
     * 
     * @type {string}
     * @memberof InlineObject3
     */
    json?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject3
     */
    file?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject3
     */
    provider: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject3
     */
    wowzaBaseUrl: string;
}

export function InlineObject3FromJSON(json: any): InlineObject3 {
    return InlineObject3FromJSONTyped(json, false);
}

export function InlineObject3FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject3 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'json': !exists(json, 'json') ? undefined : json['json'],
        'file': !exists(json, 'file') ? undefined : json['file'],
        'provider': json['provider'],
        'wowzaBaseUrl': json['wowzaBaseUrl'],
    };
}

export function InlineObject3ToJSON(value?: InlineObject3 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'json': value.json,
        'file': value.file,
        'provider': value.provider,
        'wowzaBaseUrl': value.wowzaBaseUrl,
    };
}


