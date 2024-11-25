"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from '../../ui/button';
import { AllUser } from '../../../app/functions/User';
import { Input } from '../../ui/input';

const VoteDistributionForm = ({ onChange }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [agree, setAgree] = useState([]);
  const [disagree, setDisagree] = useState([]);
  const [abstain, setAbstain] = useState([]);
  const [noVote, setNoVote] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getUsers = useCallback(async () => {
    try {
      const res = await AllUser();
      const usersWithStringId = res.map(user => ({
        ...user,
        id: user.id.toString()
      }));
      setAllUsers(usersWithStringId);
      setFilteredUsers(usersWithStringId);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filterUsers = useCallback(() => {
    const assignedUsers = [...agree, ...disagree, ...abstain, ...noVote];
    const availableUsers = allUsers.filter(user => 
      !assignedUsers.some(assignedUser => assignedUser.id === user.id)
    );

    const filtered = availableUsers.filter(user =>
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filtered);
  }, [allUsers, agree, disagree, abstain, noVote, searchTerm]);

  useEffect(() => {
    filterUsers();
  }, [filterUsers]);

  useEffect(() => {
    onChange({ agree, disagree, abstain, noVote });
  }, [agree, disagree, abstain, noVote, onChange]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceList = getList(source.droppableId);
    const destList = getList(destination.droppableId);

    const [movedItem] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, movedItem);

    setList(source.droppableId, sourceList);
    setList(destination.droppableId, destList);
  };

  const getList = (id) => {
    switch (id) {
      case 'users':
        return filteredUsers;
      case 'agree':
        return agree;
      case 'disagree':
        return disagree;
      case 'abstain':
        return abstain;
      case 'noVote':
        return noVote;
      default:
        return [];
    }
  };

  const setList = (id, list) => {
    switch (id) {
      case 'users':
        setFilteredUsers(list);
        break;
      case 'agree':
        setAgree(list);
        break;
      case 'disagree':
        setDisagree(list);
        break;
      case 'abstain':
        setAbstain(list);
        break;
      case 'noVote':
        setNoVote(list);
        break;
      default:
        break;
    }
  };

  const moveAll = (from, to) => {
    const fromList = getList(from);
    const toList = getList(to);
    setList(to, [...toList, ...fromList]);
    setList(from, []);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const renderList = (id, items, title) => (
    <Droppable droppableId={id} key={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-100 p-4 rounded-lg min-h-[200px] w-full"
        >
          <h3 className="font-bold mb-2">{title} ({items.length})</h3>
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="bg-white p-2 mb-2 rounded shadow"
                >
                  {item.displayName}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="ค้นหาผู้ใช้..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/5">
          {renderList('users', filteredUsers, 'รายชื่อทั้งหมด')}
        </div>
        <div className="w-full md:w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            {renderList('agree', agree, 'เห็นด้วย')}
            <Button type='button' onClick={() => moveAll('users', 'agree')} className="bg-green-400 hover:bg-green-600 mt-2 w-full">
              ย้ายทั้งหมดมาเห็นด้วย
            </Button>
          </div>
          <div>
            {renderList('disagree', disagree, 'ไม่เห็นด้วย')}
            <Button type='button' onClick={() => moveAll('users', 'disagree')} className="bg-red-400 hover:bg-red-600 mt-2 w-full">
              ย้ายทั้งหมดมาไม่เห็นด้วย
            </Button>
          </div>
          <div>
            {renderList('abstain', abstain, 'งดออกเสียง')}
            <Button type='button' onClick={() => moveAll('users', 'abstain')} className="bg-orange-400 hover:bg-orange-600 mt-2 w-full">
              ย้ายทั้งหมดมางดออกเสียง
            </Button>
          </div>
          <div>
            {renderList('noVote', noVote, 'ไม่ลงคะแนนเสียง')}
            <Button type='button' onClick={() => moveAll('users', 'noVote')} className="mt-2 w-full">
              ย้ายทั้งหมดมาไม่ลงคะแนนเสียง
            </Button>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default VoteDistributionForm;