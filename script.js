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
 * @param {org.acme.model.ChampSelect} cs - Creación de un campeón.
 * @transaction
 */
function ChampSelect(cs) {
    // Comprobamos si el jugador puede crear un campeón
    if(cs.player.champs > 0){
    	cs.player.champs --;
    	console.log('Numero de campeones restantes: ' + cs.player.champs);
        console.log('Cmpeon elegido: ' + cs.champ);
    }
    else {
    	console.log('El jugador no puede crear más campeones');
    }
}
