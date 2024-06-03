import RootComp from './root'

const Posts = (props: any) => {
  const { posts, videoPosts, profilePostsTmpDirUserImages, profilePostsTmpDirFigures, profilePostsCommentsTmpDirUserImages, videoPostsTmpDirUserImages, videoPostsTmpDirFigures, videoPostsCommentsTmpDirUserImages } = props;

  return (
    <>
      <RootComp profilePosts={posts} profilePostsTmpDirUserImages={profilePostsTmpDirUserImages} profilePostsTmpDirFigures={profilePostsTmpDirFigures} profilePostsCommentsTmpDirUserImages={profilePostsCommentsTmpDirUserImages} videoPosts={videoPosts} videoPostsTmpDirUserImages={videoPostsTmpDirUserImages} videoPostsTmpDirFigures={videoPostsTmpDirFigures} videoPostsCommentsTmpDirUserImages={videoPostsCommentsTmpDirUserImages} />
    </>
  );
}

export default Posts