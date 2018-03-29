// collection créee pour etre disponible des 2 cotés :serveur+client
Waiters = new Mongo.Collection("waiters");

Meteor.methods({
	insertWaiter: function(waiter){
		//ces users devront etre stockés ds une "collection". mais elle doit etre accessible coté client comme serveur, on va donc créer un dossier "collection" 
		// dans un fichier a part. mais on appelle ici la collection.
		newWaiter = Waiters.insert({name: waiter.name, email: waiter.email, shares : 0, createdAt : Date.now()}, function(error, result){});

		return newWaiter;

	},

	// ici on créé une fonction de mise a jour des partages.
	newWaiterShare: function(waiter){
		var waiter = Waiters.update({_id: waiter._id}, { $inc:{shares:1}}); // fonction $inc = incrementation automatique
		return waiter;
		}
});

getPosition = function (waiter) {
	// ici on compte les user qui ont un nbre de share + important que celui du user courant.
	var countGreaterScores = Waiters.find({"shares": { "$gt": waiter.shares}}).count();
	// ici on compte les users qui ont le meme nbre de share que l'user courant.
	var counterSameScores = Waiters.find({"shares": waiter.shares}).count();

	// on calcule ensuite la position de l'user courant (nombre d'user +grand nombre de share + 1 pour me donner la position. 
	position = countGreaterScores +1 ;

	// on met un if pour conditionner les compteurs
	if(counterSameScores >1) // sup a 1 pour ne pas m'inclure ds le comptage des users.
	{
		countGreaterDates = Waiters.find({ "shares": waiter.shares, "createdAt": {"$lt": waiter.createdAt}}).count();
		position = position + countGreaterDates;
	}
	return position;

};

