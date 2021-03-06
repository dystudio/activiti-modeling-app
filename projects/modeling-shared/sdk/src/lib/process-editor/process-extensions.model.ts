/*!
 * @license
 * Copyright 2019 Alfresco, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    ModelExtensions,
    EntityProperties,
    ServiceParameterMappings,
    TaskAssignmentContent,
    ServicesParameterConstants,
    TaskAssignment,
    ServicesConstants
} from '../api/types';

export function createExtensionsObject() {
    return {
        constants: {},
        mappings: {},
        properties: {},
        assignments: {}
    };
}

export class ProcessExtensionsModel {

    extensions: ModelExtensions;

    constructor(extensions: ModelExtensions) {
        this.extensions = extensions;
    }

    setProperties(processId: string, properties: EntityProperties): ModelExtensions {
        const processExtensions = this.extensions[processId] ? this.extensions[processId] : createExtensionsObject();
        processExtensions.properties = properties;
        this.extensions[processId] = processExtensions;
        return this.extensions;
    }

    getProperties(processId: string): EntityProperties {
        return this.extensions[processId] ? this.extensions[processId].properties : {};
    }

    getAllProperties(): EntityProperties {
        let properties = {};

        Object.keys(this.extensions).map((extensionPropertyKey: string) => {
            if (extensionPropertyKey !== 'constants' && extensionPropertyKey !== 'mappings' && extensionPropertyKey !== 'properties') {
                properties = { ...this.extensions[extensionPropertyKey].properties };
            }
        });

        return properties;
    }

    setMappings(processId: string, elementId: string, mappings: ServiceParameterMappings): ModelExtensions {
        const processExtensions = this.extensions[processId] ? this.extensions[processId] : createExtensionsObject();
        if (Object.values(mappings).length) {
            processExtensions.mappings[elementId] = mappings;
        } else {
            delete processExtensions.mappings[elementId];
        }
        this.extensions[processId] = processExtensions;
        return this.extensions;
    }

    getMappings(processId: string): ServiceParameterMappings {
        return this.extensions[processId] ? this.extensions[processId].mappings : {};
    }

    getAllMappings(): ServiceParameterMappings {
        let mappings = {};

        Object.keys(this.extensions).map((extensionPropertyKey: string) => {
            if (extensionPropertyKey !== 'constants' && extensionPropertyKey !== 'mappings' && extensionPropertyKey !== 'properties') {
                mappings = { ...mappings, ...this.extensions[extensionPropertyKey].mappings };
            }
        });

        return mappings;
    }

    setAssignments(processId: string, serviceId: string, assignment: TaskAssignment): ModelExtensions {
        const processExtensions = this.extensions[processId] ? this.extensions[processId] : createExtensionsObject();
        if (processExtensions.assignments === undefined) {
            processExtensions.assignments = {};
        }

        if (Object.values(assignment).length) {
            processExtensions.assignments[serviceId] = assignment;
        } else {
            delete processExtensions.assignments[serviceId];
        }
        this.extensions[processId] = processExtensions;
        return this.extensions;
    }

    getAssignments(processId: string): TaskAssignmentContent {
        return this.extensions[processId] ? this.extensions[processId].assignments : {};
    }

    setConstants(processId: string, elementId: string, constants: ServicesParameterConstants): ModelExtensions {
        const processExtensions = this.extensions[processId] ? this.extensions[processId] : createExtensionsObject();
        if (Object.values(constants).length) {
            processExtensions.constants[elementId] = constants;
        } else {
            delete processExtensions.constants[elementId];
        }
        this.extensions[processId] = processExtensions;
        return this.extensions;
    }

    getConstants(processId: string): ServicesConstants {
        return this.extensions[processId] ? this.extensions[processId].constants : {};
    }
}
