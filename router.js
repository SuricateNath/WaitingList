/*Router.route('/', function(){
  this.render('home');
}, {
	name: 'home'
});


// ici on créer une vue afin de charger une page specifique pour un utilisateur qui partage le lien.
Router.route('share/:_id', function(){
	var params = this.params;
	var waiterShared = Waiters.findOne({_id: params._id});

	//conditions de comptage du share
	if(!Session.get("alreadyVisitor")){
		Meteor.call('newWaiterShare', {_id: waiterShared._id}, function(error, result){
		if(result){
		}
	})
	}

	//afin de se rappeler des visiteurs qui auront déjà vu le lien, il faut ajouter une seesion "alreadyVisitor"
	Session.setPersistent('alreadyVisitor', true);

	return Router.go('home');
});*/

Router.route('/', function () {
  this.render('home');
},{
	name: 'home'
});

Router.route('share/:_id', function(){
	var params = this.params;
	var waiterShared = Waiters.findOne({_id:params._id});

	if(!Session.get("alreadyVisitor")){
		Meteor.call('newWaiterShare', {_id:waiterShared._id}, function(error, result){
			if(result){

			}
		})
	}

	Session.setPersistent("alreadyVisitor", true);

	return Router.go('home');
})