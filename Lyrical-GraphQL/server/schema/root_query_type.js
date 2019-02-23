const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const SongType = require('./song_type');
const LyricType = require('./lyric_type');
const Lyric = mongoose.model('lyric');
const Song = mongoose.model('song');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    // songs, song and lyric are the names of the queries.  
    songs: {
      // returns a List<SongType>
      type: new GraphQLList(SongType),
      // execute a call inside the resolve()
      resolve() {
        return Song.find({});
      }
    },

    song: {
      // returns an individual SongType.   
      type: SongType,

      //  Requires an ID as an argument     
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Song.findById(id);
      }
    },
    // get an individual LyricType. Pass an ID as an argument
    lyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Lyric.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
