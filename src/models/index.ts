import User from "./userModel";
import Post from "./postModel";

User.hasMany(Post, {
    foreignKey: 'creator_id',
    as: 'posts'
});

Post.belongsTo(User, {
    foreignKey: 'creator_id',
    as:'creator'
});

export {
    User,
    Post
}