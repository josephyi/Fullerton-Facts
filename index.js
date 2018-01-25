/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en-GB': {
        translation: {
            FACTS: [
                `Fullerton's sister cities are Yongin, South Korea, Fukui, Japan, and Morelia, Mexico.`,
                `Fullerton is the headquarters of The Red Hat Society, which is described on their website as a playgroup for women created to connect like-minded women, make new friends and enrich lives through the power of fun and friendship!`,
                `Fullerton was founded as a railroad town in 1887, and is named after George H Fullerton, who was responisble for making a deal with the land's owners for railroad right-of-way for The California Central Railroad.`,
                `When George and Edward Amerige first came to the area, it was nothing more than 430 acres of wild mustard fields.`,
                `The city motto is, "The Education Community", due to the city's close relationship with California State University, Fullerton.`,
                `The SOCO District, which means South of Commonwealth, is a revitalized part of town known for its ambiance and nightlife. In fact, the OC Weekly has called it Bourbon Street West in reference to Bourbon Street of New Orleans' French Quarter.`,
                `In 1949, Fullerton was the setting in which Leo Fender developed and refined the design of the Fender Telecaster, an iconic guitar which was used by many famous musicians such as Bruce Springsteen, Keith Richards, and Kurt Cobain, to name a few.`,
                `Leo Fender is credited with creating the Fender Telecaster in Fullerton, but it was the design innovations of his coincidentally named associate, George William Fullerton, that allowed it to be mass produced.`,
                'The Sun is an almost perfect sphere.',
                'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
                'Saturn radiates two and a half times more energy into space than it receives from the Sun.',
                'The temperature inside the Sun can reach 15 million degrees Celsius.',
                'The Moon is moving approximately 3.8 cm away from our planet every year.',
            ],
            SKILL_NAME: 'British Fullerton, California Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a fullerton fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
    'en-US': {
        translation: {
            FACTS: [
                `Fullerton's sister cities are Yongin, South Korea, Fukui, Japan, and Morelia, Mexico.`,
                `Fullerton is the headquarters of The Red Hat Society, a playgroup for women created to connect like-minded women, make new friends and enrich lives through the power of fun and friendship!`,
                `Fullerton was founded as a railroad town in 1887, and is named after George H Fullerton, after making a deal with the land's owners on behalf of California Central Railroad for railroad right-of-way.`,
                `When George and Edward Amerige first came to the area, it was nothing more than 430 acres of wild mustard fields.`,
                `The city motto is, "The Education Community", due to the city's close relationship with California State University, Fullerton.`,
                `The SOCO District, which means South of Commonwealth, is a revitalized part of town known for its ambiance and nightlife. In fact, the OC Weekly has called it Bourbon Street West in reference to Bourbon Street of New Orleans' French Quarter.`,
                `In 1949, Fullerton was the setting in which Leo Fender developed and refined the design of the Fender Telecaster, an iconic guitar which was used by many famous musicians such as Bruce Springsteen, Keith Richards, and Kurt Cobain, to name a few.`,
                `Leo Fender is credited with creating the Fender Telecaster in Fullerton, but it was the design innovations of his coincidentally named associate, George William Fullerton, that allowed it to be mass produced.`,
                'The Sun is an almost perfect sphere.',
                'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
                'Saturn radiates two and a half times more energy into space than it receives from the sun.',
                'The temperature inside the Sun can reach 15 million degrees Celsius.',
                'The Moon is moving approximately 3.8 cm away from our planet every year.',
            ],
            SKILL_NAME: 'American Fullerton Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a fullerton fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
