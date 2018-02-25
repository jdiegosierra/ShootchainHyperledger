/*
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
 */

/**
 * Atack processor function.
 * @param {org.acme.model.Atack} atack - the atack to be processed
 * @transaction
 */
function Atack(atack) {
  var damage = atack.from.damage;
  var life = atack.to.life;
  var result = life - damage;
  console.log('Life : ' + life);
  console.log('Damage: ' + damage);
  console.log('Result: ' + result);
  atack.to.life = result; // <---
   // Get the asset registry for the asset.
  return getAssetRegistry('org.acme.model.Features')
    .then(function (assetRegistry) {

    // Update the asset in the asset registry.
    return assetRegistry.update(atack.to);

  })
    .then(function () {

  });
}
