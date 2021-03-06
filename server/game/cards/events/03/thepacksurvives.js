const DrawCard = require('../../../drawcard.js');

class ThePackSurvives extends DrawCard {
    setupCardAbilities(ability) {
        this.interrupt({
            canCancel: true,
            title: () => 'Sacrifice Direwolf',
            when: {
                onCardAbilityInitiated: event => event.source.getType() === 'event' && event.player !== this.controller
            },
            cost: ability.costs.sacrifice(card => card.hasTrait('Direwolf')),
            handler: context => {
                context.event.cancel();
                
                this.game.addMessage('{0} plays {1} and sacrifices {2} to cancel {3}', 
                                      this.controller, this, context.sacrificeCostCard, context.event.source);
            }
        });

        this.interrupt({
            canCancel: true,
            title: () => 'Kneel characters',
            when: {
                onCardAbilityInitiated: event => event.source.getType() === 'event' && event.player !== this.controller
            },
            cost: ability.costs.kneelMultiple(2, card => card.isFaction('stark') && card.getType() === 'character'),
            handler: context => {
                context.event.cancel();
                
                this.game.addMessage('{0} plays {1} and kneels {2} to cancel {3}', 
                                      this.controller, this, context.kneelingCostCards, context.event.source);
            }
        });
    }
}

ThePackSurvives.code = '03023';

module.exports = ThePackSurvives;
