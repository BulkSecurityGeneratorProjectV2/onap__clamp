/*-
 * ============LICENSE_START=======================================================
 * ONAP CLAMP
 * ================================================================================
 * Copyright (C) 2019 AT&T Intellectual Property. All rights
 *                             reserved.
 * ================================================================================
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============LICENSE_END============================================
 * ===================================================================
 *
 */
import LoopCache from '../api/LoopCache';

const json = require('./LoopCache_mokeLoopJsonCache.json');

describe('Verify LoopCache functions', () => {
    const loopCache = new LoopCache(json);
		it('getLoopName', () => {
      expect(loopCache.getLoopName()).toBe("LOOP_Jbv1z_v1_0_ResourceInstanceName1_tca");
		});

    it('getOperationalPolicyConfigurationJson', () => {
      const opPolicyConfig = {
          "guard_policies": {},
          "operational_policy": {
            "controlLoop": {},
            "policies": []
          }
      };
      expect(loopCache.getOperationalPolicyConfigurationJson()).toStrictEqual(opPolicyConfig);
    });

    it('getOperationalPolicies', () => {
      const opPolicy = [{
        "name": "OPERATIONAL_h2NMX_v1_0_ResourceInstanceName1_tca",
        "configurationsJson": {
          "guard_policies": {},
          "operational_policy": {
            "controlLoop": {},
            "policies": []
          }
        },
       "jsonRepresentation": {
        "schema": {}
      }
      }];
      expect(loopCache.getOperationalPolicies()).toStrictEqual(opPolicy);
    });

    it('getOperationalPoliciesNoJsonSchema', () => {
      const opPolicy = [{
        "name": "OPERATIONAL_h2NMX_v1_0_ResourceInstanceName1_tca",
        "configurationsJson": {
          "guard_policies": {},
          "operational_policy": {
            "controlLoop": {},
            "policies": []
          }
        }
      }];
      expect(loopCache.getOperationalPoliciesNoJsonSchema()).toStrictEqual(opPolicy);
    });

    it('getOperationalPolicyJsonSchema', () => {
      const jsonSchema = {
          "schema": {}
      };

      expect(loopCache.getOperationalPolicyJsonSchema()).toStrictEqual(jsonSchema);
    });
    it('getGlobalProperties', () => {
      const globelProp = {
        "dcaeDeployParameters": {
          "location_id": "",
          "service_id": "",
          "policy_id": "TCA_h2NMX_v1_0_ResourceInstanceName1_tca"
        }
      };
      expect(loopCache.getGlobalProperties()).toStrictEqual(globelProp);
    });

    it('getDcaeDeploymentProperties', () => {
      const deploymentProp = {
          "location_id": "",
          "service_id": "",
          "policy_id": "TCA_h2NMX_v1_0_ResourceInstanceName1_tca"
      };
      expect(loopCache.getDcaeDeploymentProperties()).toStrictEqual(deploymentProp);
    });

    it('getMicroServiceForName', () => {
      const msJson = {
          "name": "TCA_h2NMX_v1_0_ResourceInstanceName1_tca",
          "modelType": "onap.policies.monitoring.cdap.tca.hi.lo.app",
          "configurationsJson": {"domain": "measurementsForVfScaling"},
          "shared": false,
          "jsonRepresentation": {"schema": {}}
      };
      expect(loopCache.getMicroServiceForName("TCA_h2NMX_v1_0_ResourceInstanceName1_tca")).toStrictEqual(msJson);
      expect(loopCache.getMicroServiceForName("TCA_h2NMX_v1_0_ResourceInstanceName1_tca_2")).toBeNull();
    });

    it('getMicroServicePropertiesForName', () => {
      const msProp = {"domain": "measurementsForVfScaling"};
      expect(loopCache.getMicroServicePropertiesForName("TCA_h2NMX_v1_0_ResourceInstanceName1_tca")).toStrictEqual(msProp);
      expect(loopCache.getMicroServicePropertiesForName("TCA_h2NMX_v1_0_ResourceInstanceName1_tca_2")).toBeNull();
    });

    it('getMicroServiceJsonRepresentationForName', () => {
      const msJsonRepresentation = {"schema": {}};
      expect(loopCache.getMicroServiceJsonRepresentationForName("TCA_h2NMX_v1_0_ResourceInstanceName1_tca")).toStrictEqual(msJsonRepresentation);
    });

    it('getResourceDetailsVfProperty', () => {
      const resourceVF = {
        "vLoadBalancerMS 0": {
          "resourceVendor": "Test",
          "resourceVendorModelNumber": "",
          "name": "vLoadBalancerMS",
          "description": "vLBMS",
          "invariantUUID": "1a31b9f2-e50d-43b7-89b3-a040250cf506",
          "subcategory": "Load Balancer",
          "category": "Application L4+",
          "type": "VF",
          "UUID": "b4c4f3d7-929e-4b6d-a1cd-57e952ddc3e6",
          "version": "1.0",
          "resourceVendorRelease": "1.0",
          "customizationUUID": "465246dc-7748-45f4-a013-308d92922552"
        }
      };
      expect(loopCache.getResourceDetailsVfProperty()).toStrictEqual(resourceVF);
    });

    it('getResourceDetailsVfModuleProperty', () => {
      const vfModule = {
        "Vloadbalancerms..vpkg..module-1": {
          "vfModuleModelInvariantUUID": "ca052563-eb92-4b5b-ad41-9111768ce043",
          "vfModuleModelVersion": "1",
          "vfModuleModelName": "Vloadbalancerms..vpkg..module-1",
          "vfModuleModelUUID": "1e725ccc-b823-4f67-82b9-4f4367070dbc",
          "vfModuleModelCustomizationUUID": "1bffdc31-a37d-4dee-b65c-dde623a76e52",
          "min_vf_module_instances": 0,
          "vf_module_label": "vpkg",
          "max_vf_module_instances": 1,
          "vf_module_type": "Expansion",
          "isBase": false,
          "initial_count": 0,
          "volume_group": false
        }
      };
      expect(loopCache.getResourceDetailsVfModuleProperty()).toStrictEqual(vfModule);
    });

    it('getLoopLogsArray', () => {
      const logs = [
        {
          "id": 1,
          "logType": "INFO",
          "logComponent": "CLAMP",
          "message": "Operational and Guard policies UPDATED",
          "logInstant": "2019-07-08T09:44:37Z"
        }
      ];
      expect(loopCache.getLoopLogsArray()).toStrictEqual(logs);
    });

    it('getComponentStates', () => {
      const component = {
        "POLICY": {
          "componentState": {
            "stateName": "NOT_SENT",
            "description": "The policies defined have NOT yet been created on the policy engine"
          }
        },
        "DCAE": {
          "componentState": {
            "stateName": "BLUEPRINT_DEPLOYED",
            "description": "The DCAE blueprint has been found in the DCAE inventory but not yet instancianted for this loop"
          }
        }
      };
      expect(loopCache.getComponentStates()).toStrictEqual(component);
    });

    it('updateGlobalProperties', () => {
      const newGlobalProps = {
        "dcaeDeployParameters": {
          "location_id": "newLocation",
          "service_id": "newServiceId",
          "policy_id": "TCA_h2NMX_v1_0_ResourceInstanceName1_tca_2"
        }
      };
      loopCache.updateGlobalProperties(newGlobalProps);
      expect(loopCache.getGlobalProperties()).toStrictEqual(newGlobalProps);
    });

    it('updateOperationalPolicyProperties', () => {
      const newOpPolicy = {
          "guard_policies": {},
          "operational_policy": {
            "controlLoop": {},
            "policies": []
          }
        };
      loopCache.updateOperationalPolicyProperties("OPERATIONAL_h2NMX_v1_0_ResourceInstanceName1_tca",newOpPolicy);
      expect(loopCache.getOperationalPolicyPropertiesForName("OPERATIONAL_h2NMX_v1_0_ResourceInstanceName1_tca")).toStrictEqual(newOpPolicy);
    });

    it('updateMicroServiceProperties', () => {
      const newMsPolicyProperties = {"domain": "measurementsForVfScalingNew"};
      loopCache.updateMicroServiceProperties("TCA_h2NMX_v1_0_ResourceInstanceName1_tca", newMsPolicyProperties);
      expect(loopCache.getMicroServicePropertiesForName("TCA_h2NMX_v1_0_ResourceInstanceName1_tca")).toStrictEqual(newMsPolicyProperties);
    });
 });
