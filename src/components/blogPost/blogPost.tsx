// App.js
import "./blogPost.css";
import blogPosts  from "./blogPost.data";

interface BlogPost {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
      likes: number;
      dislikes: number;
    };
    views: number;
    userId: number;
  }

const PostCard = ({ post }: { post: BlogPost }) => {
    const { title, body, reactions, tags, views } = post;
    const { likes, dislikes } = reactions;
    return (
        <div className="post-card">
            <h3>{title}</h3>
            <p>{body}</p>
            <p>#{tags.join(' #')}</p>
           <div className="reaction-container">
            <div>{likes} likes | {dislikes} dislikes | {views} views </div>
           </div>
        </div>
    )
}

export default function BlogPosts() {
  return (
    <div>
      <h2>Blog Posts </h2>
      <div className="post-container">
        {blogPosts.map((post:BlogPost) => <PostCard key={post.id} post={post}/> )}
      </div>

    </div>
  );
}
