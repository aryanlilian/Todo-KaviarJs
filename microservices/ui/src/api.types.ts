export type Maybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date Custom scalar type */
  Date: any;
  /** The `EJSON` scalar type represents EJSON values as specified by [Meteor EJSON](https://docs.meteor.com/api/ejson.html). */
  EJSON: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** ObjectId custom scalar type */
  ObjectId: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type SubscriptionEvent = {
  __typename?: 'SubscriptionEvent';
  event: SubscriptionEventType;
  document?: Maybe<Scalars['EJSON']>;
};

export type SubscriptionCountEvent = {
  __typename?: 'SubscriptionCountEvent';
  count?: Maybe<Scalars['Int']>;
};

export enum SubscriptionEventType {
  Added = 'added',
  Changed = 'changed',
  Removed = 'removed',
  Ready = 'ready'
}

export type Subscription = {
  __typename?: 'Subscription';
  postsSubscription?: Maybe<SubscriptionEvent>;
};


export type SubscriptionPostsSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String'];
  _id: Scalars['ObjectId'];
  user?: Maybe<User>;
  post?: Maybe<Post>;
};

export type Post = {
  __typename?: 'Post';
  title: Scalars['String'];
  _id: Scalars['ObjectId'];
  comments?: Maybe<Array<Maybe<Comment>>>;
  user?: Maybe<User>;
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type Tag = {
  __typename?: 'Tag';
  name: Scalars['String'];
  _id: Scalars['ObjectId'];
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  profile?: Maybe<UserProfile>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  postsFindOne?: Maybe<Post>;
  postsFind: Array<Maybe<Post>>;
  postsCount: Scalars['Int'];
  usersFindOne?: Maybe<User>;
  usersFind: Array<Maybe<User>>;
  usersCount: Scalars['Int'];
  me: User;
  framework?: Maybe<Scalars['String']>;
};


export type QueryPostsFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryPostsFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryPostsCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryUsersFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryUsersFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryUsersCountArgs = {
  filters?: Maybe<QueryInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  postsInsertOne?: Maybe<Post>;
  postsUpdateOne: Post;
  postsDeleteOne?: Maybe<Scalars['Boolean']>;
  register: RegistrationResponse;
  changePassword?: Maybe<Scalars['Boolean']>;
  login: LoginResponse;
  logout?: Maybe<Scalars['Boolean']>;
  resetPassword: ResetPasswordResponse;
  forgotPassword?: Maybe<Scalars['Boolean']>;
  verifyEmail: VerifyEmailResponse;
};


export type MutationPostsInsertOneArgs = {
  document: Scalars['EJSON'];
};


export type MutationPostsUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};


export type MutationPostsDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationRegisterArgs = {
  input: RegistrationInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type QueryInput = {
  filters?: Maybe<Scalars['EJSON']>;
  options?: Maybe<QueryOptionsInput>;
};

export type QueryOptionsInput = {
  sort?: Maybe<Scalars['JSON']>;
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  /** This is the Nova body that will get merged deeply with your request body. Useful for passing arguments. */
  sideBody?: Maybe<Scalars['EJSON']>;
};

export type DocumentUpdateInput = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};






export type RegistrationInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegistrationResponse = {
  __typename?: 'RegistrationResponse';
  /** Please not that if the user is required to validate his email for logging in, token will be null */
  token?: Maybe<Scalars['String']>;
};

export type ChangePasswordInput = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String'];
};

export type ResetPasswordInput = {
  username: Scalars['String'];
  token: Scalars['String'];
  newPassword: Scalars['String'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  token: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type VerifyEmailInput = {
  username?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};

export type VerifyEmailResponse = {
  __typename?: 'VerifyEmailResponse';
  token: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

