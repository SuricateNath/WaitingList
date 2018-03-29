
// ici subscribe permet de retourner les waiters
 Meteor.subscribe('waiters');

Template.home.helpers({
	alreadywaiter: function(){
		if(Session.get("waiterID")){
			var curUser = Waiters.findOne({_id: Session.get("waiterID")});
			if(curUser){
				return {_id:curUser._id, name:curUser.name, shares: curUser.shares, position:getPosition(curUser)}
			}

		}else{
			return null
		}
	}
});

// ici le helpers sert à afficher les données de la collection
Template.waiters.helpers({
	waiters: function(){
		// Waiters.fin({}) retourne tous les waiters insérés dans la collection Waiters
		return Waiters.find({}, {sort: {shares: -1, createdAt: 1}, limit:5 }); // la fonction "sort" sert a trier, on y ajoute des données a prendre en compte ds le tri. mais on garde toujours "Waiters.find({}" auquel on ajoute  ,{sort...} par exple)
	}
});


// ici le template sert a récupérer les données
Template.form.events({
	'click .btn': function(event){

		// eviter l'insertion par défaut du click et enlever la réactualisation de la page.
		event.preventDefault();

		// ici on créé 2 variables afin de récupérer les valeurs del'input.
		var name = $('#name').val();
		var email = $('#email').val();		

		Meteor.call('insertWaiter', {name: name, email: email}, function(error, result){

			if(result){
			Session.setPersistent("waiterID", result); //waitersId renvoi l'id, result renvoi une donnée si l'user est enregistré.
			}
		}); 
	}
}); 
