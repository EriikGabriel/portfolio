export type SocialResponse = {
  social: string;
  profileImage: string;
  name: string;
  username: string;
  description: string;
  following: number;
  followers: number;
  url: string;
};

export type SocialType = {
  _id: string;
} & SocialResponse;
