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

WIZARD = {  
	vida: 25,
	ataquefisico: 8,
	ataquemagico: 7, 
	velocidadataque: 10, 
	probfallo: 0.05,
	probdefensa: 0.15, 
	defensafisica: 5,
	defensamagica: 5
};

TANK = {  
	vida: 40,
	ataquefisico: 7,
	ataquemagico: 6, 
	velocidadataque: 10, 
	probfallo: 0.05,
	probdefensa: 0.35, 
	defensafisica: 5,
	defensamagica: 5
};



/**
 * ChampSelect processor function.
 * @param {org.acme.model.ChampSelect} cs - Crea un campeón.
 * @transaction
 */
function ChampSelect(cs) 
{
	// Comprobamos si el jugador puede crear un campeón
	if(cs.player.champs > 0)
	{

		//Comprobamos el tipo de campeón elegido
		if(cs.champ == "ASSASSIN") 
			var champfeatures = ASSASSIN;
		else if(cs.champ == "ARCHER") 
			var champfeatures = ARCHER;
		else if(cs.champ == "WIZARD") 
			var champfeatures = WIZARD;
		else if(cs.champ == "TANK") 
			var champfeatures = TANK;

		//Creamos el campeón
		return getAssetRegistry('org.acme.model.Champ')
		.then(function(champAssetRegistry) 
		{
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
		})
		.then(function()
		{
			return getParticipantRegistry('org.acme.model.Player')
		})
		.then(function(participantRegistry) 
		{
			cs.player.champs --;
			return participantRegistry.update(cs.player);
		});
	}
	else 
		console.log('El jugador no puede crear más campeones');
}


/**
 * Atack processor function.
 * @param {org.acme.model.Atack} ataque - Ataca a un campeón.
 * @transaction
 */
function Atack(ataque) 
{
	//Comprobamos si alguno de los campeones que participan en el ataque están muertos
	if(ataque.from.vida > 0 && ataque.to.vida > 0)
	{
		//Comprobamos si acierta el ataque
		var probabilidad1 = Math.random();
		if (probabilidad1 <= ataque.from.probfallo)
			console.log('El atacante ha fallado');
		else 
		{
			//Comprobamos si consigue defenderse
			var probabilidad2 = Math.random();
			if (probabilidad2 <= ataque.from.probfallo)
		        {
				console.log('Se ha consegudio defender pero el ataque mágico ha causado daño');
					var mdamage = ataque.from.ataquemagico - ataque.to.defensamagica;
					if (mdamage < 0)
						mdamage = 0;
					ataque.to.vida -= mdamage;
			}
			else
		        {
				console.log('Ataque con éxito');
				var mdamage = ataque.from.ataquemagico - ataque.to.defensamagica;
				if (mdamage < 0)
					mdamage = 0;
				ataque.to.vida -= mdamage;
				var fdamage = ataque.from.ataquefisico - ataque.to.defensafisica;
				if (fdamage < 0)
					fdamage = 0;
				ataque.to.vida -= fdamage;			
			}
			//Comprobamos si el campeón ha muerto
			if(ataque.to.vida <= 0)
			{
				ataque.to.vida = 0;
				console.log('El campeón ' + ataque.to.champId + ' ha muerto');	
			}
			//Actualizamos vida del campeón que recibe el ataque
			return getAssetRegistry('org.acme.model.Champ')
			.then(function (champAssetRegistry) 
			{
				return champAssetRegistry.update(ataque.to);
			});			
		}
	}
	else
		console.log('El ataque no se ha realizado porque alguno de los campeones está muerto');
}

/**
 * Reset processor function.
 * @param {org.acme.model.Reset} reset - Resetea el juego.
 * @transaction
 */
function Reset(ataque)
{
	//Falta implementar esta función
	console.log('La función Reset aún no está implementada'); 
}
