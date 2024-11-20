export const AllUser = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/user",{ next: { revalidate: 0 } });
    return response.json();
};

export const User = async (id) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/user",{ 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id)
        });
        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error response:', errorBody);
            throw new Error(`Failed to fetch user: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (e) {
        console.error('Error fetch user:', e);
        throw e;
    }
};
  
export const AddUser = async (user) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error response:', errorBody);
            throw new Error(`Failed to add user: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}

export const UpdateUser = async (userId, user) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/user/"+userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error response:', errorBody);
            throw new Error(`Failed to Edit user: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error Edit user:', error);
        throw error;
    }
}

export const UpdateProfile = async (userId, formData) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + '/upload/profile/user/'+userId,{
            method: 'PUT',
            body: formData,
        })
        if (!response.ok) {
            throw new Error('Failed to update profile');
          }
        return await response.json();
    } catch (e) {
        console.error('Error UpdateProfile:', e);
        throw e;
    }
}

export const RemoveUser = async (userId) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + '/user/' + userId,{
            method: 'DELETE',
        })
        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error response:', errorBody);
            throw new Error(`Failed to Remove user: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (err) {
        console.error('Error Remove user:', err);
        throw error;
    }
}
  