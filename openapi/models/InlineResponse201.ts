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
 * @interface InlineResponse201
 */
export interface InlineResponse201 {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse201
     */
    json?: string;
}

export function InlineResponse201FromJSON(json: any): InlineResponse201 {
    return InlineResponse201FromJSONTyped(json, false);
}

export function InlineResponse201FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse201 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'json': !exists(json, 'json') ? undefined : json['json'],
    };
}

export function InlineResponse201ToJSON(value?: InlineResponse201 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'json': value.json,
    };
}


