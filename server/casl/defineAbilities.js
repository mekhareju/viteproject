const { AbilityBuilder, Ability } = require('@casl/ability');

function defineAbilitiesFor(user) {
  const { can, rules } = new AbilityBuilder(Ability);

  if (user.role === 'admin') {
    can('manage', 'all');
    can('read', 'AdminPage');
  }

  else if (user.role === 'user') {
    can('read', 'UserProfile');
    can('read', 'Flower');
  }

  else {
    can('read', 'Flower');
  }

  return new Ability(rules); 
}

module.exports = defineAbilitiesFor;
