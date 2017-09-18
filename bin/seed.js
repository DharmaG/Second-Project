const mongoose = require('mongoose');

const TopicModel = require('../models/topic-model.js');

mongoose.connect('mongodb://localhost/second-project');

const topicArray = [
  {
    topic: 'Mongoose',
    description: "Mongoose is a robust Node.js ODM module that adds MongoDB support to your Express application. Mongoose uses schemas to model your entities, offers predefined validation along with custom validations, allows you to define virtual attributes, and uses middleware hooks to intercept operations. The Mongoose design goal is to bridge the gap between the MongoDB schemaless approach and the requirements of real-world application development. ",
    steps: " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    topic: 'Express',
    description: "Express is the most popular Node web framework, and is the underlying library for a number of other popular Node web frameworks. It provides mechanisms to: Write handlers for requests with different HTTP verbs at different URL paths (routes). Integrate with 'view' rendering engines in order to generate responses by inserting data into templates. Set common web application settings like the port to use for connecting, and the location of templates that are used for rendering  the response.Add additional request processing 'middleware' at any point within the request handling pipeline.",
    steps:  ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

  },
  {
    topic: 'JavaScript',
    description: "JavaScript is a programming language that allows you to implement complex things on web pages — every time a web page does more than just sit there and display static information for you to look at — displaying timely content updates, or interactive maps, or animated 2D/3D graphics, or scrolling video jukeboxes, etc. — you can bet that JavaScript is probably involved. It is the third layer of the layer cake of standard web technologies, two of which (HTML and CSS) we have covered in much more detail in other parts of the Learning Area.",
    steps: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }

];

TopicModel.create(
  topicArray,

  (err, topicsAfterSave) => {
    if(err) {
      console.log('Create error');
      console.log(err);
      return;
    }

    topicsAfterSave.forEach((oneTopic) => {
      console.log('Topic -------->' + oneTopic.topic);
    });
  }
);
