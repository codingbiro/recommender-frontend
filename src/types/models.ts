import gql from "graphql-tag";

export const WHO_Q = gql`
  query whoami {
    whoami {
      id,
      name,
      email,
      age,
    }
  }
`;

export const LOGIN_M = gql`
mutation Login($data: LoginInput!) {
  loginUser(data: $data) {
    token
  }
}
`;

export const REG_M = gql`
mutation Register($data: UserCreateInput!) {
  signupUser(data: $data) {
    name
  }
}
`;

export const MOV_Q = gql`
  query movies($search: String) {
    movies(search: $search) {
      title,
      length,
      id
    }
  }
`;

export const REV_Q = gql`
query reviews($search: String) {
  reviews(search: $search) {
    review,
    rating,
    id,
    user { id, name },
    movie { id, title }
  }
}
`;

export const REV_M = gql`
  mutation addReview($data: ReviewCreateInput!) {
    addReview( data: $data) {
      review,
      rating,
      id,
      user { id, name },
      movie { id }
    }
  }
`;