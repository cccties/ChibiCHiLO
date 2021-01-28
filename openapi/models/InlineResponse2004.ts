/* tslint:disable */
/* eslint-disable */
/**
 * chibichilo-server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    InlineResponse2001Topics,
    InlineResponse2001TopicsFromJSON,
    InlineResponse2001TopicsFromJSONTyped,
    InlineResponse2001TopicsToJSON,
} from './';

/**
 * 成功時
 * @export
 * @interface InlineResponse2004
 */
export interface InlineResponse2004 {
    /**
     * 
     * @type {Array<InlineResponse2001Topics>}
     * @memberof InlineResponse2004
     */
    topics?: Array<InlineResponse2001Topics>;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2004
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2004
     */
    perPage?: number;
}

export function InlineResponse2004FromJSON(json: any): InlineResponse2004 {
    return InlineResponse2004FromJSONTyped(json, false);
}

export function InlineResponse2004FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2004 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'topics': !exists(json, 'topics') ? undefined : ((json['topics'] as Array<any>).map(InlineResponse2001TopicsFromJSON)),
        'page': !exists(json, 'page') ? undefined : json['page'],
        'perPage': !exists(json, 'perPage') ? undefined : json['perPage'],
    };
}

export function InlineResponse2004ToJSON(value?: InlineResponse2004 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'topics': value.topics === undefined ? undefined : ((value.topics as Array<any>).map(InlineResponse2001TopicsToJSON)),
        'page': value.page,
        'perPage': value.perPage,
    };
}


