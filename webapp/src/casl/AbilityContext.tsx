import React, { createContext, useContext } from 'react';
import { Ability, AbilityBuilder } from '@casl/ability';
import { createContextualCan } from '@casl/react';

export type Actions = 'manage' | 'read' | 'create';
export type Subjects = 'AdminPage' | 'UserProfile' | 'Flower' | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;

// Default ability with no rules (for guests)
const defaultAbility = new Ability<[Actions, Subjects]>();
const AbilityContext = createContext<AppAbility>(defaultAbility);

// Create a wrapper for the `Can` component
const CASLCan = createContextualCan(AbilityContext.Consumer);

export const Can: React.FC<React.ComponentProps<typeof CASLCan>> = (props) => {
  return <CASLCan {...props} />;
};

// Ability Provider
export const AbilityProvider: React.FC<{
  ability: AppAbility;
  children: React.ReactNode;
}> = ({ ability, children }) => (
  <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
);

// Hook to use the ability instance
export const useAbility = () => {
  const ability = useContext(AbilityContext);
  if (!ability) {
    throw new Error('useAbility must be used within an AbilityProvider');
  }
  return ability;
};

// Function to define abilities based on user role
export const defineAbilityFor = (role: string): AppAbility => {
  const { can, rules } = new AbilityBuilder<AppAbility>(Ability);

  if (role === 'admin') {
    can('read', 'AdminPage');
    can('manage', 'all'); // Admins can manage everything
  } else if (role === 'user') {
    can('read', 'UserProfile');
    can('read', 'Flower'); // Regular users can only read flowers
  } else {
    can('read', 'Flower'); // Default permission for guests
  }

  return new Ability<[Actions, Subjects]>(rules);
};
