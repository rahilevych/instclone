import { useEffect, useState } from 'react';
import Modal from './Modal';
import DetailedPost from './DetailedPost';

import { useAuth } from '../hooks/useAuth';
import { usePost } from '../hooks/usePost';
import { UserType } from '../types/UserType';

interface Props {
  profileUser: UserType;
}

const UserPosts: React.FC<Props> = ({ profileUser }) => {
  const { user } = useAuth();
  const { posts, fetchPosts, setCurrentPost } = usePost();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!user) {
    return null;
  }
  const openModal = (post: any) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentPost(null);
    setIsModalOpen(false);
  };
  useEffect(() => {
    profileUser && fetchPosts(profileUser?._id);
  }, [profileUser]);

  return (
    <div className='post-grid grid grid-cols-3 gap-2 p-4'>
      {posts?.map((post) => (
        <div
          key={post._id}
          className='post-item w-full h-48 overflow-hidden cursor-pointer'
          onClick={() => openModal(post)}>
          <img
            src={post.image_url}
            alt='Post'
            className='w-full h-full object-cover'
          />
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <DetailedPost />
      </Modal>
    </div>
  );
};

export default UserPosts;
