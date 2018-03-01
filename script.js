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
//Características de los campeones
ARCHER = {  
  vida: 20,
  ataquefisico: 11,
  ataquemagico: 6, 
  velocidadataque: 20, 
  probfallo: 0.2,
  probdefensa: 0.05, 
  defensafisica: 5,
  defensamagica: 5
};

ASSASSIN = {  
  vida: 25,
  ataquefisico: 8,
  ataquemagico: 7, 
  velocidadataque: 10, 
  probfallo: 0.05,
  probdefensa: 0.15, 
  defensafisica: 5,
  defensamagica: 5
};



/**
 * Atack processor function.
 * @param {org.acme.model.ChampSelect} cs - Creación de un campeón.
 * @transaction
 */
function ChampSelect(cs) {
  // Comprobamos si el jugador puede crear un campeón
  if(cs.player.champs > 0){
    
    //Comprobamos el tipo de campeón elegido
    if(cs.champ == "ASSASSIN") {
      var champfeatures = ASSASSIN;
    }
    else if(cs.champ == "ARCHER") {
      var champfeatures = ARCHER;
    }
           
	//Creamos el campeón
    getAssetRegistry('org.acme.model.Champ')
      .then(function (champAssetRegistry) {
      var factory = getFactory();
      var campeon = factory.newResource('org.acme.model', 'Champ', cs.champId);
      campeon.owner = cs.player;
      campeon.vida = champfeatures.vida;
      campeon.ataquefisico = champfeatures.ataquefisico;
      campeon.ataquemagico = champfeatures.ataquemagico;
      campeon.velocidadataque = champfeatures.velocidadataque;
      campeon.probfallo = champfeatures.probfallo;
      campeon.probdefensa = champfeatures.probdefensa;
      campeon.defensafisica = champfeatures.defensafisica;
      campeon.defensamagica = champfeatures.defensamagica;
      return champAssetRegistry.add(campeon);
      }).then(function (participantRegistry){
        return getParticipantRegistry('org.acme.model.Player')
        .then(function (participantRegistry) {
          console.log('*************************************')
          var factory = getFactory();
          cs.player.champs --;
          console.log('NUMERO DE CAMPEONES: ' + cs.player.champs);
          return participantRegistry.update(cs.player);
        });
    });
  }
  else {
    console.log('El jugador no puede crear más campeones');
  }
}
