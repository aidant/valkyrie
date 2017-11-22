import { Document } from 'camo'

export default class User extends Document {
  constructor () {
    super()

    this.createdAt = {
      type: Date,
      default: Date.now,
      required: true
    }

    this.discordId = {
      type: String,
      unique: true,
      required: true
    }

    this.accountTag = {
      type: String
    }

    this.isAccountTagHidden = {
      type: Boolean,
      default: false
    }

    this.region = {
      type: String,
      choices: ['eu', 'us', 'kr', 'psn', 'xbl', undefined]
    }

    this.mouseDpi = {
      type: Number
    }

    this.sensitivity = {
      type: Number
    }

    this.gamemode = {
      type: String,
      choices: ['quickplay', 'competitive', undefined]
    }
  }

  static collectionName () {
    return 'users'
  }

  postValidate () {
  }
}
