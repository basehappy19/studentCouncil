'use client'
import React, { useState, useEffect } from 'react';
import { UserPlus, Move, Users } from 'lucide-react';
import { User } from '@/app/interfaces/User/User';

interface VoteDistributionProps {
  users: User[];
  onChange: (distribution: VoteDistribution) => void;
}

interface VoteDistribution {
  agree: User[];
  disagree: User[];
  abstain: User[];
  noVote: User[];
}

const VoteDistributionForm: React.FC<VoteDistributionProps> = ({ users, onChange }) => {
  const [draggingItem, setDraggingItem] = useState<User | null>(null);
  const [hoveredList, setHoveredList] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [distribution, setDistribution] = useState<VoteDistribution>({
    agree: [],
    disagree: [],
    abstain: [],
    noVote: []
  });

  const [availableUsers, setAvailableUsers] = useState<User[]>(users);

  useEffect(() => {
    // Update available users when distribution changes
    const assignedUserIds = [
      ...distribution.agree.map(u => u.id),
      ...distribution.disagree.map(u => u.id),
      ...distribution.abstain.map(u => u.id),
      ...distribution.noVote.map(u => u.id)
    ];

    const filteredUsers = users.filter(
      user => !assignedUserIds.includes(user.id) &&
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setAvailableUsers(filteredUsers);
  }, [distribution, users, searchTerm]);

  useEffect(() => {
    onChange(distribution);
  }, [distribution, onChange]);

  const handleDragStart = (user: User) => {
    setDraggingItem(user);
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
    setHoveredList(null);
  };

  const moveToList = (list: keyof VoteDistribution) => {
    if (draggingItem) {
      setDistribution(prev => {
        const updatedDistribution = { ...prev };

        // Remove from previous lists
        Object.keys(updatedDistribution).forEach(key => {
          updatedDistribution[key as keyof VoteDistribution] =
            updatedDistribution[key as keyof VoteDistribution].filter(
              u => u.id !== draggingItem.id
            );
        });

        // Add to selected list
        updatedDistribution[list].push(draggingItem);

        return updatedDistribution;
      });
    }
  };

  const moveAllToList = (list: keyof VoteDistribution) => {
    setDistribution(prev => {
      const updatedDistribution = { ...prev };

      // Move all available users to the specified list
      updatedDistribution[list] = [
        ...updatedDistribution[list],
        ...availableUsers
      ];

      return updatedDistribution;
    });
  };

  const renderUserCard = (user: User) => (
    <div
      key={user.id}
      draggable
      onDragStart={() => handleDragStart(user)}
      onDragEnd={handleDragEnd}
      className="bg-white shadow-md rounded-lg p-3 mb-2 flex items-center justify-between cursor-move hover:bg-gray-50 transition-colors"
    >
      <span className="flex items-center">
        <Move className="mr-2 text-gray-400" size={16} />
        {user.partyList.bio.classroom} {user.displayName}
      </span>
    </div>
  );

  const renderList = (
    title: string,
    users: User[],
    listKey: keyof VoteDistribution,
    bgColor: string
  ) => (
    <div
      className={`p-4 rounded-lg ${bgColor} min-h-[300px] relative`}
      onDragOver={(e) => {
        e.preventDefault();
        setHoveredList(listKey);
      }}
      onDragLeave={() => setHoveredList(null)}
      onDrop={() => moveToList(listKey)}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg flex items-center">
          <Users className="mr-2" size={20} />
          {title}
        </h3>
        <span className="text-sm text-gray-600">({users.length})</span>
      </div>
      {users.map(renderUserCard)}
      {hoveredList === listKey && draggingItem && (
        <div className="absolute inset-0 bg-green-100/30 border-2 border-green-300 rounded-lg"></div>
      )}
    </div>
  );

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="ค้นหาผู้ใช้..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute right-3 top-3 text-gray-400">
          <Users size={20} />
        </span>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-4 mb-3">
        <button
          type='button'
          onClick={() => moveAllToList('agree')}
          className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
        >
          <UserPlus className="mr-2" size={16} />
          ย้ายทั้งหมดมาเห็นด้วย
        </button>
        <button
          type='button'
          onClick={() => moveAllToList('disagree')}
          className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
        >
          <UserPlus className="mr-2" size={16} />
          ย้ายทั้งหมดมาไม่เห็นด้วย
        </button>
        <button
          type='button'
          onClick={() => moveAllToList('abstain')}
          className="bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center"
        >
          <UserPlus className="mr-2" size={16} />
          ย้ายทั้งหมดมางดออกเสียง
        </button>
        <button
          type='button'
          onClick={() => moveAllToList('noVote')}
          className="bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
        >
          <UserPlus className="mr-2" size={16} />
          ย้ายทั้งหมดมาไม่ลงคะแนนเสียง
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Available Users */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg flex items-center">
              <UserPlus className="mr-2" size={20} />
              รายชื่อทั้งหมด
            </h3>
            <span className="text-sm text-gray-600">({availableUsers.length})</span>
          </div>
          {availableUsers.map(renderUserCard)}
        </div>

        {/* Vote Distribution Lists */}
        {renderList('เห็นด้วย', distribution.agree, 'agree', 'bg-green-50 hover:bg-green-100/50')}
        {renderList('ไม่เห็นด้วย', distribution.disagree, 'disagree', 'bg-red-50 hover:bg-red-100/50')}
        {renderList('งดออกเสียง', distribution.abstain, 'abstain', 'bg-yellow-50 hover:bg-yellow-100/50')}
        {renderList('ไม่ลงคะแนนเสียง', distribution.noVote, 'noVote', 'bg-gray-50 hover:bg-gray-100/50')}
      </div>


    </div>
  );
};

export default VoteDistributionForm;