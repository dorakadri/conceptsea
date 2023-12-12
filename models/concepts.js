const { models, model, Schema } = require("mongoose");

const ConceptSchema = new Schema({
  userclerk: {
    type: String,
  },

  title: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  tags: {
    type: String,
    require: true,
  },

  colors: {
    type: [String],
  },
  typography: {
    type: [String],
  },
  image: {
    type: String,
  },
});

const Concept = models.Concept || model("Concept", ConceptSchema);

export default Concept;
