const { AbilityBuilder, createMongoAbility } = require('@casl/ability');

function defineAbilitiesFor(user) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility());

  if (user.role === 'admin') {
    can('manage', 'Flower'); 
  } else {
    can('read', 'Flower');  
    cannot('create', 'Flower');  
  }

  return build();
}

module.exports = defineAbilitiesFor;
