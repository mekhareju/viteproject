const { AbilityBuilder, Ability } = require('@casl/ability');

function defineAbilitiesFor(user) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.role === 'admin') {
    can('manage', 'Flower'); 
  } else {
    can('read', 'Flower');  
    cannot('create', 'Flower');  
  }

  return build();
}

module.exports = defineAbilitiesFor;
