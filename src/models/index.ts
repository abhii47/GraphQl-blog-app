import User from "./userModel";
import Post from "./postModel";
import Comment from "./commentModel";

User.hasMany(Post, {
    foreignKey: 'creator_id',
    as: 'posts'
});

Post.belongsTo(User, {
    foreignKey: 'creator_id',
    as:'creator'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    as: 'comments'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'creator'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    as: 'comments'
});

export {
    User,
    Post,
    Comment
}