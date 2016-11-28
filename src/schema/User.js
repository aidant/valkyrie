import { Document, ValidationError } from 'camo';

export default class User extends Document {
  constructor() {
    super();

    this.createdAt = {
      type: Date,
      default: Date.now,
      required: true,
    };

    this.discordId = {
      type: String,
      unique: true,
      required: true,
    };

    this.battleTag = {
      type: String,
    };

    this.isBattleTagHidden = {
      type: Boolean,
      default: false,
    };

    this.platform = {
      type: String,
      default: 'pc',
      choices: ['pc', 'xbl', 'psn'],
    };

    this.region = {
      type: String,
      default: 'us',
      choices: ['eu', 'us', 'kr', 'cn', 'global'],
    };

    this.mouseDpi = {
      type: Number,
    };

    this.sensitivity = {
      type: Number,
    };
  }

  static collectionName() {
    return 'users';
  }

  postValidate() {
    if (this.platform === 'pc' && this.region === 'global') {
      throw new ValidationError('Region must not be "global" for the "pc" platform.');
    }

    if (this.platform !== 'pc' && this.region !== 'global') {
      throw new ValidationError('Region must be "global" for "xbl" and "psn" platforms.');
    }
  }
}
