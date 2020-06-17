import Comment from "./Comment";
/*
 LOGIC:
 map and display a list of Comment component
 */
export default ({ comments }) => (
  <React.Fragment>
    {comments.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </React.Fragment>
);
