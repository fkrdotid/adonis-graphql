'use strict'

const User = use('App/Models/User')
const Post = use('App/Models/Post')
const slugify = require('slugify')
const Redis = use('Redis')

// Define resolvers
const resolvers = {
  Query: {
    // Fetch all users
    async allUsers() {
      try {
        const cachedUsers = await Redis.get('users')
        if (cachedUsers) {
          console.log("masuk cache")
          const data = JSON.parse(cachedUsers)
          return data
        }
        
        const users = await User.all()
        await Redis.set('users', JSON.stringify(users))
        console.log("gapake cache")
        return users
          
      } catch (error) {
        console.log(error)        
      }
    },
    // Get a user by its ID
    async fetchUser(_, { id }) {
      const user = await User.find(id)
      return user.toJSON()
    },
    // Fetch all posts
    async allPosts() {
      const posts = await Post.all()
      return posts.toJSON()
    },
    // Get a post by its ID
    async fetchPost(_, { id }) {
      const post = await Post.find(id)
      return post.toJSON()
    }
  },

  Mutation: {
    // Handles user login
    async login(_, { email, password }, { auth }) {
      const { token } = await auth.attempt(email, password)
      return token
    },
  
    // Create new user
    async createUser(_, { username, email, password }) {
      const a = await User.create({ username, email, password })
      const users = await User.all()
      await Redis.set('users', JSON.stringify(users))
      return a
    },
  
    // Add a new post
    async addPost(_, { title, content }, { auth }) {
      try {
        // Check if user is logged in
        await auth.check()
  
        // Get the authenticated user
        const user = await auth.getUser()
  
        // Add new post
        return await Post.create({
          user_id: user.id,
          title,
          slug: slugify(title, { lower: true }),
          content
        })
      } catch (error) {
        // Throw error if user is not authenticated
        throw new Error('Missing or invalid jwt token')
      }
    }
  },


  User: {
    // Fetch all posts created by a user
    async posts(userInJson) {
      // Convert JSON to model instance
      const user = new User()
      user.newUp(userInJson)
  
      const posts = await user.post().fetch()
      return posts.toJSON()
    }
  },
  Post: {
    // Fetch the author of a particular post
    async user(postInJson) {
      // Convert JSON to model instance
      const post = new Post()
      post.newUp(postInJson)
  
      const user = await post.user().fetch()
      return user.toJSON()
    }
  }

}

module.exports = resolvers