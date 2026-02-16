'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Comment } from '@/types/database';

interface CommentsProps {
  postId: string;
}

export default function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState({
    author_name: '',
    author_email: '',
    content: ''
  });
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: postId,
            author_name: newComment.author_name,
            author_email: newComment.author_email || null,
            content: newComment.content
          }
        ]);

      if (error) throw error;

      setMessage({ text: '评论提交成功！', type: 'success' });
      setNewComment({ author_name: '', author_email: '', content: '' });
      fetchComments(); // Refresh comments
    } catch (error) {
      console.error('Error submitting comment:', error);
      setMessage({ text: '提交评论失败，请重试。', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 clay-card p-8 rounded-2xl">
      <h3 className="text-2xl font-bold mb-8 text-gradient">评论 ({comments.length})</h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-12 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="您的昵称 *"
            required
            value={newComment.author_name}
            onChange={(e) => setNewComment({ ...newComment, author_name: e.target.value })}
            className="w-full p-4 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
          <input
            type="email"
            placeholder="您的邮箱 (可选)"
            value={newComment.author_email}
            onChange={(e) => setNewComment({ ...newComment, author_email: e.target.value })}
            className="w-full p-4 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <textarea
          placeholder="写下您的想法... *"
          required
          rows={4}
          value={newComment.content}
          onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
          className="w-full p-4 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-y min-h-[120px]"
        />
        
        {message && (
          <div className={`p-4 rounded-xl text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="clay-button primary px-8 py-3 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? '提交中...' : '发表评论'}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">加载评论中...</div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-muted/20 p-6 rounded-2xl border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-inner">
                    {comment.author_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{comment.author_name}</h4>
                    <time className="text-xs text-muted-foreground">
                      {new Date(comment.created_at).toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </time>
                  </div>
                </div>
              </div>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-muted/10 rounded-2xl border border-dashed border-border">
            <p className="text-muted-foreground">暂无评论，快来抢沙发吧！</p>
          </div>
        )}
      </div>
    </div>
  );
}
