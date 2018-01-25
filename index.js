/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

const Alexa = require("alexa-sdk");

const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
  "en-GB": {
    translation: {
      FACTS: [
        `Fullerton's sister cities are Yongin, South Korea, Fukui, Japan, and Morelia, Mexico.`,
        `Fullerton is the headquarters of The Red Hat Society, a playgroup for women to network, make friends, and have fun!`,
        `Fullerton was founded as a railroad town in 1887.`,
        `When George and Edward Amerige first came to the area, it was nothing more than 430 acres of wild mustard fields.`,
        `The city motto is, "The Education Community", due to the city's close relationship with Cal State Fullerton.`,
        `Fullerton's SOCO District was nicknamed Bourbon Street West after Bourbon Street in New Orleans' French Quarter.`,
        `In 1949, Fullerton was the setting in which Leo Fender created the iconic Fender Telecaster guitar.`,
        `Leo Fender's associate, coincidentally named George Fullerton, helped make mass producing Fender guitars possible.`,
        `Fullerton was named in honor of George Fullerton, after securing the land for the California Central Railroad.`,
        `Gwen Stefani, lead singer of No Doubt, attended Cal State Fullerton, and the group performed their regularly.`,
        `The Maverick Theater hosts the "World Famous Skipper Stand Up Show", showcasing skippers from Disneyland's Jungle Cruise attraction.`,
        "The first Hawaiian Punch recipe was developed in a converted garage in Fullerton, and was originally an ice cream topping.",
        `Overnight city parking has been banned in Fullerton since 1924.`
      ],
      SKILL_NAME: "British Fullerton, California Facts",
      GET_FACT_MESSAGE: "Here's your fact: ",
      HELP_MESSAGE:
        "You can say tell me a fullerton fact, or, you can say exit... What can I help you with?",
      HELP_REPROMPT: "What can I help you with?",
      STOP_MESSAGE: "Goodbye!"
    }
  },
  "en-US": {
    translation: {
      FACTS: [
        `Fullerton's sister cities are Yongin, South Korea, Fukui, Japan, and Morelia, Mexico.`,
        `Fullerton is the headquarters of The Red Hat Society, a playgroup for women to network, make friends, and have fun!`,
        `Fullerton was founded as a railroad town in 1887.`,
        `When George and Edward Amerige first came to the area, it was nothing more than 430 acres of wild mustard fields.`,
        `The city motto is, "The Education Community", due to the city's close relationship with Cal State Fullerton.`,
        `Fullerton's SOCO District was nicknamed Bourbon Street West after Bourbon Street in New Orleans' French Quarter.`,
        `In 1949, Fullerton was the setting in which Leo Fender created the iconic Fender Telecaster guitar.`,
        `Leo Fender's associate, coincidentally named George Fullerton, helped make mass producing Fender guitars possible.`,
        `Fullerton was named in honor of George Fullerton, after securing the land for the California Central Railroad.`,
        `Gwen Stefani, lead singer of No Doubt, attended Cal State Fullerton, and the group performed their regularly.`,
        `The Maverick Theater hosts the "World Famous Skipper Stand Up Show", showcasing skippers from Disneyland's Jungle Cruise attraction.`,
        "The first Hawaiian Punch recipe was developed in a converted garage in Fullerton, and was originally an ice cream topping.",
        `Overnight city parking has been banned in Fullerton since 1924.`
      ],
      SKILL_NAME: "American Fullerton Facts",
      GET_FACT_MESSAGE: "Here's your fact: ",
      HELP_MESSAGE:
        "You can say tell me a fullerton fact, or, you can say exit... What can I help you with?",
      HELP_REPROMPT: "What can I help you with?",
      STOP_MESSAGE: "Goodbye!"
    }
  }
};

const handlers = {
  LaunchRequest: function() {
    this.emit("GetFact");
  },
  GetNewFactIntent: function() {
    this.emit("GetFact");
  },
  GetFact: function() {
    // Get a random space fact from the space facts list
    // Use this.t() to get corresponding language data
    const factArr = this.t("FACTS");
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];

    // Create speech output
    const speechOutput = this.t("GET_FACT_MESSAGE") + randomFact;
    this.emit(":tellWithCard", speechOutput, this.t("SKILL_NAME"), randomFact);
  },
  "AMAZON.HelpIntent": function() {
    const speechOutput = this.t("HELP_MESSAGE");
    const reprompt = this.t("HELP_MESSAGE");
    this.emit(":ask", speechOutput, reprompt);
  },
  "AMAZON.CancelIntent": function() {
    this.emit(":tell", this.t("STOP_MESSAGE"));
  },
  "AMAZON.StopIntent": function() {
    this.emit(":tell", this.t("STOP_MESSAGE"));
  },
  SessionEndedRequest: function() {
    this.emit(":tell", this.t("STOP_MESSAGE"));
  }
};

exports.handler = (event, context) => {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  // To enable string internationalization (i18n) features, set a resources object.
  alexa.resources = languageStrings;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
