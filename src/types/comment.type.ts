export type CommentType = {
  text: string,
  id: string,
  date: string,
  likesCount: number,
  dislikesCount: number,
  user: {
    id: string,
    name: string
  },
  userReaction?: 'like' | 'dislike' | null
}
