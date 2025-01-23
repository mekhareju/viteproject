const defineAbilitiesFor = require('../casl/defineAbilities');

function checkAbilities(action, subject) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }

    const ability = defineAbilitiesFor(req.user); 

    console.log(`abilities: ${JSON.stringify(ability.rules)}`);

    if (ability.can(action, subject)) {
      return next(); 
    }

    res.status(403).json({ message: 'Insufficient permissions' });
  };
}

module.exports = checkAbilities;
